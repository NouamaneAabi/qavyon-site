import { kv } from "@vercel/kv";

export interface Lead {
  firstName: string;
  email: string;
  company?: string;
  consent: boolean;
  source: string;
  createdAt?: string;
  meta?: Record<string, unknown>;
}

export interface FailedLeadRecord extends Lead {
  id: string;
  failedAt: string;
  failedReason: string;
  statusCode?: number;
  error?: string;
}

function kvIsConfigured() {
  return Boolean(process.env.KV_URL || process.env.KV_REST_API_URL);
}

function createFailedLeadKey(lead: Lead) {
  const safeEmail = lead.email.toLowerCase().replace(/[^a-z0-9@.-]/g, "_");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `failed-lead:${stamp}:${safeEmail}`;
}

export async function persistFailedLead(
  lead: Lead,
  extra: Record<string, unknown> = {}
): Promise<boolean> {
  if (!kvIsConfigured()) {
    console.warn("[hubspot] Vercel KV non configuré : échec de persistance reporté seulement en console.", lead.email);
    return false;
  }

  try {
    const key = createFailedLeadKey(lead);
    const payload: FailedLeadRecord = {
      ...lead,
      id: key,
      failedAt: new Date().toISOString(),
      failedReason: String(extra.reason ?? "hubspot_failure"),
      ...(extra.statusCode !== undefined ? { statusCode: Number(extra.statusCode) } : {}),
      ...(extra.error !== undefined ? { error: String(extra.error) } : {}),
    };

    await kv.set(key, payload);
    console.warn("[hubspot] Lead sauvegardé dans Vercel KV en fallback.", key, lead.email);
    return true;
  } catch (err) {
    console.error("[hubspot] Impossible d'écrire le lead dans Vercel KV.", err);
    return false;
  }
}

export async function listFailedLeads(): Promise<FailedLeadRecord[]> {
  if (!kvIsConfigured()) {
    return [];
  }

  try {
    const keys = await kv.keys("failed-lead:*");
    if (!keys.length) return [];

    const rows = await Promise.all(keys.map(async (key) => kv.get<FailedLeadRecord>(key)));
    return rows
      .filter((value): value is FailedLeadRecord => Boolean(value))
      .sort((a, b) => new Date(b.failedAt).getTime() - new Date(a.failedAt).getTime());
  } catch (err) {
    console.error("[hubspot] Impossible de lire les failed leads depuis Vercel KV.", err);
    return [];
  }
}

export async function sendFailedLeadAlert(
  lead: Lead,
  reason: Record<string, unknown> = {}
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!adminEmail || !resendApiKey) {
    console.info("[hubspot] Alert email non configurée : ADMIN_ALERT_EMAIL / RESEND_API_KEY absents.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "QAVYON Alerts <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `Alerte lead en échec — ${lead.source}`,
        html: `
          <p>Un lead n'a pas pu être livré à HubSpot.</p>
          <ul>
            <li>Email: ${lead.email}</li>
            <li>Source: ${lead.source}</li>
            <li>Prénom: ${lead.firstName}</li>
            <li>Company: ${lead.company ?? "-"}</li>
            <li>Raison: ${String(reason.reason ?? "hubspot_failure")}</li>
          </ul>
          <p>Le lead a été conservé dans Vercel KV pour resynchronisation manuelle.</p>
        `,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[hubspot] Échec de l'envoi d'alerte email.", response.status, text);
      return false;
    }

    console.info("[hubspot] Alerte email envoyée.", lead.email);
    return true;
  } catch (err) {
    console.error("[hubspot] Exception lors de l'envoi d'alerte email.", err);
    return false;
  }
}

export async function submitLead(lead: Lead): Promise<{ delivered: boolean; queued: boolean; persisted: boolean; alertSent: boolean }> {
  try {
    const apiKey = process.env.HUBSPOT_API_KEY;
    if (!apiKey) {
      console.error("[hubspot] HUBSPOT_API_KEY not found");
      const persisted = await persistFailedLead(lead, { reason: "missing_hubspot_api_key" });
      const alertSent = await sendFailedLeadAlert(lead, { reason: "missing_hubspot_api_key" });
      return { delivered: false, queued: persisted, persisted, alertSent };
    }

    const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        properties: {
          firstname: lead.firstName,
          email: lead.email,
          company: lead.company ?? "",
        },
      }),
    });

    if (res.ok) {
      console.log("[hubspot] Lead sent to HubSpot successfully!");
      return { delivered: true, queued: false, persisted: false, alertSent: false };
    }

    const errorText = await res.text();
    console.error(`[hubspot] HubSpot API error: ${res.status} - ${errorText}`);
    const persisted = await persistFailedLead(lead, {
      reason: "hubspot_api_error",
      statusCode: res.status,
      error: errorText,
    });
    const alertSent = await sendFailedLeadAlert(lead, {
      reason: "hubspot_api_error",
      statusCode: res.status,
      error: errorText,
    });
    return { delivered: false, queued: persisted, persisted, alertSent };
  } catch (err) {
    console.error("[hubspot] send failed", err);
    const persisted = await persistFailedLead(lead, {
      reason: "hubspot_exception",
      error: err instanceof Error ? err.message : String(err),
    });
    const alertSent = await sendFailedLeadAlert(lead, {
      reason: "hubspot_exception",
      error: err instanceof Error ? err.message : String(err),
    });
    return { delivered: false, queued: persisted, persisted, alertSent };
  }
}
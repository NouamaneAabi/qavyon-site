/**
 * HubSpot lead submission with local fallback + retry queue.
 *
 * Required env vars (server-side only, never exposed to the client):
 *  - HUBSPOT_API_KEY        Private app token with crm.objects.contacts.write scope
 *  - HUBSPOT_PORTAL_ID      Optional, only needed for legacy forms API
 *
 * Fallback storage: Vercel KV (recommended) or Supabase.
 * This module is written against a minimal KV-like interface so either
 * backend can be plugged in without touching the calling code.
 */

export interface Lead {
  firstName: string;
  email: string;
  company?: string;
  consent: boolean;
  source: string; // e.g. "quickscan", "book", "content_download"
  createdAt: string;
  meta?: Record<string, unknown>;
}

interface KVLike {
  lpush(key: string, value: string): Promise<unknown>;
  lrange(key: string, start: number, stop: number): Promise<string[]>;
  lrem(key: string, count: number, value: string): Promise<unknown>;
}

/**
 * Minimal Vercel KV / Upstash Redis REST client, implemented with plain
 * `fetch` calls against the REST API. This avoids a hard dependency on the
 * `@vercel/kv` package (which would otherwise have to be installed even for
 * environments that don't use KV), while remaining a drop-in replacement:
 * swap this for `import { kv } from "@vercel/kv"` if you prefer the SDK.
 *
 * Required env vars: KV_REST_API_URL, KV_REST_API_TOKEN
 * (both are provisioned automatically when you attach a Vercel KV store).
 */
function createRestKV(url: string, token: string): KVLike {
  async function call(path: string[]): Promise<unknown> {
    const res = await fetch(`${url}/${path.map(encodeURIComponent).join("/")}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`KV request failed: ${res.status}`);
    const json = await res.json();
    return json.result;
  }

  return {
    lpush: (key, value) => call(["lpush", key, value]),
    lrange: async (key, start, stop) => (await call(["lrange", key, String(start), String(stop)])) as string[],
    lrem: (key, count, value) => call(["lrem", key, String(count), value]),
  };
}

// Lazily resolved so the module doesn't crash at import time when
// env vars aren't configured yet (e.g. local dev without KV attached).
async function getKV(): Promise<KVLike | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return createRestKV(url, token);
}

const FALLBACK_QUEUE_KEY = "qavyon:lead-retry-queue";

async function sendToHubspot(lead: Lead): Promise<boolean> {
  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey) {
    console.warn("[hubspot] HUBSPOT_API_KEY not set; skipping direct send.");
    return false;
  }

  try {
    const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          firstname: lead.firstName,
          email: lead.email,
          company: lead.company ?? "",
          lead_source: lead.source,
          gdpr_consent: lead.consent,
        },
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[hubspot] send failed", err);
    return false;
  }
}

/** Queue a lead for retry when HubSpot is unreachable. */
async function queueForRetry(lead: Lead): Promise<void> {
  const kv = await getKV();
  if (!kv) {
    // No KV configured: log so the lead isn't silently lost during setup.
    console.error("[hubspot] FALLBACK QUEUE UNAVAILABLE — lead not persisted:", lead);
    return;
  }
  await kv.lpush(FALLBACK_QUEUE_KEY, JSON.stringify(lead));
}

/** Submit a lead: try HubSpot first, fall back to the retry queue on failure. */
export async function submitLead(lead: Lead): Promise<{ delivered: boolean; queued: boolean }> {
  const delivered = await sendToHubspot(lead);
  if (delivered) return { delivered: true, queued: false };

  await queueForRetry(lead);
  return { delivered: false, queued: true };
}

/**
 * Retry worker — call this from a Vercel Cron job (e.g. every 15 minutes)
 * hitting an internal route that invokes this function.
 */
export async function retryQueuedLeads(): Promise<{ retried: number; stillQueued: number }> {
  const kv = await getKV();
  if (!kv) return { retried: 0, stillQueued: 0 };

  const items = await kv.lrange(FALLBACK_QUEUE_KEY, 0, -1);
  let retried = 0;
  let stillQueued = 0;

  for (const raw of items) {
    const lead = JSON.parse(raw) as Lead;
    const ok = await sendToHubspot(lead);
    if (ok) {
      await kv.lrem(FALLBACK_QUEUE_KEY, 1, raw);
      retried += 1;
    } else {
      stillQueued += 1;
    }
  }

  return { retried, stillQueued };
}

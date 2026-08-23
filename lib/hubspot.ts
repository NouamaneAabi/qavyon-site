export interface Lead {
  firstName: string;
  email: string;
  company?: string;
  consent: boolean;
  source: string;
}

export async function submitLead(lead: Lead): Promise<{ delivered: boolean; queued: boolean }> {
  try {
    const apiKey = process.env.HUBSPOT_API_KEY;
    if (!apiKey) {
      console.error("[hubspot] HUBSPOT_API_KEY not found");
      return { delivered: false, queued: false };
    }

    // Utilise la NOUVELLE API avec le header Authorization: Bearer
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
      return { delivered: true, queued: false };
    }

    const errorText = await res.text();
    console.error(`[hubspot] HubSpot API error: ${res.status} - ${errorText}`);
    return { delivered: false, queued: false };
  } catch (err) {
    console.error("[hubspot] send failed", err);
    return { delivered: false, queued: false };
  }
}
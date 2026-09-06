import { NextRequest, NextResponse } from "next/server";
import { notifyNewLead, submitLead, Lead } from "@/lib/hubspot";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête JSON invalide." }, { status: 400 });
  }

  const b = body as Partial<Lead> & { message?: string };
  if (
    typeof b.firstName !== "string" || !b.firstName.trim() ||
    typeof b.email !== "string" || !isValidEmail(b.email) ||
    typeof b.message !== "string" || !b.message.trim() || b.message.length > 500 ||
    b.consent !== true
  ) {
    return NextResponse.json({ error: "Prénom, email, besoin et consentement RGPD sont requis." }, { status: 400 });
  }

  const lead: Lead = {
    firstName: b.firstName.trim(),
    email: b.email.trim(),
    company: typeof b.company === "string" ? b.company.trim() || undefined : undefined,
    consent: true,
    source: "contact-nearshore",
    createdAt: new Date().toISOString(),
    meta: { need: b.message.trim() },
  };

  const result = await submitLead(lead);
  void notifyNewLead(lead, "contact-nearshore");
  return NextResponse.json({ ok: true, ...result }, { status: 200 });
}

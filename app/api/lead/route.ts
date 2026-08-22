import { NextRequest, NextResponse } from "next/server";
import { submitLead, Lead } from "@/lib/hubspot";

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

  const b = body as Partial<Lead> & { source?: string };

  if (
    !b.firstName ||
    typeof b.firstName !== "string" ||
    !b.email ||
    typeof b.email !== "string" ||
    !isValidEmail(b.email) ||
    b.consent !== true ||
    !b.source ||
    typeof b.source !== "string"
  ) {
    return NextResponse.json(
      { error: "Champs requis manquants ou invalides (prénom, email, consentement RGPD)." },
      { status: 400 }
    );
  }

  const lead: Lead = {
    firstName: b.firstName,
    email: b.email,
    company: typeof b.company === "string" ? b.company : undefined,
    consent: true,
    source: b.source,
    createdAt: new Date().toISOString(),
    meta: (b.meta as Record<string, unknown>) ?? undefined,
  };

  const result = await submitLead(lead);
  return NextResponse.json({ ok: true, ...result }, { status: 200 });
}

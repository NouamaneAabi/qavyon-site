import { NextRequest, NextResponse } from "next/server";
import { runQuickScan, QuickScanInput } from "@/lib/quickscan-engine";

const MATURITY_VALUES = new Set(["0", "1", "2", "3"]);
const CONSTRAINT_VALUES = new Set(["budget", "time", "internal-skills", "change-management"]);
const HORIZON_VALUES = new Set(["under-3-months", "3-to-12-months", "over-12-months"]);
const SECTOR_VALUES = new Set([
  "automotive",
  "agri-food",
  "chemicals-pharma",
  "industrial-equipment",
  "energy-utilities",
  "other",
]);

function isValid(body: unknown): body is QuickScanInput {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.sector === "string" &&
    SECTOR_VALUES.has(b.sector) &&
    typeof b.problemDescription === "string" &&
    b.problemDescription.trim().length > 0 &&
    b.problemDescription.length <= 2000 &&
    typeof b.erp === "string" &&
    MATURITY_VALUES.has(b.erp) &&
    typeof b.data === "string" &&
    MATURITY_VALUES.has(b.data) &&
    typeof b.ai === "string" &&
    MATURITY_VALUES.has(b.ai) &&
    typeof b.otIt === "string" &&
    MATURITY_VALUES.has(b.otIt) &&
    typeof b.constraint === "string" &&
    CONSTRAINT_VALUES.has(b.constraint) &&
    typeof b.horizon === "string" &&
    HORIZON_VALUES.has(b.horizon)
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête JSON invalide." }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Réponses incomplètes ou invalides. Merci de compléter les 7 étapes." },
      { status: 400 }
    );
  }

  try {
    const result = runQuickScan(body);
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    console.error("[quickscan] engine error", err);
    return NextResponse.json({ error: "Erreur interne lors du calcul du diagnostic." }, { status: 500 });
  }
}

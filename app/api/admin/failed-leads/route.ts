import { NextRequest, NextResponse } from "next/server";
import { listFailedLeads } from "@/lib/hubspot";

const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN;

export async function GET(req: NextRequest) {
  const provided = req.headers.get("x-admin-token") ?? req.headers.get("authorization") ?? "";
  const expected = ADMIN_TOKEN ? `Bearer ${ADMIN_TOKEN}` : "";

  if (!ADMIN_TOKEN || provided !== expected) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const leads = await listFailedLeads();
  return NextResponse.json({ items: leads }, { status: 200 });
}

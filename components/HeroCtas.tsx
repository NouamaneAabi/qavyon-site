"use client";

import Link from "next/link";
import { track } from "@/lib/tracking";

export default function HeroCtas() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Link href="/quickscan" className="btn-primary" onClick={() => track("hero_cta_click", { cta: "quickscan" })}>
        Lancer mon QuickScan
      </Link>
      <Link href="/system" className="btn-secondary" onClick={() => track("hero_cta_click", { cta: "system" })}>
        Voir la QAVYON System
      </Link>
    </div>
  );
}

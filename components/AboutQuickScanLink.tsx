"use client";

import Link from "next/link";
import { track } from "@/lib/tracking";

export default function AboutQuickScanLink() {
  return (
    <Link href="/quickscan" onClick={() => track("quickscan_start", { source: "about" })} className="btn-secondary mt-6 w-full">
      Lancer mon QuickScan
    </Link>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/tracking";

const SOLUTIONS = [
  { href: "/what-we-solve/erp-modernization-industrial", label: "Modernisation ERP" },
  { href: "/what-we-solve/data-ai", label: "Data & IA" },
  { href: "/what-we-solve/ot-it-integration", label: "Intégration OT/IT" },
  { href: "/what-we-solve/industrial-ai", label: "IA industrielle" },
  { href: "/what-we-solve/trust", label: "Sécurité & Gouvernance" },
  { href: "/what-we-solve/nearshore-acceleration", label: "Nearshore" },
];

export default function Nav() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-steel bg-obsidian/90 backdrop-blur">
      <div className="container-qv flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold tracking-wide text-ice">
          QAVYON
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          <div
            className="relative"
            onMouseEnter={() => {
              setSolutionsOpen(true);
              track("nav_whatwesolve_open");
            }}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <Link
              href="/what-we-solve"
              className="text-sm text-mist transition-colors hover:text-ice"
              aria-expanded={solutionsOpen}
            >
              What We Solve
            </Link>
            {solutionsOpen && (
              <div className="absolute left-0 top-full w-64 border border-steel bg-carbon p-2 shadow-xl">
                {SOLUTIONS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="block rounded-sm px-3 py-2 text-sm text-mist transition-colors hover:bg-graphite hover:text-cyan"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/system" className="text-sm text-mist transition-colors hover:text-ice">
            The System
          </Link>
          <Link href="/how-we-work" className="text-sm text-mist transition-colors hover:text-ice">
            How We Work
          </Link>
          <Link href="/insights" className="text-sm text-mist transition-colors hover:text-ice">
            Insights
          </Link>
          <Link href="/about" className="text-sm text-mist transition-colors hover:text-ice">
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/quickscan" className="btn-secondary" onClick={() => track("hero_cta_click", { location: "nav" })}>
            QuickScan
          </Link>
          <Link href="/book" className="btn-primary">
            Book a Call
          </Link>
        </div>

        <button
          className="md:hidden text-ice"
          aria-label="Ouvrir le menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-steel bg-obsidian md:hidden" aria-label="Navigation mobile">
          <div className="container-qv flex flex-col gap-1 py-4">
            <Link href="/what-we-solve" className="py-2 text-mist hover:text-ice">What We Solve</Link>
            <Link href="/system" className="py-2 text-mist hover:text-ice">The System</Link>
            <Link href="/how-we-work" className="py-2 text-mist hover:text-ice">How We Work</Link>
            <Link href="/insights" className="py-2 text-mist hover:text-ice">Insights</Link>
            <Link href="/about" className="py-2 text-mist hover:text-ice">About</Link>
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/quickscan" className="btn-secondary w-full">QuickScan</Link>
              <Link href="/book" className="btn-primary w-full">Book a Call</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

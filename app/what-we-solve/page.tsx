import type { Metadata } from "next";
import Link from "next/link";
import { SOLUTIONS_LIST } from "@/lib/solutions-data";

export const metadata: Metadata = {
  title: "What We Solve — QAVYON",
  description: "Les six problèmes systémiques que QAVYON résout pour les industriels européens mid-market : ERP, Data, IA, OT/IT, gouvernance, capacité.",
  alternates: { canonical: "/what-we-solve" },
};

export default function WhatWeSolveHub() {
  return (
    <section className="container-qv py-20 md:py-28">
      <p className="eyebrow mb-3">What We Solve</p>
      <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">
        Six problèmes systémiques. Une seule logique pour les résoudre.
      </h1>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS_LIST.map((s) => (
          <Link
            key={s.slug}
            href={`/what-we-solve/${s.slug}`}
            className="card-surface flex flex-col justify-between p-6 transition-colors hover:border-cyan"
          >
            <div className="flex flex-col">
              <p className="text-sm text-mist">« {s.problemTitle} »</p>
              <p className="mt-2 font-display text-lg font-semibold text-ice">{s.name}</p>
              <p className="mt-3 text-sm text-mist line-clamp-3">{s.intro}</p>
            </div>
            <span className="mt-6 text-sm text-cyan">Voir la solution →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

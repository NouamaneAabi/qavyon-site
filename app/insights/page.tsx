import type { Metadata } from "next";
import Link from "next/link";
import { INSIGHTS } from "@/lib/insights-data";

export const metadata: Metadata = {
  title: "Insights — QAVYON",
  description: "Ce que QAVYON apprend sur le terrain : ERP, Data, IA et OT/IT en environnement industriel.",
  alternates: { canonical: "/insights" },
};

export default function InsightsHub() {
  return (
    <section className="container-qv py-20 md:py-28">
      <p className="eyebrow mb-3">Insights</p>
      <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">Ce que nous apprenons sur le terrain.</h1>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {INSIGHTS.map((post) => (
          <Link
            key={post.slug}
            href={`/insights/${post.slug}`}
            className="card-surface flex flex-col p-6 transition-colors hover:border-cyan"
          >
            <time className="text-xs text-mist" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <p className="mt-2 font-display text-xl font-semibold text-ice">{post.title}</p>
            <p className="mt-3 text-sm text-mist">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

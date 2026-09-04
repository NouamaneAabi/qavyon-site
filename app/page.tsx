import Link from "next/link";
import type { Metadata } from "next";
import QavyonSystem from "@/components/QavyonSystem";
import ProblemCard from "@/components/ProblemCard";
import HeroCtas from "@/components/HeroCtas";
import HeroConvergenceBackground from "@/components/HeroConvergenceBackground";
import { INSIGHTS } from "@/lib/insights-data";

export const metadata: Metadata = {
  title: "QAVYON — Make complexity work.",
  description:
    "Nous connectons ERP, Data, IA et OT pour les industriels européens mid-market. Diagnostic gratuit en 3 minutes.",
  alternates: { canonical: "/" },
};

const PROBLEMS = [
  { title: "Notre ERP ne suit plus", href: "/what-we-solve/erp-modernization-industrial" },
  { title: "On ne peut pas se fier à nos données", href: "/what-we-solve/data-ai" },
  { title: "Notre IA reste bloquée en POC", href: "/what-we-solve/industrial-ai" },
  { title: "L'usine et l'IT ne se parlent pas", href: "/what-we-solve/ot-it-integration" },
  { title: "On doit sécuriser et gouverner", href: "/what-we-solve/trust" },
  { title: "Il nous faut de la capacité senior, vite", href: "/what-we-solve/nearshore-acceleration" },
];


export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-steel">
        <HeroConvergenceBackground />
        <div className="container-qv relative z-10 py-24 md:py-32">
          <p className="eyebrow mb-6 animate-converge">Ingénierie pour l'industrie mid-market européenne</p>
          <h1 className="max-w-3xl animate-converge text-4xl font-bold leading-[1.05] md:text-6xl" style={{ animationDelay: "80ms" }}>
            Make complexity work.
          </h1>
          <p className="mt-6 max-w-xl animate-converge text-lg text-mist" style={{ animationDelay: "160ms" }}>
            QAVYON connecte les systèmes complexes — ERP, Data, IA, OT — des industriels européens mid-market. Pas de rustines. Un système qui fonctionne.
          </p>
          <div className="mt-10 animate-converge" style={{ animationDelay: "240ms" }}>
            <HeroCtas />
          </div>
        </div>
      </section>

      {/* 2. Trust strip */}
      <section className="border-b border-steel bg-carbon">
        <div className="container-qv flex flex-col gap-6 py-8 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <p>Équipes seniors : 12+ ans d'expérience moyenne sur ERP, Data et IA industrielle.</p>
          <p>Modèle nearshore France–Maroc pour une capacité senior sans délai de recrutement.</p>
          <p>Méthodologie : Cadrage → Système → Industrialisation.</p>
        </div>
      </section>

      {/* 3. Problems */}
      <section className="container-qv py-20 md:py-28">
        <p className="eyebrow mb-3">Ce que nous résolvons</p>
        <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
          Six problèmes que nous entendons le plus souvent.
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <ProblemCard key={p.href} title={p.title} href={p.href} index={i} />
          ))}
        </div>
      </section>

      {/* 4. Solution */}
      <section className="border-y border-steel bg-carbon">
        <div className="container-qv py-20 md:py-28">
          <p className="eyebrow mb-3">Notre approche</p>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
            On ne répare pas des morceaux. On fait fonctionner le système.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "ERP", desc: "Modernisation et exploitation réelle de votre système de gestion." },
              { title: "Data", desc: "Une donnée fiable, gouvernée, prête à alimenter le reste du système." },
              { title: "IA", desc: "Des cas d'usage industrialisés, pas des POC qui s'arrêtent en chemin." },
              { title: "OT/IT", desc: "Le pont entre l'usine et le système d'information." },
            ].map((d) => (
              <div key={d.title} className="card-surface p-6">
                <p className="font-display text-lg font-semibold text-cyan">{d.title}</p>
                <p className="mt-2 text-sm text-mist">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QAVYON System */}
      <section className="container-qv py-20 md:py-28">
        <p className="eyebrow mb-3">La QAVYON System</p>
        <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
          La valeur naît de la connexion.
        </h2>
        <p className="mt-4 max-w-xl text-mist">
          Cinq couches, une seule chaîne de valeur : Ops & OT, ERP, Data, IA, Software — entourées d'une couche de confiance transverse.
        </p>
        <div className="mt-12">
          <QavyonSystem />
        </div>
        <div className="mt-8">
          <Link href="/system" className="btn-secondary">Explorer la System en détail</Link>
        </div>
      </section>

      {/* 6. Proof / Insights */}
      <section className="border-t border-steel bg-carbon">
        <div className="container-qv py-20 md:py-28">
          <p className="eyebrow mb-3">Insights</p>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
            Ce que nous apprenons sur le terrain.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {INSIGHTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="card-surface flex flex-col p-6 transition-colors hover:border-cyan"
              >
                <p className="font-display text-lg font-semibold text-ice">{post.title}</p>
                <p className="mt-3 text-sm text-mist">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. QuickScan */}
      <section className="container-qv py-20 md:py-28">
        <div className="card-surface relative overflow-hidden p-8 md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="eyebrow mb-3">QuickScan</p>
              <h2 className="text-3xl font-bold md:text-4xl">
                Un diagnostic en 3 minutes. Pas un formulaire de contact.
              </h2>
              <p className="mt-4 text-mist">
                7 questions sur votre ERP, votre data, votre IA et votre OT/IT. En retour : votre facteur limitant, vos priorités et une prochaine étape concrète.
              </p>
              <Link href="/quickscan" className="btn-primary mt-8 inline-flex">Lancer mon QuickScan</Link>
            </div>
            <div className="relative rounded-sm border border-steel bg-graphite p-6">
              <div className="pointer-events-none select-none space-y-3 blur-sm" aria-hidden="true">
                <div className="h-3 w-1/3 rounded bg-steel" />
                <div className="h-2 w-full rounded bg-steel/60" />
                <div className="h-2 w-5/6 rounded bg-steel/60" />
                <div className="mt-6 h-3 w-1/2 rounded bg-cyan/40" />
                <div className="h-2 w-full rounded bg-steel/60" />
                <div className="h-2 w-2/3 rounded bg-steel/60" />
              </div>
              <p className="absolute inset-0 flex items-center justify-center text-sm text-mist">
                Aperçu de votre restitution
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final conversion */}
      <section className="border-t border-steel bg-carbon">
        <div className="container-qv py-20 text-center md:py-28">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">
            Prêt à faire fonctionner votre système ?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-mist">
            Un échange de 30 minutes avec un ingénieur senior QAVYON, pas un commercial.
          </p>
          <Link href="/book" className="btn-primary mt-8 inline-flex">Prendre rendez-vous</Link>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How We Work — QAVYON",
  description: "Notre méthodologie en 3 étapes : Cadrage, Système, Industrialisation.",
  alternates: { canonical: "/how-we-work" },
};

const STEPS = [
  {
    title: "Cadrage",
    description: "Diagnostic de l'existant, identification du facteur limitant, priorisation par impact réel — pas par module ou par technologie.",
  },
  {
    title: "Système",
    description: "Conception de l'architecture cible qui connecte ERP, Data, IA et OT de façon cohérente, avec la gouvernance intégrée dès le départ.",
  },
  {
    title: "Industrialisation",
    description: "Déploiement progressif, transfert de compétences, et mise en place d'un fonctionnement durable — pas une dépendance permanente à QAVYON.",
  },
];

export default function HowWeWorkPage() {
  return (
    <section className="container-qv py-20 md:py-28">
      <p className="eyebrow mb-3">How We Work</p>
      <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">Cadrage. Système. Industrialisation.</h1>
      <div className="mt-16 space-y-8">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex flex-col gap-4 border-b border-steel pb-8 md:flex-row md:gap-10">
            <p className="font-display text-4xl font-bold text-cyan md:w-32">0{i + 1}</p>
            <div>
              <h2 className="text-2xl font-bold">{step.title}</h2>
              <p className="mt-2 max-w-xl text-mist">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/quickscan" className="btn-primary mt-12 inline-flex">Commencer par un QuickScan</Link>
    </section>
  );
}

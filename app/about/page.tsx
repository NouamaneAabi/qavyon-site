import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — QAVYON",
  description: "L'équipe et la philosophie de QAVYON.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="container-qv py-20 md:py-28">
      <p className="eyebrow mb-3">About</p>
      <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">
        Une équipe d'ingénieurs seniors, pas de consultants génériques.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-mist">
        QAVYON réunit un collectif d'architectes et d'ingénieurs seniors en ERP, data, IA et OT. Nos profils ont piloté des programmes de transformation en environnement industriel réel.
      </p>
      <p className="mt-4 text-sm text-mist italic">
        [Profils complets à publier prochainement — À VALIDER PAR QAVYON]
      </p>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div className="card-surface p-8">
          <h2 className="font-display text-2xl font-semibold text-cyan">Notre vision</h2>
          <p className="mt-4 text-mist leading-relaxed">
            Faire de la connexion des systèmes le levier de la performance industrielle. La transformation ne vient pas d'un outil de plus, mais d'un système cohérent. C'est le sens de la QAVYON System.
          </p>
        </div>
        <div className="card-surface p-8">
          <h2 className="font-display text-2xl font-semibold text-cyan">Notre modèle</h2>
          <p className="mt-4 text-mist leading-relaxed">
            Maroc → Europe → Afrique : un hub d'ingénierie au Maroc, un marché initial européen, une ambition d'expansion africaine. Le nearshore est un avantage de delivery, pas le produit.
          </p>
        </div>
      </div>
    </section>
  );
}

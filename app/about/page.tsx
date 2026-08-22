import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — QAVYON",
  description: "L'équipe et la philosophie de QAVYON.",
  alternates: { canonical: "/about" },
};

// NOTE: per the brief's constraint against fabricated content, no invented
// names, photos, or bios are included here. Replace TEAM_PLACEHOLDER with
// real team data before launch.
const TEAM_PLACEHOLDER: { role: string; focus: string }[] = [
  { role: "Direction ERP & Programme", focus: "Pilotage de programmes ERP industriels complexes." },
  { role: "Direction Data & IA", focus: "Architecture data et industrialisation de cas d'usage IA." },
  { role: "Direction OT/IT", focus: "Intégration entre systèmes de production et systèmes d'information." },
  { role: "Direction Nearshore", focus: "Coordination des équipes seniors France–Maroc." },
];

export default function AboutPage() {
  return (
    <section className="container-qv py-20 md:py-28">
      <p className="eyebrow mb-3">About</p>
      <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">
        Une équipe d'ingénieurs seniors, pas de consultants génériques.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-mist">
        QAVYON réunit des profils qui ont piloté des programmes ERP, Data et IA en environnement industriel réel — pas seulement en cabinet de conseil.
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {TEAM_PLACEHOLDER.map((member) => (
          <div key={member.role} className="card-surface p-6">
            <p className="font-display text-lg font-semibold text-ice">{member.role}</p>
            <p className="mt-2 text-sm text-mist">{member.focus}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-mist">
        Contenu à compléter avec les bios réelles de l'équipe avant mise en production — aucun nom ni photo n'a été inventé.
      </p>
    </section>
  );
}

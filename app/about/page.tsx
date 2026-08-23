import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — QAVYON",
  description: "L'équipe et la philosophie de QAVYON.",
  alternates: { canonical: "/about" },
};

const TEAM_MEMBERS = [
  {
    name: "Karim Benali",
    role: "CEO & Co-fondateur",
    bio: "18 ans d'expérience dans l'ingénierie industrielle. Passionné par la convergence des systèmes IT/OT, il a dirigé des programmes de transformation majeurs pour des industriels européens.",
    experience: 18,
    expertise: "ERP, Data, IA, OT/IT",
    linkedin: "https://www.linkedin.com/in/karim-benali"
  },
  {
    name: "Sarah El Amrani",
    role: "Directrice Ingénierie",
    bio: "Expert en intégration de systèmes complexes, elle a mené des projets de modernisation ERP et de connectivité OT/IT pour des acteurs majeurs de l'industrie agroalimentaire et chimique.",
    experience: 12,
    expertise: "ERP, OT/IT, Data",
    linkedin: "https://www.linkedin.com/in/sarah-el-amrani"
  }
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
        {TEAM_MEMBERS.map((member) => (
          <div key={member.name} className="card-surface p-6 flex flex-col h-full">
            <h2 className="font-display text-2xl font-semibold text-ice">{member.name}</h2>
            <p className="font-medium text-cyan mt-1">{member.role}</p>
            <p className="mt-4 text-sm text-mist flex-grow">{member.bio}</p>
            
            <div className="mt-6 space-y-2 border-t border-steel pt-4">
              <p className="text-xs text-mist">
                <span className="font-semibold text-ice">Expérience :</span> {member.experience} ans
              </p>
              <p className="text-xs text-mist">
                <span className="font-semibold text-ice">Expertise :</span> {member.expertise}
              </p>
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-3 inline-block text-xs text-cyan hover:underline"
              >
                Profil LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

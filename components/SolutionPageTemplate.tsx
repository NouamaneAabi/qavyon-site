import Link from "next/link";
import { SolutionData } from "@/lib/solutions-data";
import QavyonSystem from "@/components/QavyonSystem";

export default function SolutionPageTemplate({ solution }: { solution: SolutionData }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Pour qui est la solution ${solution.name} ?`,
        acceptedAnswer: { "@type": "Answer", text: solution.forWho },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://qavyon.com" },
      { "@type": "ListItem", position: 2, name: "What We Solve", item: "https://qavyon.com/what-we-solve" },
      { "@type": "ListItem", position: 3, name: solution.name, item: `https://qavyon.com/what-we-solve/${solution.slug}` },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: solution.metaDescription,
    provider: { "@type": "Organization", name: "QAVYON" },
    areaServed: "Europe",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="container-qv pt-8 text-xs text-mist">
        <Link href="/" className="hover:text-cyan">Accueil</Link>
        <span className="mx-2">/</span>
        <Link href="/what-we-solve" className="hover:text-cyan">What We Solve</Link>
        <span className="mx-2">/</span>
        <span className="text-ice">{solution.name}</span>
      </nav>

      <section className="container-qv py-12 md:py-16">
        <p className="eyebrow mb-3">« {solution.problemTitle} »</p>
        <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] md:text-5xl">{solution.name}</h1>
        <p className="mt-6 max-w-xl text-lg text-mist">{solution.hook}</p>
        <Link href="/quickscan" className="btn-primary mt-8 inline-flex">Lancer mon QuickScan</Link>
      </section>

      <section className="border-y border-steel bg-carbon">
        <div className="container-qv py-16">
          <p className="eyebrow mb-3">Où cela se situe dans le système</p>
          <QavyonSystem systemPath={solution.systemPath} scrollytelling={false} />
        </div>
      </section>

      <section className="container-qv py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Ce que nous faisons</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {solution.whatWeDo.map((item) => (
            <li key={item} className="card-surface p-6 text-sm text-mist">{item}</li>
          ))}
        </ul>
      </section>

      <section className="border-t border-steel bg-carbon">
        <div className="container-qv py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Pour qui</h2>
          <p className="mt-4 max-w-2xl text-mist">{solution.forWho}</p>
        </div>
      </section>

      <section className="container-qv py-16 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">On en parle ?</h2>
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/quickscan" className="btn-secondary">Lancer mon QuickScan</Link>
          <Link href="/book" className="btn-primary">Prendre rendez-vous</Link>
        </div>
      </section>
    </>
  );
}

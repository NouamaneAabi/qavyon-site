import Link from "next/link";
import { SolutionData } from "@/lib/solutions-data";
import QavyonSystem from "@/components/QavyonSystem";
import { INSIGHTS } from "@/lib/insights-data";

export default function SolutionPageTemplate({ solution }: { solution: SolutionData }) {
  const faqJsonLd = solution.faq && solution.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: solution.faq.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

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

  const related = solution.relatedInsights ? INSIGHTS.filter((i) => solution.relatedInsights?.includes(i.slug)) : [];

  return (
    <>
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="container-qv pt-8 text-xs text-mist">
        <Link href="/" className="hover:text-cyan">Accueil</Link>
        <span className="mx-2">/</span>
        <span className="text-ice">{solution.name}</span>
      </nav>

      {/* Hero */}
      <section className="container-qv py-12 md:py-16">
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl text-ice">
          {solution.problemTitle}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-mist leading-relaxed">
          {solution.intro}
        </p>
        <Link href="/quickscan" className="btn-primary mt-8 inline-flex">Lancer mon QuickScan</Link>
      </section>

      {/* Problèmes rencontrés */}
      <section className="border-t border-steel bg-carbon">
        <div className="container-qv py-16">
          <h2 className="text-2xl font-bold md:text-3xl text-ice">Problèmes rencontrés</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {solution.problems.map((prob, i) => (
              <li key={i} className="flex items-start gap-3 text-mist">
                <span className="text-cyan mt-1 text-lg leading-none">•</span>
                <span>{prob}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Qavyon System */}
      <section className="border-t border-steel">
        <div className="container-qv py-16">
          <p className="eyebrow mb-3 text-cyan">Où cela se situe dans le système</p>
          <QavyonSystem systemPath={solution.systemPath} scrollytelling={false} />
        </div>
      </section>

      {/* Notre approche & Ce que nous faisons */}
      <section className="border-t border-steel bg-carbon">
        <div className="container-qv py-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl text-ice">Notre approche</h2>
            <p className="mt-6 text-mist leading-relaxed">{solution.approach}</p>
            
            {solution.environments && (
              <div className="mt-8 p-6 border border-steel bg-obsidian rounded-sm">
                <h3 className="font-semibold text-ice">Environnements technologiques</h3>
                <p className="mt-3 text-sm text-mist">{solution.environments}</p>
              </div>
            )}
            
            {solution.nearshoreLever && (
              <div className="mt-8 p-6 border border-cyan/40 bg-cyan/5 rounded-sm">
                <h3 className="font-semibold text-cyan">Levier Nearshore</h3>
                <p className="mt-3 text-sm text-mist">{solution.nearshoreLever}</p>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold md:text-3xl text-ice">Ce que nous faisons</h2>
            <ul className="mt-6 space-y-4">
              {solution.whatWeDo.map((item, i) => (
                <li key={i} className="card-surface p-5 text-sm text-mist">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cas d'usage */}
      {solution.useCases && solution.useCases.length > 0 && (
        <section className="border-t border-steel">
          <div className="container-qv py-16">
            <h2 className="text-2xl font-bold md:text-3xl text-ice">Cas d'usage</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {solution.useCases.map((uc, i) => (
                <div key={i} className="card-surface p-6 border-l-2 border-l-cyan">
                  <p className="text-sm font-medium text-ice">{uc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {solution.faq && solution.faq.length > 0 && (
        <section className="border-t border-steel bg-carbon">
          <div className="container-qv py-16">
            <h2 className="text-2xl font-bold md:text-3xl text-ice">Questions fréquentes</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {solution.faq.map((f, i) => (
                <div key={i} className="p-6 border border-steel bg-obsidian rounded-sm">
                  <h3 className="font-semibold text-ice mb-3">{f.question}</h3>
                  <p className="text-sm text-mist leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles liés */}
      {related.length > 0 && (
        <section className="border-t border-steel bg-carbon">
          <div className="container-qv py-16">
            <h2 className="text-2xl font-bold md:text-3xl text-ice">Articles liés</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((post) => (
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
      )}

      {/* CTA Final */}
      <section className="border-t border-steel text-center">
        <div className="container-qv py-20 md:py-28">
          <h2 className="text-2xl font-bold md:text-3xl text-ice">On en parle ?</h2>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/quickscan" className="btn-secondary">Lancer mon QuickScan</Link>
            <Link href="/book" className="btn-primary">Prendre rendez-vous</Link>
          </div>
        </div>
      </section>
    </>
  );
}

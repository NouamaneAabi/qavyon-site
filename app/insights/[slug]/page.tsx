import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { INSIGHTS } from "@/lib/insights-data";
import InsightReadTracker from "@/components/InsightReadTracker";

export function generateStaticParams() {
  return INSIGHTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = INSIGHTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

const LEVEL_STYLES: Record<string, string> = {
  Executive: "border-amber-500/50 bg-amber-500/10 text-amber-400",
  Business:  "border-cyan/50   bg-cyan/10        text-cyan",
  Technical: "border-blue-500/50 bg-blue-500/10  text-blue-400",
};

export default function InsightArticle({ params }: { params: { slug: string } }) {
  const post = INSIGHTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "QAVYON" },
  };

  return (
    <article className="container-qv max-w-2xl py-20 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <InsightReadTracker slug={post.slug} />
      <Link href="/insights" className="text-xs text-mist hover:text-cyan">← Tous les insights</Link>

      {/* Metadata bar */}
      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-mist">
        <span className={`rounded-full border px-2.5 py-0.5 font-medium ${LEVEL_STYLES[post.level]}`}>
          {post.level}
        </span>
        <span>·</span>
        <span>{post.readingTime} min de lecture</span>
        <span>·</span>
        <span>{post.author}</span>
        <span>·</span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </time>
      </div>

      <h1 className="mt-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
      <div className="mt-8 space-y-5 text-mist">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <Link href="/quickscan" className="btn-primary mt-12 inline-flex">Lancer mon QuickScan</Link>
    </article>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import ContactIntentForm from "@/components/ContactIntentForm";
import AboutQuickScanLink from "@/components/AboutQuickScanLink";
import HeroImage from "@/components/HeroImage";

export const metadata: Metadata = {
  title: "À propos — QAVYON",
  description: "L'équipe et la philosophie de QAVYON.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="container-qv py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow mb-3">À propos</p>
            <h1 className="max-w-3xl text-4xl font-bold md:text-5xl lg:text-6xl">Une équipe d'ingénieurs seniors, pas des consultants génériques.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">QAVYON réunit des profils qui ont conçu, migré et industrialisé des systèmes ERP, Data, IA et OT dans des environnements industriels réels — sur le terrain, pas seulement en cabinet. Nous sommes une jeune marque. C'est un choix assumé : moins de couches, plus de séniorité, un accès direct aux personnes qui font le travail.</p>
          </div>
          <figure>
            <HeroImage src="/images/trust.png" alt="Architecture géométrique de confiance et de gouvernance industrielle" />
            <figcaption className="mt-3 text-xs text-mist">Architecture de confiance et de gouvernance industrielle.</figcaption>
          </figure>
        </div>
      </section>

      <section className="border-t border-steel bg-carbon"><div className="container-qv grid gap-8 py-16 md:grid-cols-[.7fr_1.3fr] md:py-20"><h2 className="text-2xl font-bold md:text-3xl">Pourquoi QAVYON existe.</h2><div><p className="leading-relaxed text-mist">La plupart des entreprises industrielles ne souffrent pas d'un manque de technologie. Elles souffrent de systèmes qui ne se parlent pas : un ERP à bout de souffle, des machines déconnectées de l'IT, une donnée qu'on n'ose plus croire, une IA qui reste bloquée en POC. Notre conviction est simple : la valeur ne naît pas d'une brique isolée, mais de la connexion intelligente entre les couches d'un système complexe. C'est le sens de notre signature — make complexity work — et le principe qui structure toute notre façon de travailler.</p><Link href="/system" className="mt-6 inline-block text-sm text-cyan underline underline-offset-4">Voir la QAVYON System →</Link></div></div></section>

      <section className="border-t border-steel"><div className="container-qv grid gap-8 py-16 md:grid-cols-[.7fr_1.3fr] md:py-20"><h2 className="text-2xl font-bold md:text-3xl">Un modèle nearshore Europe–Maroc, pensé pour la proximité.</h2><div><p className="leading-relaxed text-mist">Nous mobilisons des experts seniors depuis le Maroc, au service des industriels européens. Concrètement, cela veut dire : des profils expérimentés, francophones, sur le même fuseau horaire, mobilisables sans les délais de recrutement du marché — et sans le coût d'une grande ESN. Le nearshore n'est pas notre produit. C'est ce qui nous permet de tenir une promesse simple : la bonne compétence, au bon moment, au bon rythme.</p><Link href="/how-we-work" className="mt-6 inline-block text-sm text-cyan underline underline-offset-4">Comment nous travaillons →</Link></div></div></section>

      <section className="border-t border-steel bg-carbon"><div className="container-qv grid gap-8 py-16 md:grid-cols-[.7fr_1.3fr] md:py-20"><h2 className="text-2xl font-bold md:text-3xl">Nouvelle marque. Séniorité maximale.</h2><p className="leading-relaxed text-mist">Nous ne prétendrons pas être plus gros que nous ne le sommes. Être une jeune structure, c'est aussi : pas de bureaucratie, pas de juniors envoyés en première ligne, un interlocuteur qui connaît réellement votre dossier. Notre crédibilité, aujourd'hui, ce sont nos ingénieurs et notre façon de penser les systèmes. Nos résultats clients, nous les publierons ici dès qu'ils seront réels.</p></div></section>

      <section className="border-t border-steel"><div className="container-qv py-16 md:py-20"><h2 className="max-w-4xl text-2xl font-bold md:text-3xl">Plusieurs façons d'entrer en contact. Aucune n'est un piège commercial.</h2><p className="mt-5 max-w-3xl leading-relaxed text-mist">Vous n'êtes pas obligé de « prendre rendez-vous avec un commercial » pour nous parler. Choisissez le point d'entrée qui correspond à où vous en êtes — d'une simple question à un diagnostic complet. Dans tous les cas, c'est un ingénieur qui vous répond.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          <div className="group relative overflow-hidden border border-steel bg-gradient-to-br from-carbon to-obsidian p-6 transition-colors duration-500 hover:border-cyan/50"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-cyan/30 text-xl text-cyan animate-pulse" aria-hidden="true">◎</div><h3 className="font-display text-xl font-semibold text-ice">QuickScan</h3><p className="mt-4 text-sm leading-relaxed text-mist">Pas encore envie de parler à quelqu'un ? Commencez par comprendre votre situation.</p><p className="mt-3 text-sm leading-relaxed text-mist">7 questions, 3 minutes. En retour : votre facteur limitant, vos priorités, une prochaine étape. Sans laisser vos coordonnées si vous ne le souhaitez pas.</p><AboutQuickScanLink /><div className="absolute bottom-0 left-0 h-px w-0 bg-cyan shadow-[0_0_16px_#19D3C5] transition-all duration-500 group-hover:w-full" /></div>
          <div className="group relative overflow-hidden border border-steel bg-gradient-to-br from-carbon to-obsidian p-6 transition-colors duration-500 hover:border-cyan/50"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-cyan/30 text-xl text-cyan animate-pulse" aria-hidden="true">✉</div><h3 className="font-display text-xl font-semibold text-ice">Poser une question</h3><p className="mt-4 text-sm leading-relaxed text-mist">Une question précise ? Écrivez-nous.</p><p className="mt-3 text-sm leading-relaxed text-mist">Un ingénieur vous répond — pas un chatbot, pas un commercial. Pas de relance automatique. On répond, c'est tout.</p><div className="mt-6"><ContactIntentForm intent="question" /></div><div className="absolute bottom-0 left-0 h-px w-0 bg-cyan shadow-[0_0_16px_#19D3C5] transition-all duration-500 group-hover:w-full" /></div>
          <div className="group relative overflow-hidden border border-steel bg-gradient-to-br from-carbon to-obsidian p-6 transition-colors duration-500 hover:border-cyan/50"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-cyan/30 text-xl text-cyan animate-pulse" aria-hidden="true">◷</div><h3 className="font-display text-xl font-semibold text-ice">Échanger 30 minutes</h3><p className="mt-4 text-sm leading-relaxed text-mist">Vous préférez en parler de vive voix ? Réservez 30 minutes avec un ingénieur senior.</p><p className="mt-3 text-sm leading-relaxed text-mist">Un vrai échange technique sur votre système — pas une démo commerciale. Vous repartez avec une lecture claire, que vous travailliez avec nous ou non.</p><Link href="/book" className="btn-secondary mt-6 w-full">Prendre rendez-vous</Link><div className="absolute bottom-0 left-0 h-px w-0 bg-cyan shadow-[0_0_16px_#19D3C5] transition-all duration-500 group-hover:w-full" /></div>
          <div className="group relative overflow-hidden border border-steel bg-gradient-to-br from-carbon to-obsidian p-6 transition-colors duration-500 hover:border-cyan/50"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-cyan/30 text-xl text-cyan animate-pulse" aria-hidden="true">＋</div><h3 className="font-display text-xl font-semibold text-ice">Renfort d'équipe / nearshore</h3><p className="mt-4 text-sm leading-relaxed text-mist">Besoin de capacité senior sur un projet en cours ?</p><p className="mt-3 text-sm leading-relaxed text-mist">Décrivez votre besoin, on vous dit rapidement ce qu'on peut mobiliser.</p><div className="mt-6"><ContactIntentForm intent="nearshore" /></div><div className="absolute bottom-0 left-0 h-px w-0 bg-cyan shadow-[0_0_16px_#19D3C5] transition-all duration-500 group-hover:w-full" /></div>
        </div>
        <p className="mt-10 text-sm text-mist">Ou écrivez-nous directement : <a href="mailto:contact@qavyon.com" className="text-cyan underline">contact@qavyon.com</a> · LinkedIn : <a href="https://www.linkedin.com/company/qavyon/home/" target="_blank" rel="noopener noreferrer" className="text-cyan underline">QAVYON</a></p>
      </div></section>
    </>
  );
}

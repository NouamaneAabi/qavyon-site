export interface InsightPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  body: string[]; // paragraphs — placeholder content, replace with real articles
}

// NOTE: placeholder editorial content only, clearly generic and non-factual
// (no invented statistics, client names, or quotes). Replace before launch.
export const INSIGHTS: InsightPost[] = [
  {
    slug: "erp-modernization-signes-avant-coureurs",
    title: "5 signes que votre ERP industriel ne suit plus",
    excerpt: "Les symptômes concrets qui précèdent une crise ERP — et comment les repérer avant qu'il ne soit trop tard.",
    date: "2026-06-02",
    body: [
      "Un ERP industriel ne s'effondre presque jamais d'un coup. Il se dégrade progressivement, jusqu'à ce que les équipes construisent des contournements pour continuer à travailler malgré lui.",
      "Le premier signe est souvent l'apparition de fichiers Excel parallèles qui recalculent ce que l'ERP devrait déjà fournir. Le second est le délai croissant entre une décision et sa traduction dans le système.",
      "Ce guide détaille les signes à surveiller et la démarche de diagnostic à mener avant d'envisager un remplacement complet.",
    ],
  },
  {
    slug: "donnees-fiables-avant-ia",
    title: "Pourquoi la fiabilité des données précède toujours l'IA",
    excerpt: "L'IA industrielle échoue rarement à cause du modèle. Elle échoue à cause de la donnée qui l'alimente.",
    date: "2026-05-14",
    body: [
      "La plupart des échecs de projets IA industriels ne viennent pas d'un mauvais choix de modèle, mais d'une donnée d'entrée dans laquelle personne ne fait confiance.",
      "Avant tout cas d'usage IA, il faut pouvoir répondre simplement à trois questions : d'où vient cette donnée, qui en est responsable, et depuis quand est-elle fiable.",
    ],
  },
  {
    slug: "nearshore-sap-maroc-france",
    title: "Nearshore SAP France–Maroc : ce qui marche vraiment",
    excerpt: "Ce que nous avons appris après plusieurs cycles de renfort nearshore sur des programmes ERP critiques.",
    date: "2026-04-22",
    body: [
      "Le nearshore fonctionne quand il est traité comme une extension directe de l'équipe, avec les mêmes outils et le même niveau d'exigence — pas comme une sous-traitance à distance.",
      "Ce texte détaille les conditions concrètes qui font la différence entre un renfort nearshore qui accélère un programme, et un qui le ralentit.",
    ],
  },
];

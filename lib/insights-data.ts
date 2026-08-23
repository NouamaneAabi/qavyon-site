export interface InsightPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  body: string[];
}

export const INSIGHTS: InsightPost[] = [
  {
    slug: "erp-freine-transformation",
    title: "Pourquoi votre ERP freine votre transformation digitale",
    excerpt: "Votre ERP est le cœur de votre système d'information. S'il est vieillissant, mal exploité ou fragmenté, il devient le facteur limitant de toute votre transformation.",
    date: "2026-06-02",
    body: [
      "Votre ERP est le cœur de votre système d'information. S'il est vieillissant, mal exploité ou fragmenté, il devient le facteur limitant de toute votre transformation. Dans cet article, nous expliquons comment identifier les signes d'un ERP à bout de souffle et comment le moderniser sans arrêter la production.",
      "Un ERP obsolète ne se contente pas d'être lent ; il oblige vos équipes à contourner les processus standard en multipliant les fichiers Excel et les saisies manuelles. Ces palliatifs augmentent le risque d'erreurs, faussent les reportings et ralentissent l'ensemble de la chaîne de valeur.",
      "Pour moderniser votre système, la première étape est de réaliser un diagnostic objectif : quels modules sont vraiment utilisés ? Où se trouvent les goulets d'étranglement ? Ensuite, une feuille de route priorisée permet d'aborder la transformation de manière itérative, sans perturber le quotidien de l'usine."
    ],
  },
  {
    slug: "5-erreurs-ia-industrie",
    title: "5 erreurs à éviter avant de lancer un projet IA en industrie",
    excerpt: "L'IA promet des gains de productivité massifs dans l'industrie. Mais 80% des projets IA échouent.",
    date: "2026-05-14",
    body: [
      "L'IA promet des gains de productivité massifs dans l'industrie. Mais 80% des projets IA échouent. La cause ? Des données non fiables, des cas d'usage mal définis et une déconnexion entre les équipes IT et production. Voici les 5 erreurs à éviter absolument.",
      "Erreur n°1 : Sous-estimer la qualité des données. Un modèle, aussi sophistiqué soit-il, ne compensera jamais des données incomplètes ou biaisées. Erreur n°2 : Chercher le « use case » parfait au lieu du plus utile. Concentrez-vous sur des problèmes métiers réels dont la résolution apportera un ROI immédiat.",
      "Erreur n°3 : Négliger l'adoption par les utilisateurs finaux. Si l'opérateur sur ligne ne comprend pas la recommandation de l'IA, il ne l'utilisera pas. Erreur n°4 : Travailler en silos. Les data scientists et les experts métiers doivent collaborer dès le premier jour. Erreur n°5 : Oublier de planifier l'industrialisation dès la phase de POC."
    ],
  },
  {
    slug: "ot-it-pont-industrie",
    title: "OT/IT : le pont indispensable pour l'industrie 4.0",
    excerpt: "L'industrie 4.0 repose sur l'intégration entre les systèmes de gestion (IT) et les machines (OT). Sans ce pont, les données restent cloisonnées.",
    date: "2026-04-22",
    body: [
      "L'industrie 4.0 repose sur l'intégration entre les systèmes de gestion (IT) et les machines (OT). Sans ce pont, les données restent cloisonnées et la valeur ne circule pas. Nous explorons les technologies et les architectures qui permettent de connecter ces deux mondes.",
      "Pendant des années, l'environnement IT et les ateliers OT ont évolué séparément, chacun avec ses propres protocoles et exigences de sécurité. L'IT se focalisait sur les flux financiers et logistiques, tandis que l'OT privilégiait le temps réel et la disponibilité des machines.",
      "Aujourd'hui, l'interconnexion sécurisée de ces deux univers est indispensable pour piloter la production de manière agile. La mise en place de passerelles IoT et l'utilisation de standards comme OPC UA permettent enfin de remonter la donnée brute des automates vers l'ERP, transformant chaque machine en un véritable acteur de votre performance globale."
    ],
  },
];

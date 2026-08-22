import { LayerId } from "@/components/QavyonSystem";

export interface SolutionData {
  slug: string;
  problemTitle: string; // matches the homepage problem-card wording
  name: string;
  metaTitle: string;
  metaDescription: string;
  hook: string;
  systemPath: LayerId[];
  whatWeDo: string[];
  forWho: string;
}

export const SOLUTIONS: Record<string, SolutionData> = {
  "erp-modernization-industrial": {
    slug: "erp-modernization-industrial",
    problemTitle: "Notre ERP ne suit plus",
    name: "Modernisation ERP",
    metaTitle: "Moderniser un ERP industriel — QAVYON",
    metaDescription:
      "Nous modernisons les ERP industriels qui freinent la croissance : intégration, dette technique, exploitation réelle du système en place.",
    hook: "Un ERP qui ne suit plus n'est pas toujours un ERP à remplacer. C'est souvent un ERP mal exploité.",
    systemPath: ["layer-01", "layer-02"],
    whatWeDo: [
      "Diagnostic de l'existant : ce qui est cassé, ce qui est sous-exploité, ce qui est à remplacer.",
      "Feuille de route de modernisation priorisée par impact métier, pas par module.",
      "Exécution avec des équipes seniors qui connaissent l'industrie, pas seulement l'outil.",
    ],
    forWho: "Industriels mid-market dont l'ERP a plus de 8 ans, ou qui a suivi la croissance de l'entreprise sans jamais être repensé.",
  },
  "data-ai": {
    slug: "data-ai",
    problemTitle: "On ne peut pas se fier à nos données",
    name: "Data & IA",
    metaTitle: "Gouvernance et fiabilité des données industrielles — QAVYON",
    metaDescription:
      "Nous construisons les fondations data qui rendent vos décisions — et votre IA — fiables : qualité, gouvernance, architecture.",
    hook: "Aucun modèle d'IA ne compense une donnée dans laquelle personne n'a confiance.",
    systemPath: ["layer-02", "layer-03"],
    whatWeDo: [
      "Cartographie et audit qualité des sources de données critiques.",
      "Architecture data cible, alignée sur les cas d'usage métier réels.",
      "Gouvernance opérationnelle : propriétaires de la donnée, règles de qualité, suivi dans le temps.",
    ],
    forWho: "Entreprises où chaque service a « sa » version des chiffres, et où les décisions se prennent malgré la donnée, pas grâce à elle.",
  },
  "ot-it-integration": {
    slug: "ot-it-integration",
    problemTitle: "L'usine et l'IT ne se parlent pas",
    name: "Intégration OT/IT",
    metaTitle: "Intégration OT/IT en environnement industriel — QAVYON",
    metaDescription:
      "Nous connectons l'atelier de production et le système d'information : capteurs, automates, MES, ERP — un seul système cohérent.",
    hook: "La donnée de production existe. Le problème, c'est qu'elle n'atteint jamais le système qui pourrait s'en servir.",
    systemPath: ["layer-01", "layer-02", "layer-03"],
    whatWeDo: [
      "Audit des flux OT existants (automates, SCADA, MES) et de leurs points de rupture avec l'IT.",
      "Architecture d'intégration sécurisée, pensée pour la résilience industrielle.",
      "Mise en œuvre progressive, ligne par ligne, sans arrêt de production.",
    ],
    forWho: "Sites industriels où la donnée terrain existe mais reste enfermée dans des silos machine par machine.",
  },
  "industrial-ai": {
    slug: "industrial-ai",
    problemTitle: "Notre IA reste bloquée en POC",
    name: "IA industrielle",
    metaTitle: "Industrialiser l'IA en environnement manufacturing — QAVYON",
    metaDescription:
      "Nous faisons passer vos cas d'usage IA du POC à la production, sur des fondations data et ERP suffisamment solides pour tenir.",
    hook: "Un POC qui marche en démo et un cas d'usage qui tourne en production sont deux projets différents.",
    systemPath: ["layer-03", "layer-04"],
    whatWeDo: [
      "Évaluation de la maturité data et système avant tout engagement sur un cas d'usage IA.",
      "Industrialisation du POC : robustesse, monitoring, intégration aux processus existants.",
      "Transfert de compétences pour que vos équipes puissent faire évoluer le système seules.",
    ],
    forWho: "Entreprises avec un ou plusieurs POC IA validés techniquement, mais jamais déployés en production.",
  },
  trust: {
    slug: "trust",
    problemTitle: "On doit sécuriser et gouverner",
    name: "Sécurité & Gouvernance",
    metaTitle: "Sécurité et gouvernance des systèmes industriels — QAVYON",
    metaDescription:
      "Nous intégrons la sécurité et la gouvernance dès la conception, pas comme une couche ajoutée après coup.",
    hook: "La confiance n'est pas une fonctionnalité qu'on ajoute à la fin. C'est une couche transverse à tout le système.",
    systemPath: ["layer-01", "layer-02", "layer-03", "layer-04", "layer-05"],
    whatWeDo: [
      "Audit de sécurité et de gouvernance sur l'ensemble de la chaîne ERP–Data–IA–OT.",
      "Mise en place de règles de gouvernance adaptées à un environnement industriel réel.",
      "Accompagnement à la conformité, sans ralentir les projets en cours.",
    ],
    forWho: "Organisations qui doivent démontrer une gouvernance solide face à des clients, régulateurs ou partenaires.",
  },
  "nearshore-acceleration": {
    slug: "nearshore-acceleration",
    problemTitle: "Il nous faut de la capacité senior, vite",
    name: "Nearshore Acceleration",
    metaTitle: "Renfort nearshore SAP et IT France–Maroc — QAVYON",
    metaDescription:
      "Des équipes seniors nearshore France–Maroc, mobilisables rapidement, pour renforcer vos programmes ERP, Data et IA critiques.",
    hook: "Le bon plan n'a pas de valeur sans la capacité pour l'exécuter à temps.",
    systemPath: ["layer-02", "layer-03", "layer-04"],
    whatWeDo: [
      "Mobilisation d'ingénieurs seniors nearshore, intégrés à vos équipes et vos outils.",
      "Modèle de collaboration France–Maroc rodé, sans perte de qualité ni de réactivité.",
      "Montée en charge ou en compétence progressive, pilotée par la valeur livrée.",
    ],
    forWho: "Programmes ERP, Data ou IA qui manquent de capacité senior disponible dans des délais courts.",
  },
};

export const SOLUTIONS_LIST = Object.values(SOLUTIONS);

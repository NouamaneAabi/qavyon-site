import { LayerId } from "@/components/QavyonSystem";

export interface SolutionData {
  slug: string;
  problemTitle: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  hook: string;
  problemDetail: string;
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
    hook: "Un ERP qui ne suit plus n'est pas toujours un ERP à remplacer. C'est souvent un ERP mal exploité. Nous diagnostiquons, modernisons et faisons évoluer votre socle ERP pour qu'il devienne le pilier central de votre transformation.",
    problemDetail: "Votre ERP a été implémenté il y a 10 ans. Il a suivi la croissance de votre entreprise tant bien que mal, mais aujourd'hui, les lignes de production, les stocks, la finance et la logistique ne communiquent plus de manière fluide. Les données sont fiables sur le papier, mais en pratique, chaque service a sa propre version de la vérité.",
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
    hook: "Des données non fiables empêchent toute prise de décision éclairée. Nous construisons un socle de données solide, gouverné et accessible, pour que vos équipes puissent enfin s'appuyer sur des chiffres qu'elles comprennent.",
    problemDetail: "Chaque service a son fichier Excel. Les rapports sont contradictoires. Le reporting financier ne correspond pas aux chiffres de production. Vous avez investi dans des outils de BI, mais ils reposent sur des données non fiables.",
    systemPath: ["layer-02", "layer-03"],
    whatWeDo: [
      "Audit de la qualité des données et de la gouvernance actuelle.",
      "Mise en place d'un Data Fabric (couche de données unifiée) qui centralise et structure l'information.",
      "Industrialisation de la donnée pour alimenter vos tableaux de bord et vos cas d'usage IA.",
    ],
    forWho: "Industriels dont les données sont silotées, qui ont des difficultés à fiabiliser leur reporting, ou qui souhaitent préparer le terrain pour l'IA.",
  },
  "ot-it-integration": {
    slug: "ot-it-integration",
    problemTitle: "L'usine et l'IT ne se parlent pas",
    name: "Intégration OT/IT",
    metaTitle: "Intégration OT/IT en environnement industriel — QAVYON",
    metaDescription:
      "Nous connectons l'atelier de production et le système d'information : capteurs, automates, MES, ERP — un seul système cohérent.",
    hook: "Le fossé entre l'IT (systèmes de gestion) et l'OT (machines, capteurs) freine votre performance industrielle. Nous intégrons les deux mondes pour créer un flux de données continu, de la ligne de production jusqu'au tableau de bord.",
    problemDetail: "Les machines de production génèrent des données précieuses, mais elles restent cloisonnées dans l'atelier. Les équipes IT ne peuvent pas les exploiter, et les équipes production ne voient pas les indicateurs de performance globale.",
    systemPath: ["layer-01", "layer-02", "layer-03"],
    whatWeDo: [
      "Connexion des équipements (protocoles OT, capteurs, IoT).",
      "Mise en place d'une passerelle OT/IT pour transférer les données de l'atelier vers les systèmes de gestion.",
      "Création d'indicateurs de performance (KPI) temps réel pour piloter la production.",
    ],
    forWho: "Industriels qui veulent rapprocher les équipes production et IT, ou qui souhaitent exploiter les données machines pour améliorer leur efficacité.",
  },
  "industrial-ai": {
    slug: "industrial-ai",
    problemTitle: "Notre IA reste bloquée en POC",
    name: "IA industrielle",
    metaTitle: "Industrialiser l'IA en environnement manufacturing — QAVYON",
    metaDescription:
      "Nous faisons passer vos cas d'usage IA du POC à la production, sur des fondations data et ERP suffisamment solides pour tenir.",
    hook: "Les projets IA échouent souvent parce qu'ils sont déconnectés de la réalité industrielle. Nous industrialisons vos cas d'usage IA en les adossant à des données fiables et à des processus métier éprouvés.",
    problemDetail: "Vous avez des idées d'IA, des POC ont été lancés, mais rien ne passe en production. Le manque de données fiables, la complexité des environnements industriels et l'absence de compétences internes bloquent la mise à l'échelle.",
    systemPath: ["layer-03", "layer-04"],
    whatWeDo: [
      "Sélection des cas d'usage à fort impact (maintenance prédictive, optimisation de production, qualité).",
      "Industrialisation de l'IA : de la donnée au modèle, jusqu'à son intégration dans les outils métier.",
      "Accompagnement au changement pour que les équipes adoptent l'IA au quotidien.",
    ],
    forWho: "Industriels qui ont des projets IA bloqués, ou qui souhaitent passer à l'échelle sans perdre de temps en POC infructueux.",
  },
  trust: {
    slug: "trust",
    problemTitle: "On doit sécuriser et gouverner",
    name: "Sécurité & Gouvernance",
    metaTitle: "Sécurité et gouvernance des systèmes industriels — QAVYON",
    metaDescription:
      "Nous intégrons la sécurité et la gouvernance dès la conception, pas comme une couche ajoutée après coup.",
    hook: "La sécurité et la gouvernance ne sont pas des options. Elles sont le socle de toute transformation numérique. Nous sécurisons vos systèmes et encadrons vos données pour que vous puissiez innover sereinement.",
    problemDetail: "Vous avez des données sensibles, des systèmes critiques, et une pression réglementaire croissante. Le risque cyber est réel, et la gouvernance des données est devenue un enjeu stratégique.",
    systemPath: ["layer-01", "layer-02", "layer-03", "layer-04", "layer-05"],
    whatWeDo: [
      "Audit de sécurité de vos systèmes (IT et OT).",
      "Mise en place d'une gouvernance des données (qui accède à quoi, pourquoi, et comment).",
      "Conformité aux réglementations (RGPD, NIS 2, etc.).",
    ],
    forWho: "Industriels soumis à des exigences réglementaires strictes, ou qui veulent sécuriser leur transformation numérique avant d'aller plus loin.",
  },
  "nearshore-acceleration": {
    slug: "nearshore-acceleration",
    problemTitle: "Il nous faut de la capacité senior, vite",
    name: "Nearshore Acceleration",
    metaTitle: "Renfort nearshore SAP et IT France–Maroc — QAVYON",
    metaDescription:
      "Des équipes seniors nearshore France–Maroc, mobilisables rapidement, pour renforcer vos programmes ERP, Data et IA critiques.",
    hook: "Vous avez besoin d'expertise technique pour lancer un projet, mais vous ne trouvez pas les compétences en interne. Nous vous fournissons des ingénieurs seniors, en nearshore, pour accélérer vos projets.",
    problemDetail: "La pénurie de talents IT est réelle. Vous avez un projet critique, mais vous n'avez pas les ressources internes pour le mener à bien. L'alternative : des cabinets de conseil coûteux ou des freelances sans engagement.",
    systemPath: ["layer-02", "layer-03", "layer-04"],
    whatWeDo: [
      "Renfort senior : des architectes, développeurs, experts ERP/IA qui rejoignent votre équipe.",
      "Delivery nearshore depuis le Maroc : fuseau horaire compatible, culture proche, coût maîtrisé.",
      "Intégration complète dans vos équipes, avec le même niveau d'exigence.",
    ],
    forWho: "Industriels qui veulent accélérer un projet sans recruter en interne, ou qui cherchent une alternative fiable aux cabinets traditionnels.",
  },
};

export const SOLUTIONS_LIST = Object.values(SOLUTIONS);

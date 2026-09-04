import { LayerId } from "@/components/QavyonSystem";

export interface SolutionData {
  slug: string;
  problemTitle: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  problems: string[];
  approach: string;
  whatWeDo: string[];
  environments?: string;
  useCases: string[];
  faq: { question: string; answer: string }[];
  systemPath: LayerId[];
  nearshoreLever?: string;
  relatedInsights?: string[];
}

export const SOLUTIONS: Record<string, SolutionData> = {
  "erp-modernization-industrial": {
    slug: "erp-modernization-industrial",
    problemTitle: "Modernisation ERP industriel",
    name: "Modernisation ERP",
    metaTitle: "Modernisation ERP industriel & migration SAP S/4HANA | QAVYON",
    metaDescription: "Auditer, moderniser, migrer et intégrer votre ERP industriel (SAP S/4HANA, Oracle, Sage X3). Une approche d'ingénieurs, priorisée par impact métier — pas par module.",
    intro: "Votre ERP est le socle qui orchestre commandes, stocks, finance et production. Quand il ne suit plus, tout ralentit : les équipes contournent les processus à coups de fichiers Excel, chaque service développe sa propre vérité, et la moindre évolution devient un projet à risque. La bonne nouvelle : un ERP qui « ne suit plus » n'est pas toujours un ERP à remplacer. C'est souvent un ERP mal exploité, mal intégré, ou alourdi par dix ans de customisations non documentées. Nous diagnostiquons ce qui est réellement en cause avant de proposer quoi que ce soit.",
    problems: [
      "Un ERP vieillissant ou sur-customisé qui bloque les évolutions.",
      "Des modules qui ne communiquent plus (production, stocks, finance, logistique désynchronisés).",
      "Une donnée « fiable sur le papier », contredite par des ressaisies manuelles.",
      "Des projets de migration repoussés par peur d'arrêter la production.",
      "Une dépendance à quelques personnes qui « savent comment ça marche ».",
      "Un paysage multi-ERP après croissance externe, sans consolidation."
    ],
    approach: "On commence par un diagnostic objectif, pas par une recommandation de licence. On priorise par impact métier, pas par module. On traite d'abord ce qui débloque la chaîne de valeur. La modernisation se fait de façon itérative, sans arrêter l'usine.",
    whatWeDo: [
      "Audit ERP : état des lieux technique et fonctionnel.",
      "Feuille de route de modernisation priorisée par impact P&L.",
      "Migration (dont trajectoires vers S/4HANA) cadrée pour limiter le risque.",
      "Intégration de l'ERP avec la couche Data, le MES et l'OT.",
      "Optimisation & gouvernance : rationalisation des customisations.",
      "Exécution senior avec transfert de compétences."
    ],
    environments: "Nous intervenons sur les environnements ERP courants de l'industrie mid-market. [Périmètre réellement maîtrisé — À VALIDER PAR QAVYON]. Exemples de marché : SAP ECC / SAP S/4HANA, Oracle Fusion, Sage X3, Microsoft Dynamics.",
    useCases: [
      "Moderniser un ERP sur-customisé sans big-bang",
      "Consolider plusieurs ERP après acquisition",
      "Cadrer une migration vers S/4HANA",
      "Reconnecter l'ERP au terrain (ERP↔MES)"
    ],
    faq: [
      { question: "Quand faut-il remplacer son ERP plutôt que le moderniser ?", answer: "Quand la dette technique dépasse la valeur du socle." },
      { question: "Comment auditer un ERP ?", answer: "En croisant 3 plans : fonctionnel, technique, organisationnel." },
      { question: "Comment réussir une migration SAP S/4HANA ?", answer: "En traitant la donnée et l'intégration avant le passage technique." },
      { question: "Combien coûte une migration ERP ?", answer: "Cela dépend du périmètre, de l'état de la donnée et des customisations. [Fourchettes à valider]" },
      { question: "Peut-on moderniser un ERP sans arrêter la production ?", answer: "Oui, par une approche itérative." }
    ],
    systemPath: ["layer-01", "layer-02"],
    nearshoreLever: "Mobilisez des experts ERP (SAP, Oracle, Sage) en nearshore pour renforcer vos équipes projet sans faire exploser le budget d'intégration.",
    relatedInsights: ["erp-frein-transformation-digitale"]
  },
  "data-ai": {
    slug: "data-ai",
    problemTitle: "Data industrielle : une donnée à laquelle vos équipes se fient enfin",
    name: "Data & IA",
    metaTitle: "Gouvernance & architecture de données industrielles | QAVYON",
    metaDescription: "Une donnée fiable, gouvernée et exploitable pour l'industrie : stratégie data, architecture, qualité, intégration et BI décisionnelle. Le socle avant l'IA.",
    intro: "Des données non fiables empêchent toute décision sérieuse. Dans l'industrie, le problème est rarement le manque de données — c'est leur dispersion : entre l'ERP, le MES, les capteurs, les fichiers métier et les outils de reporting, chaque service finit avec sa propre version de la vérité. Nous construisons le socle qui rend la donnée fiable, gouvernée et exploitable — la condition de tout le reste, IA comprise.",
    problems: [
      "Données silotées",
      "Reporting contesté",
      "Qualité inégale",
      "Pas de gouvernance",
      "Dashboards multiples qui ne réconcilient rien",
      "IA impossible faute de données fiables"
    ],
    approach: "On part de la décision, pas de la technologie. On fiabilise en priorité ce qui porte les décisions, on établit les référentiels et la gouvernance, puis on industrialise les flux.",
    whatWeDo: [
      "Stratégie data",
      "Architecture",
      "Qualité et référentiels",
      "Gouvernance (propriété, cycles, accès)",
      "Intégration/pipelines",
      "Socle BI/reporting fiable"
    ],
    useCases: [],
    faq: [
      { question: "Qu'est-ce qu'une stratégie data ?", answer: "Le choix des décisions que la donnée doit outiller, et l'architecture/gouvernance minimale." },
      { question: "Comment améliorer la qualité des données ?", answer: "Désigner des propriétaires, unifier les référentiels, corriger à la source." },
      { question: "Faut-il un data warehouse pour commencer ?", answer: "Non, commencer par les cas de décision prioritaires et la fiabilité à la source." }
    ],
    systemPath: ["layer-02", "layer-03"],
    nearshoreLever: "Renforcez votre équipe avec des Data Engineers et Data Analysts seniors basés au Maroc, en totale intégration avec vos équipes européennes.",
    relatedInsights: ["erreurs-projet-ia-industrie"]
  },
  "industrial-ai": {
    slug: "industrial-ai",
    problemTitle: "IA industrielle : de la valeur réelle, pas des POC",
    name: "IA industrielle",
    metaTitle: "IA industrielle : industrialiser des cas d'usage, pas des POC | QAVYON",
    metaDescription: "De l'IA qui crée réellement de la valeur dans l'industrie : cas d'usage adossés à une donnée fiable, intégrés à vos systèmes et passés à l'échelle — pas des prototypes.",
    intro: "L'IA industrielle échoue rarement à cause du modèle. Elle échoue à cause de la donnée qui l'alimente et de son absence d'intégration au réel. Résultat : des POC brillants en démo, jamais en production. Nous industrialisons des cas d'usage, adossés à une donnée de confiance et connectés à vos processus.",
    problems: [
      "POC qui n'avancent pas",
      "IA déconnectée des données de production",
      "Modèles sans propriétaire ni maintenance",
      "« IA » comme objectif plutôt que comme moyen",
      "Absence de mesure de la valeur"
    ],
    approach: "On part d'un problème métier mesurable et d'une donnée disponible et fiable. On industrialise un ou deux cas de bout en bout — intégration, mise en production, monitoring, transfert — avant d'élargir. On ne pose jamais l'IA sur des données non gouvernées.",
    whatWeDo: [
      "Sélection des cas d'usage à fort impact",
      "Industrialisation de l'IA de la donnée au modèle",
      "Intégration dans les outils métier",
      "Accompagnement au changement pour l'adoption au quotidien"
    ],
    useCases: [
      "Maintenance prédictive (réduire les arrêts non planifiés)",
      "Contrôle qualité assisté",
      "Prévision de la demande et optimisation des stocks",
      "Optimisation énergétique et de procédés",
      "Assistance documentaire/technique"
    ],
    faq: [
      { question: "Comment utiliser l'IA dans l'industrie ?", answer: "Partir d'un problème métier mesurable et d'une donnée fiable." },
      { question: "Quels sont les cas d'usage de l'IA en entreprise industrielle ?", answer: "Maintenance prédictive, contrôle qualité, prévision des stocks, optimisation énergétique." },
      { question: "Pourquoi nos POC IA n'aboutissent-ils jamais ?", answer: "Données non fiables, absence d'intégration, aucun plan d'exploitation." }
    ],
    systemPath: ["layer-03", "layer-04"],
    nearshoreLever: "Nos Data Scientists et MLOps nearshore accélèrent le passage en production de vos modèles industriels.",
    relatedInsights: ["erreurs-projet-ia-industrie"]
  },
  "ot-it-integration": {
    slug: "ot-it-integration",
    problemTitle: "Intégration OT/IT : connecter l'usine et le système d'information",
    name: "Intégration OT/IT",
    metaTitle: "Convergence IT/OT & intégration ERP-MES pour l'industrie | QAVYON",
    metaDescription: "Connecter l'usine et le système d'information : intégration OT/IT, ERP↔MES, données terrain fiables et cybersécurité industrielle.",
    intro: "L'industrie 4.0 repose sur une idée simple et rarement tenue : les systèmes de gestion (IT) et les machines (OT) doivent partager leurs données. Sans ce pont, la donnée reste cloisonnée — l'IT décide sans le terrain, le terrain opère sans visibilité. Nous concevons et sécurisons cette convergence.",
    problems: [
      "Usine et IT déconnectés",
      "Données machine non exploitées",
      "Ordonnancement désynchronisé",
      "MES absent ou isolé",
      "Sécurité OT traitée comme l'IT",
      "Projets IA privés de données terrain"
    ],
    approach: "On traite l'intégration OT/IT comme une architecture, pas comme un connecteur ponctuel. On intègre la sécurité OT by design.",
    whatWeDo: [
      "Connexion des équipements (protocoles OT, capteurs, IoT)",
      "Mise en place d'une passerelle OT/IT",
      "Création d'indicateurs de performance temps réel",
      "Sécurisation des architectures convergées"
    ],
    useCases: [
      "Synchroniser l'ordonnancement ERP avec l'atelier",
      "Fiabiliser les stocks par la donnée terrain",
      "Alimenter la maintenance prédictive",
      "Sécuriser un réseau OT"
    ],
    faq: [
      { question: "Qu'est-ce que la convergence IT/OT ?", answer: "La mise en communication maîtrisée des systèmes de gestion et des systèmes industriels." },
      { question: "Comment sécuriser un environnement industriel ?", answer: "Par segmentation réseau, contrôle d'accès strict, supervision." },
      { question: "Pourquoi intégrer l'ERP et le MES ?", answer: "Pour aligner la planification et l'exécution sur une même réalité." }
    ],
    systemPath: ["layer-01", "layer-02", "layer-03"],
    nearshoreLever: "Accélérez le déploiement de vos architectures Edge et de vos passerelles OT/IT grâce à notre centre de services dédié.",
    relatedInsights: ["pont-ot-it-industrie-4"]
  },
  trust: {
    slug: "trust",
    problemTitle: "Sécurité & Gouvernance : la confiance intégrée dès la conception",
    name: "Sécurité & Gouvernance",
    metaTitle: "Gouvernance SI & cybersécurité industrielle | QAVYON",
    metaDescription: "Sécurité et gouvernance intégrées dès la conception : gouvernance des données et des accès, cybersécurité ERP et OT, gestion des risques et conformité pour l'industrie.",
    intro: "La sécurité et la gouvernance ne sont pas une couche qu'on ajoute à la fin. Dans un système qui connecte ERP, data, IA et OT, elles doivent envelopper l'ensemble. Ajouter des outils sans consolider ni gouverner ne fait qu'étendre la surface d'attaque. Nous intégrons la confiance dans l'architecture, pas par-dessus.",
    problems: [
      "Gouvernance absente",
      "Sécurité OT traitée à part",
      "ERP aux droits mal maîtrisés",
      "Conformité subie",
      "Risques non cartographiés"
    ],
    approach: "Nous intégrons la confiance dans l'architecture, pas par-dessus.",
    whatWeDo: [
      "Gouvernance des données",
      "Gestion des accès et identités",
      "Architecture de cybersécurité industrielle",
      "Gestion des risques",
      "Appui à la conformité"
    ],
    useCases: [],
    faq: [
      { question: "Qu'est-ce que la gouvernance SI ?", answer: "L'ensemble des règles, rôles et responsabilités qui définissent qui décide, qui possède et qui accède." },
      { question: "En quoi la cybersécurité OT diffère-t-elle de l'IT ?", answer: "L'OT priorise la disponibilité ; on ne peut pas appliquer les réflexes IT." },
      { question: "Par où commencer ?", answer: "Par une cartographie des accès et des risques." }
    ],
    systemPath: ["layer-01", "layer-02", "layer-03", "layer-04", "layer-05"],
    nearshoreLever: "Déployez votre gouvernance et consolidez la sécurité de vos accès via notre plateau nearshore spécialisé."
  },
  "nearshore-acceleration": {
    slug: "nearshore-acceleration",
    problemTitle: "Nearshore France-Maroc : de la capacité senior, vite",
    name: "Nearshore Acceleration",
    metaTitle: "Nearshore France-Maroc : ingénierie ERP & data senior | QAVYON",
    metaDescription: "Capacité d'ingénierie senior mobilisable vite, en nearshore France-Maroc : proximité horaire et culturelle, gouvernance et qualité.",
    intro: "Vous avez besoin d'expertise technique pour lancer ou sauver un programme, et vous ne trouvez pas les compétences en interne. Notre modèle nearshore France-Maroc vous donne accès à des ingénieurs seniors mobilisables rapidement, en proximité horaire et culturelle avec l'Europe. Le nearshore est chez nous un avantage de delivery, jamais le produit.",
    problems: [
      "Pénurie de compétences seniors",
      "Recrutement trop lent",
      "Renforts offshore de qualité inégale",
      "Décalage horaire et culturel",
      "Dépendance à des prestataires opaques"
    ],
    approach: "Modèle de collaboration France–Maroc rodé, sans perte de qualité ni de réactivité, traité comme une extension de vos équipes.",
    whatWeDo: [
      "Renfort senior sur programmes ERP/Data/OT critiques",
      "Équipes dédiées ou en soutien",
      "Gouvernance de delivery",
      "Transfert de compétences",
      "Montée en charge rapide"
    ],
    useCases: [],
    faq: [
      { question: "Le nearshore, est-ce juste moins cher ?", answer: "Non. L'intérêt premier est l'accès à de la séniorité mobilisable vite." },
      { question: "Comment garantissez-vous la qualité et la sécurité ?", answer: "Par une gouvernance de programme pilotée côté Europe." },
      { question: "En combien de temps une équipe peut-elle démarrer ?", answer: "[Délai réel de mobilisation — À VALIDER PAR QAVYON]" }
    ],
    systemPath: ["layer-02", "layer-03", "layer-04"]
  }
};

export const SOLUTIONS_LIST = Object.values(SOLUTIONS);

/**
 * QAVYON QuickScan rules engine.
 * Pure, deterministic, server-side logic — no LLM, no external calls.
 * Runs entirely from the 7 wizard answers submitted by the user.
 */

export type Sector =
  | "automotive"
  | "agri-food"
  | "chemicals-pharma"
  | "industrial-equipment"
  | "energy-utilities"
  | "other";

export type MaturityAnswer = "0" | "1" | "2" | "3";

export type Constraint = "budget" | "time" | "internal-skills" | "change-management";
export type Horizon = "under-3-months" | "3-to-12-months" | "over-12-months";

export interface QuickScanInput {
  sector: Sector;
  problemDescription: string; // Q2, free text
  erp: MaturityAnswer; // Q3
  data: MaturityAnswer; // Q4
  ai: MaturityAnswer; // Q5
  otIt: MaturityAnswer; // Q6
  constraint: Constraint; // Q7a
  horizon: Horizon; // Q7b
}

export type Domain = "erp" | "data" | "ai" | "otIt";

export type QavyonArea =
  | "erp-modernization"
  | "data-ai"
  | "ot-it-integration"
  | "industrial-ai"
  | "trust";

export interface QuickScanResult {
  whatWeHeard: string;
  whatMattersMost: { domain: Domain; label: string; reason: string }[];
  why: string;
  qavyonAreas: { area: QavyonArea; label: string }[];
  risks: string[];
  nextStep: { title: string; description: string };
  cta: { label: string; href: string };
}

// Domain priority when maturity scores tie: ERP > Data > OT/IT > IA
const DOMAIN_PRIORITY: Domain[] = ["erp", "data", "otIt", "ai"];

const DOMAIN_LABELS: Record<Domain, string> = {
  erp: "ERP",
  data: "Données",
  ai: "IA",
  otIt: "OT/IT",
};

const SECTOR_LABELS: Record<Sector, string> = {
  automotive: "Automobile",
  "agri-food": "Agroalimentaire",
  "chemicals-pharma": "Chimie / Pharma",
  "industrial-equipment": "Équipement industriel",
  "energy-utilities": "Énergie / Utilities",
  other: "Autre secteur industriel",
};

function scores(input: QuickScanInput): Record<Domain, number> {
  return {
    erp: Number(input.erp),
    data: Number(input.data),
    ai: Number(input.ai),
    otIt: Number(input.otIt),
  };
}

/** Step 2: Determine the single limiting factor. Lowest maturity wins;
 *  ties broken by DOMAIN_PRIORITY (ERP > Data > OT/IT > IA). */
function getLimitingFactor(s: Record<Domain, number>): Domain {
  let best: Domain = DOMAIN_PRIORITY[0];
  let bestScore = s[best];
  for (const domain of DOMAIN_PRIORITY) {
    if (s[domain] < bestScore) {
      best = domain;
      bestScore = s[domain];
    }
  }
  return best;
}

/** Step 3: Ordered list of 2-3 priorities, limiting factor first,
 *  then remaining domains by ascending maturity (priority order as tiebreak). */
function getPriorities(s: Record<Domain, number>, limiting: Domain): Domain[] {
  const rest = DOMAIN_PRIORITY.filter((d) => d !== limiting).sort((a, b) => {
    if (s[a] !== s[b]) return s[a] - s[b];
    return DOMAIN_PRIORITY.indexOf(a) - DOMAIN_PRIORITY.indexOf(b);
  });
  return [limiting, ...rest].slice(0, 3);
}

/** Step 4: Map domains touched to QAVYON areas. */
function getQavyonAreas(priorities: Domain[], s: Record<Domain, number>): QavyonArea[] {
  const areas = new Set<QavyonArea>();
  for (const domain of priorities) {
    if (domain === "erp") areas.add("erp-modernization");
    if (domain === "data") areas.add("data-ai");
    if (domain === "ai") {
      areas.add("industrial-ai");
      areas.add("data-ai");
    }
    if (domain === "otIt") areas.add("ot-it-integration");
  }
  // Trust is always relevant once data or AI maturity is non-trivial,
  // since governance risk grows with exposure.
  if (s.data >= 1 || s.ai >= 1) areas.add("trust");
  return Array.from(areas);
}

const AREA_LABELS: Record<QavyonArea, string> = {
  "erp-modernization": "Modernisation ERP",
  "data-ai": "Data & IA",
  "ot-it-integration": "Intégration OT/IT",
  "industrial-ai": "IA industrielle",
  trust: "Sécurité & Gouvernance",
};

/** Step 5: Risk rules — pattern-matched combinations of domain maturity. */
function getRisks(s: Record<Domain, number>): string[] {
  const risks: string[] = [];

  if (s.ai >= 1 && s.data <= 1) {
    risks.push(
      "IA sur données non fiables : tout cas d'usage IA hérite des lacunes de qualité et de gouvernance des données sous-jacentes."
    );
  }
  if (s.erp <= 1 && s.data >= 2) {
    risks.push(
      "Fondations ERP fragiles : un ERP vieillissant ou mal exploité limite la valeur des initiatives data même matures."
    );
  }
  if (s.otIt <= 1 && s.ai >= 2) {
    risks.push(
      "IA déconnectée du terrain : sans intégration OT/IT, les cas d'usage IA restent théoriques et ne rencontrent pas la réalité de l'usine."
    );
  }
  if (s.erp <= 1 && s.otIt <= 1) {
    risks.push(
      "Silo double ERP/OT : la donnée de production et la donnée de gestion ne se rencontrent nulle part, ce qui bloque toute vue unifiée."
    );
  }
  if (s.data >= 2 && s.ai <= 1) {
    risks.push(
      "Opportunité IA non saisie : la maturité data actuelle permettrait déjà d'industrialiser des cas d'usage IA au-delà du POC."
    );
  }
  if (risks.length === 0) {
    risks.push(
      "Risque de dispersion : sans priorisation claire, l'effort peut se disperser sur plusieurs chantiers en parallèle sans levier dominant."
    );
  }
  return risks;
}

/** Step 6: Next step, driven by constraint (Q7a) and horizon (Q7b). */
function getNextStep(constraint: Constraint, horizon: Horizon): { title: string; description: string } {
  if (horizon === "under-3-months") {
    if (constraint === "budget") {
      return {
        title: "Cadrage court, périmètre resserré",
        description:
          "Sur un horizon court et un budget contraint, nous cadrons d'abord un périmètre minimal à fort impact avant tout engagement plus large.",
      };
    }
    return {
      title: "Sprint de cadrage immédiat",
      description:
        "L'horizon est court : nous démarrons par un sprint de cadrage pour poser un diagnostic partagé et un plan d'action concret sous 2 à 3 semaines.",
    };
  }

  if (horizon === "3-to-12-months") {
    if (constraint === "internal-skills") {
      return {
        title: "Cadrage + renfort de capacité senior",
        description:
          "Le manque de capacité interne est le facteur limitant : nous combinons cadrage et renfort d'équipe senior (nearshore ou sur site) pour tenir le calendrier.",
      };
    }
    if (constraint === "change-management") {
      return {
        title: "Cadrage avec plan de conduite du changement",
        description:
          "Sur cet horizon, la conduite du changement est intégrée dès le cadrage pour sécuriser l'adoption, pas seulement la livraison technique.",
      };
    }
    return {
      title: "Cadrage → Système → Industrialisation",
      description:
        "Nous suivons notre méthodologie standard : cadrage du périmètre, mise en place du système cible, puis industrialisation progressive.",
    };
  }

  return {
    title: "Feuille de route pluriannuelle",
    description:
      "Sur un horizon long, nous structurons une feuille de route par étapes, avec des jalons de valeur à chaque phase plutôt qu'un big-bang.",
  };
}

export function runQuickScan(input: QuickScanInput): QuickScanResult {
  const s = scores(input);
  const limiting = getLimitingFactor(s);
  const priorityDomains = getPriorities(s, limiting);
  const areas = getQavyonAreas(priorityDomains, s);
  const risks = getRisks(s);
  const nextStep = getNextStep(input.constraint, input.horizon);

  const whatWeHeard = `Dans le secteur ${SECTOR_LABELS[input.sector]}, vous décrivez : « ${input.problemDescription.trim()} »`;

  const whatMattersMost = priorityDomains.map((domain, i) => ({
    domain,
    label: DOMAIN_LABELS[domain],
    reason:
      i === 0
        ? `${DOMAIN_LABELS[domain]} est le facteur limitant actuel (maturité ${s[domain]}/3) : c'est le levier qui débloque le reste.`
        : `${DOMAIN_LABELS[domain]} vient ensuite (maturité ${s[domain]}/3) et conditionne une partie de la valeur des autres chantiers.`,
  }));

  const why = `Le facteur limitant identifié est ${DOMAIN_LABELS[limiting]}. Notre approche priorise toujours ERP > Data > OT/IT > IA à maturité égale, car un ERP instable ou une donnée non fiable annule la valeur de toute couche construite au-dessus.`;

  return {
    whatWeHeard,
    whatMattersMost,
    why,
    qavyonAreas: areas.map((area) => ({ area, label: AREA_LABELS[area] })),
    risks,
    nextStep,
    cta: { label: "Prendre rendez-vous", href: "/book" },
  };
}

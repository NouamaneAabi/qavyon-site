"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/tracking";
import type { QuickScanInput, QuickScanResult } from "@/lib/quickscan-engine";

const SESSION_KEY = "qavyon:quickscan:answers";

type Answers = Partial<QuickScanInput>;

interface RadioOption {
  value: string;
  label: string;
}

const SECTORS: RadioOption[] = [
  { value: "automotive", label: "Automobile" },
  { value: "agri-food", label: "Agroalimentaire" },
  { value: "chemicals-pharma", label: "Chimie / Pharma" },
  { value: "industrial-equipment", label: "Équipement industriel" },
  { value: "energy-utilities", label: "Énergie / Utilities" },
  { value: "other", label: "Autre secteur industriel" },
];

const ERP_OPTIONS: RadioOption[] = [
  { value: "0", label: "ERP vieillissant, plus vraiment supporté" },
  { value: "1", label: "ERP en place mais mal exploité" },
  { value: "2", label: "ERP fonctionnel mais peu intégré au reste" },
  { value: "3", label: "ERP moderne, bien intégré et bien exploité" },
];

const DATA_OPTIONS: RadioOption[] = [
  { value: "0", label: "Chaque service a sa propre version des chiffres" },
  { value: "1", label: "Des données existent mais leur fiabilité est incertaine" },
  { value: "2", label: "Des données globalement fiables, gouvernance partielle" },
  { value: "3", label: "Données fiables, gouvernées, avec des propriétaires clairs" },
];

const AI_OPTIONS: RadioOption[] = [
  { value: "0", label: "Aucun cas d'usage IA en cours" },
  { value: "1", label: "Un ou plusieurs POC, bloqués avant la production" },
  { value: "2", label: "Un cas d'usage déployé, partiellement industrialisé" },
  { value: "3", label: "Plusieurs cas d'usage IA industrialisés et suivis" },
];

const OTIT_OPTIONS: RadioOption[] = [
  { value: "0", label: "L'usine et l'IT sont complètement cloisonnées" },
  { value: "1", label: "Quelques ponts manuels, pas d'intégration réelle" },
  { value: "2", label: "Intégration partielle sur certaines lignes ou sites" },
  { value: "3", label: "Intégration OT/IT unifiée et fiable" },
];

const CONSTRAINTS: RadioOption[] = [
  { value: "budget", label: "Budget limité" },
  { value: "time", label: "Temps limité" },
  { value: "internal-skills", label: "Manque de compétences internes" },
  { value: "change-management", label: "Résistance au changement en interne" },
];

const HORIZONS: RadioOption[] = [
  { value: "under-3-months", label: "Moins de 3 mois" },
  { value: "3-to-12-months", label: "3 à 12 mois" },
  { value: "over-12-months", label: "Plus de 12 mois" },
];

const TOTAL_STEPS = 8;

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={[
            "cursor-pointer rounded-sm border px-4 py-3 text-sm transition-colors",
            value === opt.value ? "border-cyan bg-graphite text-ice" : "border-steel bg-carbon text-mist hover:border-mist",
          ].join(" ")}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

export default function QuickScanWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<QuickScanResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const completedRef = useRef(false);
  const startedRef = useRef(false);

  // Hydrate from sessionStorage on mount.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Persist to sessionStorage on every change.
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(answers));
    } catch {
      // storage unavailable — non-blocking
    }
  }, [answers]);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("quickscan_start");
    }
    track(`quickscan_step_${step}`);
  }, [step]);

  // Fire an abandon event if the user leaves mid-wizard.
  useEffect(() => {
    function handleUnload() {
      if (!completedRef.current) {
        track(`quickscan_abandon_${step}`);
      }
    }
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [step]);

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1: return !!answers.sector;
      case 2: return !!answers.problemDescription && answers.problemDescription.trim().length > 0;
      case 3: return !!answers.erp;
      case 4: return !!answers.data;
      case 5: return !!answers.ai;
      case 6: return !!answers.otIt;
      case 7: return !!answers.constraint && !!answers.horizon;
      case 8: return !!answers.email && answers.email.includes("@") && !!answers.consent;
      default: return false;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    track("quickscan_email_submitted");
    track("quickscan_consent_given");
    try {
      const res = await fetch("/api/quickscan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors du calcul du diagnostic.");
      completedRef.current = true;
      setResult(data.result);
      track("quickscan_complete");
      sessionStorage.removeItem(SESSION_KEY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else handleSubmit();
  }

  function back() {
    if (step > 1) setStep((s) => s - 1);
  }

  if (result) {
    return <QuickScanResultView result={result} />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-mist">
          <span>Étape {step} / {TOTAL_STEPS}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-steel">
          <div
            className="h-full bg-cyan transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="card-surface p-6 md:p-10">
        {step === 1 && (
          <fieldset>
            <legend className="mb-6 font-display text-xl font-semibold text-ice">Dans quel secteur opérez-vous ?</legend>
            <RadioGroup name="Secteur" options={SECTORS} value={answers.sector} onChange={(v) => set("sector", v as QuickScanInput["sector"])} />
          </fieldset>
        )}
        {step === 2 && (
          <fieldset>
            <legend className="mb-6 font-display text-xl font-semibold text-ice">Décrivez le problème en une ou deux phrases.</legend>
            <textarea
              value={answers.problemDescription ?? ""}
              onChange={(e) => set("problemDescription", e.target.value)}
              rows={5}
              maxLength={600}
              className="w-full rounded-sm border border-steel bg-obsidian px-4 py-3 text-ice placeholder:text-mist/50"
              placeholder="Ex : Notre ERP ne suit plus la croissance de nos lignes de production…"
            />
          </fieldset>
        )}
        {step === 3 && (
          <fieldset>
            <legend className="mb-6 font-display text-xl font-semibold text-ice">Comment décririez-vous votre ERP aujourd'hui ?</legend>
            <RadioGroup name="État ERP" options={ERP_OPTIONS} value={answers.erp} onChange={(v) => set("erp", v as QuickScanInput["erp"])} />
          </fieldset>
        )}
        {step === 4 && (
          <fieldset>
            <legend className="mb-6 font-display text-xl font-semibold text-ice">Et vos données ?</legend>
            <RadioGroup name="État Data" options={DATA_OPTIONS} value={answers.data} onChange={(v) => set("data", v as QuickScanInput["data"])} />
          </fieldset>
        )}
        {step === 5 && (
          <fieldset>
            <legend className="mb-6 font-display text-xl font-semibold text-ice">Où en est votre IA ?</legend>
            <RadioGroup name="État IA" options={AI_OPTIONS} value={answers.ai} onChange={(v) => set("ai", v as QuickScanInput["ai"])} />
          </fieldset>
        )}
        {step === 6 && (
          <fieldset>
            <legend className="mb-6 font-display text-xl font-semibold text-ice">L'usine (OT) et l'IT se parlent-elles ?</legend>
            <RadioGroup name="État OT/IT" options={OTIT_OPTIONS} value={answers.otIt} onChange={(v) => set("otIt", v as QuickScanInput["otIt"])} />
          </fieldset>
        )}
        {step === 7 && (
          <div className="space-y-8">
            <fieldset>
              <legend className="mb-6 font-display text-xl font-semibold text-ice">Quelle est votre principale contrainte ?</legend>
              <RadioGroup name="Contrainte" options={CONSTRAINTS} value={answers.constraint} onChange={(v) => set("constraint", v as QuickScanInput["constraint"])} />
            </fieldset>
            <fieldset>
              <legend className="mb-6 font-display text-xl font-semibold text-ice">Sur quel horizon ?</legend>
              <RadioGroup name="Horizon" options={HORIZONS} value={answers.horizon} onChange={(v) => set("horizon", v as QuickScanInput["horizon"])} />
            </fieldset>
          </div>
        )}
        {step === 8 && (
          <div className="space-y-6">
            <fieldset>
              <legend className="mb-6 font-display text-xl font-semibold text-ice">Où envoyer votre diagnostic ?</legend>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-mist">Email professionnel</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={answers.email ?? ""}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full rounded-sm border border-steel bg-obsidian px-4 py-3 text-ice placeholder:text-mist/50"
                    placeholder="prenom@entreprise.com"
                  />
                </div>
                <label className="flex items-start gap-3 text-sm text-mist">
                  <input
                    type="checkbox"
                    checked={answers.consent ?? false}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-sm border-steel bg-obsidian accent-cyan"
                  />
                  <span>
                    J'accepte que QAVYON me recontacte avec mon diagnostic, conformément à la <Link href="/legal/privacy" className="text-cyan underline">politique de confidentialité</Link>.
                  </span>
                </label>
              </div>
            </fieldset>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-impact">{error}</p>}

        <div className="mt-10 flex justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Précédent
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance() || submitting}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === TOTAL_STEPS ? (submitting ? "Calcul en cours…" : "Voir mon diagnostic") : "Suivant"}
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickScanResultView({ result }: { result: QuickScanResult }) {
  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div>
        <p className="eyebrow mb-3">What we heard</p>
        <p className="text-mist">{result.whatWeHeard}</p>
      </div>

      <div>
        <p className="eyebrow mb-3">What matters most</p>
        <ul className="space-y-3">
          {result.whatMattersMost.map((item) => (
            <li key={item.domain} className="card-surface p-4">
              <p className="font-display font-semibold text-ice">{item.label}</p>
              <p className="mt-1 text-sm text-mist">{item.reason}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="eyebrow mb-3">Why</p>
        <p className="text-mist">{result.why}</p>
      </div>

      <div>
        <p className="eyebrow mb-3">QAVYON areas</p>
        <div className="flex flex-wrap gap-2">
          {result.qavyonAreas.map((a) => (
            <span key={a.area} className="rounded-sm border border-cyan/40 px-3 py-1 text-xs text-cyan">
              {a.label}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Risks</p>
        <ul className="list-inside list-disc space-y-2 text-sm text-mist">
          {result.risks.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="eyebrow mb-3">Next step</p>
        <div className="card-surface p-5">
          <p className="font-display font-semibold text-ice">{result.nextStep.title}</p>
          <p className="mt-1 text-sm text-mist">{result.nextStep.description}</p>
        </div>
      </div>

      <div className="text-center">
        <Link
          href={result.cta.href}
          onClick={() => track("quickscan_result_to_book")}
          className="btn-primary inline-flex"
        >
          {result.cta.label}
        </Link>
      </div>
    </div>
  );
}

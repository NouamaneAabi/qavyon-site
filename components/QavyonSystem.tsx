"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/tracking";

export type LayerId = "layer-01" | "layer-02" | "layer-03" | "layer-04" | "layer-05";

interface LayerDef {
  id: LayerId;
  label: string;
  node: string;
  nodeColor: string;
  description: string;
}

const LAYERS: LayerDef[] = [
  { id: "layer-01", label: "Ops & OT", node: "Industrie", nodeColor: "text-slate-300 border-slate-500/50 bg-slate-500/10", description: "Machines, capteurs, lignes de production — la réalité physique de l'usine." },
  { id: "layer-02", label: "ERP · spine", node: "Transformation", nodeColor: "text-cyan border-cyan/50 bg-cyan/10", description: "Le système de gestion qui orchestre commandes, stocks et production." },
  { id: "layer-03", label: "Data", node: "Data", nodeColor: "text-teal-200 border-teal-500/50 bg-teal-500/10", description: "La donnée consolidée, fiable et gouvernée, issue de l'ERP et de l'OT." },
  { id: "layer-04", label: "IA", node: "Intelligence", nodeColor: "text-teal-200 border-teal-500/50 bg-teal-500/10", description: "Des cas d'usage industrialisés, construits sur une donnée de confiance." },
  { id: "layer-05", label: "Software", node: "Digital", nodeColor: "text-blue-200 border-blue-500/50 bg-blue-500/10", description: "Les applications métier qui exposent la valeur aux équipes terrain." },
];

interface QavyonSystemProps {
  systemPath?: LayerId[];
  scrollytelling?: boolean;
  className?: string;
}

export default function QavyonSystem({ systemPath, scrollytelling = true, className }: QavyonSystemProps) {
  const [activeLayer, setActiveLayer] = useState<LayerId | null>(null);
  const [revealed, setRevealed] = useState<Set<LayerId>>(new Set(systemPath ? LAYERS.map((layer) => layer.id) : []));
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollCompleteFired, setScrollCompleteFired] = useState(false);
  const layerRefs = useRef<Record<LayerId, HTMLButtonElement | null>>({
    "layer-01": null,
    "layer-02": null,
    "layer-03": null,
    "layer-04": null,
    "layer-05": null,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!scrollytelling || reducedMotion) {
      setRevealed(new Set(LAYERS.map((layer) => layer.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-layer-id") as LayerId;
          setRevealed((previous) => {
            const next = new Set(previous);
            next.add(id);
            if (next.size === LAYERS.length && !scrollCompleteFired) {
              track("system_scroll_complete");
              setScrollCompleteFired(true);
            }
            return next;
          });
        });
      },
      { threshold: 0.35 }
    );

    Object.values(layerRefs.current).forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, scrollytelling]);

  const isDimmed = (id: LayerId) => Boolean(systemPath && !systemPath.includes(id));

  function activateLayer(id: LayerId) {
    setActiveLayer((current) => (current === id ? null : id));
    track("system_view_open", { layer: id });
  }

  return (
    <div
      className={`w-full ${className ?? ""}`}
      role="img"
      aria-label="QAVYON System : cinq couches Ops et OT, ERP, Data, IA et Software reliées par des flux de connexion, sous une enveloppe de confiance, vers un impact mesuré."
    >
      <div className="relative overflow-hidden rounded-sm border border-steel bg-carbon p-4 sm:p-6 md:p-8">
        <style>{`
          .qavyon-flow {
            fill: none;
            stroke: #19D3C5;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 2 3;
            animation: qavyon-flow-pulse 2.8s ease-in-out infinite;
          }
          .qavyon-flow--strong { stroke-width: 0.8; }
          .qavyon-flow--soft { stroke-width: 0.45; opacity: 0.6; }
          .qavyon-impact { animation: qavyon-impact-pulse 2.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          @keyframes qavyon-flow-pulse {
            0%, 100% { opacity: 0.35; stroke-dashoffset: 0; }
            50% { opacity: 1; stroke-dashoffset: -10; }
          }
          @keyframes qavyon-impact-pulse {
            0%, 100% { opacity: 0.8; transform: scale(0.94); }
            50% { opacity: 1; transform: scale(1.06); }
          }
          @media (prefers-reduced-motion: reduce) {
            .qavyon-flow, .qavyon-impact { animation: none; opacity: 0.8; }
          }
        `}</style>

        <div className="pointer-events-none absolute inset-3 rounded-sm border border-dashed border-cyan/30 sm:inset-5" aria-hidden="true" />

        <div className="relative z-10 mb-6 flex items-center justify-between gap-4 px-1 sm:mb-8 sm:px-2">
          <div>
            <p className="eyebrow">The QAVYON System</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ice sm:text-2xl">La valeur naît de la connexion.</h3>
          </div>
          <div className="hidden items-center gap-2 text-right sm:flex">
            <span className="rounded-full border border-gray-400/40 bg-gray-400/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-gray-300">Trust</span>
            <span className="text-xs text-mist">Sécurité &amp; gouvernance</span>
          </div>
        </div>

        <div className="relative z-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_180px] md:gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="relative space-y-3 sm:space-y-4">
            <svg className="pointer-events-none absolute inset-x-0 top-0 hidden h-full w-full md:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className="qavyon-flow qavyon-flow--soft" d="M18 92 V 8" />
              <path className="qavyon-flow qavyon-flow--strong" d="M18 92 C 32 78, 32 22, 18 8" />
              <path className="qavyon-flow qavyon-flow--soft" d="M18 92 C 38 76, 38 24, 18 8" />
              <path className="qavyon-flow qavyon-flow--soft" d="M18 72 H 78" />
              <path className="qavyon-flow qavyon-flow--soft" d="M18 52 H 78" />
              <path className="qavyon-flow qavyon-flow--soft" d="M18 32 H 78" />
            </svg>

            {LAYERS.map((layer, index) => {
              const dimmed = isDimmed(layer.id);
              const isActive = activeLayer === layer.id;
              const isRevealed = revealed.has(layer.id) || !scrollytelling || reducedMotion;

              return (
                <button
                  key={layer.id}
                  ref={(element) => {
                    layerRefs.current[layer.id] = element;
                  }}
                  data-layer-id={layer.id}
                  type="button"
                  onMouseEnter={() => setActiveLayer(layer.id)}
                  onMouseLeave={() => setActiveLayer(null)}
                  onFocus={() => setActiveLayer(layer.id)}
                  onBlur={() => setActiveLayer(null)}
                  onClick={() => activateLayer(layer.id)}
                  aria-pressed={isActive}
                  className={[
                    "relative z-10 grid w-full gap-3 rounded-sm border p-4 text-left transition-all duration-300 sm:grid-cols-[minmax(150px,0.8fr)_minmax(0,1.8fr)] sm:items-center sm:gap-6 sm:p-5",
                    dimmed ? "border-steel/50 bg-graphite/40 opacity-40" : "border-steel bg-graphite/95 hover:border-cyan/80",
                    isActive && !dimmed ? "border-cyan bg-graphite shadow-[0_0_24px_rgba(25,211,197,0.12)]" : "",
                    isRevealed ? "opacity-100" : "opacity-0",
                    !reducedMotion ? "animate-converge-side" : "",
                  ].join(" ")}
                  style={{
                    animationDelay: !reducedMotion ? `${index * 90}ms` : undefined,
                    ["--from-x" as string]: index % 2 === 0 ? "-18px" : "18px",
                  }}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dimmed ? "bg-steel" : "bg-cyan animate-pulse-signal"}`} aria-hidden="true" />
                    <span className="font-display text-base font-semibold text-ice sm:text-lg">{layer.label}</span>
                  </span>
                  <span className="min-w-0">
                    <span className={`inline-flex max-w-full rounded-full border px-2 py-1 text-[10px] font-medium sm:text-xs ${layer.nodeColor}`}>
                      {layer.node}
                    </span>
                    <span className={`mt-2 block text-sm leading-relaxed text-mist transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-80 sm:opacity-60"}`}>
                      {layer.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative flex flex-col items-center justify-center text-center">
            <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className="qavyon-flow qavyon-flow--strong" d="M0 18 C 30 20, 45 50, 82 50" />
              <path className="qavyon-flow qavyon-flow--soft" d="M0 38 C 30 38, 48 50, 82 50" />
              <path className="qavyon-flow qavyon-flow--soft" d="M0 62 C 30 62, 48 50, 82 50" />
              <path className="qavyon-flow qavyon-flow--soft" d="M0 82 C 30 80, 45 50, 82 50" />
            </svg>
            <div className="hidden md:absolute md:z-10 md:flex md:flex-col md:items-center md:justify-center md:left-[80%] md:top-[57%] md:-translate-x-[40%] md:-translate-y-1/2">
              <button
                type="button"
                className="flex max-w-[130px] flex-col items-center justify-center gap-3 rounded-sm p-2 text-center focus-visible:outline-cyan"
                onClick={() => track("system_impact_open")}
                aria-label="Impact mesuré à chaque couche"
              >
                <span className="relative hidden h-6 w-6 rounded-full md:block" aria-hidden="true">
                  <span className="qavyon-impact absolute -inset-5 rounded-full bg-impact/25 blur-xl" />
                  <span className="absolute -inset-2 rounded-full bg-impact/30 blur-md" />
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: "0 0 16px 4px rgba(255,122,69,0.85), 0 0 36px 10px rgba(255,122,69,0.42)",
                      background: "radial-gradient(circle at 35% 30%, #FFD0BC 0%, #FF8A5B 24%, #FF7A45 48%, #FF4F18 78%, #FF3D00 100%)",
                    }}
                  />
                  <span className="absolute left-[28%] top-[22%] h-1.5 w-1.5 rounded-full bg-white/80 blur-[1px]" />
                </span>
                <span className="text-center text-xs font-semibold uppercase leading-tight tracking-[0.12em] text-impact">
                  Impact
                  <span className="mt-1 block font-body normal-case tracking-normal text-mist">mesuré à chaque couche</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-5 flex items-center gap-2 px-1 text-xs text-mist sm:px-2 md:hidden">
          <span className="h-6 w-px bg-cyan/70" aria-hidden="true" />
          <span>Les flux se propagent de Ops &amp; OT vers Software.</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  { id: "layer-01", label: "Ops & OT", node: "Industrie", nodeColor: "text-slate-400 border-slate-500/40 bg-slate-500/10", description: "Machines, capteurs, lignes de production — la réalité physique de l'usine." },
  { id: "layer-02", label: "ERP", node: "Transformation", nodeColor: "text-cyan border-cyan/40 bg-cyan/10", description: "Le système de gestion qui orchestre commandes, stocks et production." },
  { id: "layer-03", label: "Data", node: "Data", nodeColor: "text-teal-400 border-teal-500/40 bg-teal-500/10", description: "La donnée consolidée, fiable et gouvernée, issue de l'ERP et de l'OT." },
  { id: "layer-04", label: "IA", node: "Intelligence", nodeColor: "text-teal-400 border-teal-500/40 bg-teal-500/10", description: "Des cas d'usage industrialisés, construits sur une donnée de confiance." },
  { id: "layer-05", label: "Software", node: "Digital", nodeColor: "text-blue-400 border-blue-500/40 bg-blue-500/10", description: "Les applications métier qui exposent la valeur aux équipes terrain." },
];

const NARRATIVE_NODES: Array<{ id: string; layerId: LayerId; label: string; left: string; top: string; tone: string }> = [
  { id: "industrie", layerId: "layer-01", label: "Industrie", left: "31%", top: "77%", tone: "bg-slate-500/80 text-slate-200 border-slate-500/60" },
  { id: "transformation", layerId: "layer-02", label: "Transformation", left: "30%", top: "62%", tone: "bg-cyan/20 text-cyan border-cyan/50" },
  { id: "data", layerId: "layer-03", label: "Data", left: "30%", top: "48%", tone: "bg-teal-500/20 text-teal-200 border-teal-500/50" },
  { id: "intelligence", layerId: "layer-04", label: "Intelligence", left: "30%", top: "35%", tone: "bg-teal-500/20 text-teal-200 border-teal-500/50" },
  { id: "digital", layerId: "layer-05", label: "Digital", left: "30%", top: "22%", tone: "bg-blue-500/20 text-blue-200 border-blue-500/50" },
  { id: "confiance", layerId: "layer-02", label: "Confiance", left: "58%", top: "8%", tone: "bg-gray-400/10 text-gray-200 border-gray-400/40" },
  { id: "acceleration", layerId: "layer-02", label: "Accélération", left: "82%", top: "35%", tone: "bg-cyan/20 text-cyan border-cyan/60" },
];

interface QavyonSystemProps {
  /** Sub-path to highlight (e.g. from a solution page). Layers outside this path are dimmed. */
  systemPath?: LayerId[];
  /** Enable scroll-triggered reveal (used on the homepage). Defaults to true. */
  scrollytelling?: boolean;
  className?: string;
}

export default function QavyonSystem({ systemPath, scrollytelling = true, className }: QavyonSystemProps) {
  const [activeLayer, setActiveLayer] = useState<LayerId | null>(null);
  const [revealed, setRevealed] = useState<Set<LayerId>>(new Set(systemPath ? LAYERS.map((l) => l.id) : []));
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollCompleteFired, setScrollCompleteFired] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!scrollytelling || reducedMotion) {
      // Static / reduced-motion: reveal everything immediately.
      setRevealed(new Set(LAYERS.map((l) => l.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-layer-id") as LayerId;
            setRevealed((prev) => {
              const next = new Set(prev);
              next.add(id);
              if (next.size === LAYERS.length && !scrollCompleteFired) {
                track("system_scroll_complete");
                setScrollCompleteFired(true);
              }
              return next;
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    Object.values(layerRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollytelling, reducedMotion]);

  const isDimmed = (id: LayerId) => (systemPath ? !systemPath.includes(id) : false);
  const activeInfo = LAYERS.find((l) => l.id === activeLayer);

  function handleActivate(id: LayerId) {
    setActiveLayer((prev) => (prev === id ? null : id));
    track("system_view_open", { layer: id });
  }

  if (reducedMotion) {
    return (
      <div className={`w-full ${className ?? ""}`}>
        <Image
          src="/qavyon-system-signature.svg"
          alt="Schéma de la QAVYON System complet avec les nœuds narratifs"
          width={1280}
          height={720}
          className="w-full h-auto rounded-sm border border-steel"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className ?? ""}`}
      role="img"
      aria-label="Schéma interactif de la QAVYON System : cinq couches connectées, entourées d'une couche de confiance transverse."
    >
      <div className="relative rounded-sm border border-steel bg-carbon p-6 md:p-10">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <title>Flux de convergence QAVYON</title>
          <desc>Les flux convergent progressivement vers le point d'impact.</desc>
          <defs>
            <linearGradient id="system-flow-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#12B5CB" stopOpacity="0.15" />
              <stop offset="65%" stopColor="#12B5CB" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF7A45" stopOpacity="0.95" />
            </linearGradient>
            <radialGradient id="system-impact-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF7A45" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#FF7A45" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FF7A45" stopOpacity="0" />
            </radialGradient>
            <style>{`
              .system-flow { fill:none; stroke:url(#system-flow-gradient); stroke-width:0.55; stroke-linecap:round; stroke-dasharray:1.8 3.4; opacity:0; animation:flowReveal 1.1s ease-out forwards; }
              .system-flow--accel { stroke-width:0.8; stroke-dasharray:1.2 2.2; opacity:0; animation:flowReveal 1.1s ease-out 220ms forwards, accelPulse 2.8s ease-in-out infinite 1s; }
              .system-impact-core { animation:impactPulse 2.6s ease-in-out infinite; transform-origin:center; transform-box:fill-box; }
              @keyframes flowReveal { 0% { opacity:0; stroke-dashoffset:20; } 100% { opacity:1; stroke-dashoffset:0; } }
              @keyframes impactPulse { 0%,100% { opacity:0.8; } 50% { opacity:1; } }
              @keyframes accelPulse { 0%,100% { filter: drop-shadow(0 0 0 rgba(18,181,203,0)); } 50% { filter: drop-shadow(0 0 6px rgba(18,181,203,0.8)); } }
              @media (prefers-reduced-motion: reduce) { .system-flow, .system-flow--accel, .system-impact-core { animation:none !important; opacity:1; } }
            `}</style>
          </defs>
          <path className="system-flow" d="M18,79 C35,74 42,66 54,58" />
          <path className="system-flow" d="M18,70 C31,68 42,62 54,58" />
          <path className="system-flow" d="M18,61 C28,58 39,58 54,58" />
          <path className="system-flow" d="M18,52 C32,49 45,48 54,58" />
          <path className="system-flow" d="M18,43 C34,41 47,53 54,58" />
          <path className="system-flow--accel" d="M83,33 C90,33 95,37 100,42" />
          <path className="system-flow--accel" d="M81,40 C88,40 95,44 100,42" />
          <circle cx="54" cy="58" r="3.2" fill="#FF7A45" opacity="0.75" />
          <circle cx="100" cy="42" r="5.2" fill="url(#system-impact-glow)" />
          <circle className="system-impact-core" cx="100" cy="42" r="1.4" fill="#FF7A45" />
        </svg>

        {/* Trust envelope */}
        <div
          className="pointer-events-none absolute inset-3 rounded-sm border border-dashed border-cyan/30 md:inset-5"
          aria-hidden="true"
        />
        <div className="absolute right-6 top-3 md:right-10 flex items-center gap-3">
          <span className="rounded-full border border-gray-400/40 bg-gray-400/10 px-2 py-0.5 text-xs text-gray-400 font-medium">Confiance</span>
          <span className="eyebrow">Trust</span>
        </div>

        <div className="relative z-10 flex flex-col gap-3 pt-6">
          {LAYERS.map((layer, i) => {
            const dimmed = isDimmed(layer.id);
            const isRevealed = revealed.has(layer.id) || !scrollytelling || reducedMotion;
            return (
              <button
                key={layer.id}
                ref={(el) => {
                  layerRefs.current[layer.id] = el;
                }}
                data-layer-id={layer.id}
                type="button"
                onMouseEnter={() => setActiveLayer(layer.id)}
                onFocus={() => setActiveLayer(layer.id)}
                onClick={() => handleActivate(layer.id)}
                className={[
                  "group relative flex items-center justify-between rounded-sm border px-5 py-4 text-left transition-all duration-300",
                  dimmed ? "border-steel/50 bg-graphite/40 opacity-40" : "border-steel bg-graphite hover:border-cyan",
                  activeLayer === layer.id && !dimmed ? "border-cyan bg-graphite" : "",
                  isRevealed ? "opacity-100" : "opacity-0",
                  !reducedMotion ? "animate-converge-side" : "",
                ].join(" ")}
                style={{
                  animationDelay: !reducedMotion ? `${i * 90}ms` : undefined,
                  ["--from-x" as string]: i % 2 === 0 ? "-24px" : "24px",
                }}
                aria-pressed={activeLayer === layer.id}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={[
                      "h-2 w-2 rounded-full",
                      dimmed ? "bg-steel" : "bg-cyan animate-pulse-signal",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                  <span className="font-display text-base font-semibold text-ice md:text-lg">{layer.label}</span>
                  <span className={`ml-2 md:ml-4 rounded-full border px-2 py-0.5 text-[10px] md:text-xs font-medium ${layer.nodeColor}`}>
                    {layer.node}
                  </span>
                </span>
                <span className="hidden text-xs text-mist md:block">{layer.description}</span>
              </button>
            );
          })}

          {/* Convergence Animation & Impact point */}
          <div className="mt-8 flex flex-col md:flex-row items-end justify-between relative min-h-[100px]">
            <div className="flex-1" />
            <div className="z-10 flex flex-col items-end gap-2 pr-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-cyan/50 bg-cyan/20 px-2 py-0.5 text-xs text-cyan font-semibold shadow-[0_0_10px_rgba(18,181,203,0.5)]">Accélération</span>
                <span className="h-3 w-3 rounded-full shadow-[0_0_15px_#FF7A45] animate-pulse" style={{ backgroundColor: "#FF7A45" }} aria-hidden="true" />
              </div>
              <span className="text-xs text-mist font-semibold text-right">IMPACT<br/>mesuré à chaque couche</span>
            </div>
          </div>
        </div>

        {NARRATIVE_NODES.map((node) => {
          const isActive = activeLayer === node.layerId;
          return (
            <button
              key={node.id}
              type="button"
              onMouseEnter={() => setActiveLayer(node.layerId)}
              onFocus={() => setActiveLayer(node.layerId)}
              onClick={() => handleActivate(node.layerId)}
              aria-label={`Nœud narratif ${node.label}`}
              aria-pressed={isActive}
              className={[
                "absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-[10px] font-medium transition-all duration-300 md:text-[11px]",
                node.tone,
                isActive ? "scale-105 shadow-[0_0_10px_rgba(18,181,203,0.4)]" : "",
              ].join(" ")}
              style={{ left: node.left, top: node.top }}
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden="true" />
                {node.label}
              </span>
            </button>
          );
        })}

        {/* Info panel (mobile: below schema, desktop: floating) */}
        {activeInfo && (
          <div className="mt-6 rounded-sm border border-steel bg-obsidian p-4 md:absolute md:right-10 md:top-1/2 md:mt-0 md:w-64 md:-translate-y-1/2">
            <p className="font-display text-sm font-semibold text-cyan">{activeInfo.label}</p>
            <p className="mt-1 text-sm text-mist">{activeInfo.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

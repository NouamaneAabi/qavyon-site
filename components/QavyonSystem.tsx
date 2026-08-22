"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/tracking";

export type LayerId = "layer-01" | "layer-02" | "layer-03" | "layer-04" | "layer-05";

interface LayerDef {
  id: LayerId;
  label: string;
  description: string;
}

const LAYERS: LayerDef[] = [
  { id: "layer-01", label: "Ops & OT", description: "Machines, capteurs, lignes de production — la réalité physique de l'usine." },
  { id: "layer-02", label: "ERP", description: "Le système de gestion qui orchestre commandes, stocks et production." },
  { id: "layer-03", label: "Data", description: "La donnée consolidée, fiable et gouvernée, issue de l'ERP et de l'OT." },
  { id: "layer-04", label: "IA", description: "Des cas d'usage industrialisés, construits sur une donnée de confiance." },
  { id: "layer-05", label: "Software", description: "Les applications métier qui exposent la valeur aux équipes terrain." },
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

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className ?? ""}`}
      role="img"
      aria-label="Schéma de la QAVYON System : cinq couches connectées, Ops & OT, ERP, Data, IA, Software, entourées d'une couche de confiance transverse."
    >
      <div className="relative rounded-sm border border-steel bg-carbon p-6 md:p-10">
        {/* Trust envelope */}
        <div
          className="pointer-events-none absolute inset-3 rounded-sm border border-dashed border-cyan/30 md:inset-5"
          aria-hidden="true"
        />
        <span className="eyebrow absolute right-6 top-3 md:right-10">Trust</span>

        <div className="relative flex flex-col gap-3 pt-6">
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
                </span>
                <span className="hidden text-xs text-mist md:block">{layer.description}</span>
              </button>
            );
          })}

          {/* Impact point */}
          <div className="mt-2 flex items-center gap-2 self-end pr-1">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FF7A45" }} aria-hidden="true" />
            <span className="text-xs text-mist">Impact mesuré à chaque couche</span>
          </div>
        </div>

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

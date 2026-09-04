"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroConvergenceBackground() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setAnimate(false);
      return;
    }

    const timer = window.setTimeout(() => setAnimate(true), 220);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none">
      <Image
        src="/qavyon-convergence-motif.svg"
        alt=""
        fill
        className={`hero-convergence object-cover object-right-top opacity-60 mix-blend-screen ${animate ? "is-animated" : ""}`}
        priority
        style={{ animation: animate ? "heroConvergence 18s ease-in-out infinite alternate" : "none" }}
      />
    </div>
  );
}

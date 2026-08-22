import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#080B10",
        carbon: "#11161D",
        graphite: "#181F28",
        steel: "#27323A",
        ice: "#F3F7F8",
        mist: "#A8B3BA",
        cyan: {
          DEFAULT: "#19D3C5",
          hover: "#12B3A7",
        },
        impact: "#FF7A45",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-satoshi)", "Satoshi", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "signal-grid":
          "repeating-linear-gradient(45deg, rgba(25,211,197,0.05) 0px, rgba(25,211,197,0.05) 1px, transparent 1px, transparent 48px)",
      },
      keyframes: {
        converge: {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "converge-side": {
          "0%": { opacity: "0", transform: "translateX(var(--from-x, 24px))" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-signal": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        converge: "converge 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "converge-side": "converge-side 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-signal": "pulse-signal 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

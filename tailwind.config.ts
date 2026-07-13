import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#030604",
        graphite: "#07110C",
        panel: "rgba(8, 20, 14, 0.72)",
        panelHigh: "rgba(13, 32, 22, 0.68)",
        gpu: "#10B981",
        matrix: "#22C55E",
        mint: "#6EE7B7",
        cyanStream: "#06B6D4",
        holo: "#14F1D9",
        uhred: "#C8102E",
        textPrimary: "#E7FFF2",
        textSecondary: "#A7CDB8",
        textMuted: "#6B8F7A",
        line: "rgba(110, 231, 183, 0.16)",
        lineActive: "rgba(16, 185, 129, 0.55)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      maxWidth: {
        site: "1440px",
      },
      boxShadow: {
        glow: "0 0 24px rgba(16, 185, 129, 0.22), 0 0 64px rgba(16, 185, 129, 0.08)",
        glowStrong:
          "0 0 32px rgba(16, 185, 129, 0.38), 0 0 96px rgba(20, 241, 217, 0.12)",
        insetLine: "inset 0 1px 0 rgba(110, 231, 183, 0.12)",
      },
      backgroundImage: {
        "node-grid":
          "linear-gradient(rgba(110,231,183,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.055) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(16,185,129,0.14), transparent 60%)",
      },
      animation: {
        "pulse-dot": "pulseDot 2.2s ease-in-out infinite",
        "grid-pan": "gridPan 24s linear infinite",
        "beam-x": "beamX 2.6s ease-in-out infinite",
        "scan-y": "scanY 3.4s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        blink: "blink 1.1s step-end infinite",
        flicker: "flicker 5s linear infinite",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(16,185,129,0.5)" },
          "50%": { opacity: "0.55", boxShadow: "0 0 0 5px rgba(16,185,129,0)" },
        },
        gridPan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "48px 48px" },
        },
        beamX: {
          "0%": { transform: "translateX(-120%)" },
          "60%, 100%": { transform: "translateX(320%)" },
        },
        scanY: {
          "0%": { top: "-10%" },
          "60%, 100%": { top: "110%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        flicker: {
          "0%, 97%, 100%": { opacity: "1" },
          "98%": { opacity: "0.82" },
          "99%": { opacity: "0.94" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useSharedScrollProgress } from "@/lib/scroll-context";

const GpuModel = dynamic(() => import("@/components/GpuModel"), {
  ssr: false,
  loading: () => null,
});

/**
 * The 4090 render, mounted once at the page root as a fixed full-viewport
 * layer sitting behind every section. It never remounts between sections —
 * only its pose changes — so the card reads as one continuous presence
 * threaded through the whole scroll, not a hero-only decoration. Near the
 * final CTA it dims to a faint silhouette rather than a hero-only prop.
 *
 * Must be rendered inside a <ScrollProgressProvider> — it reads the shared
 * scroll value rather than starting its own `useScroll()` listener.
 */
export default function ScrollGpuScene() {
  const shared = useSharedScrollProgress();
  const fallback = useMotionValue(0);
  const scrollYProgress = shared ?? fallback;
  const opacity = useTransform(scrollYProgress, [0.82, 1], [1, 0.25]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ opacity }}
    >
      <GpuModel className="h-full w-full" scrollProgress={scrollYProgress} />
      {/* Light readability scrim only — content now sits beside the card in
          its own columns instead of directly on top of it, so this stays
          minimal and the render reads clean rather than washed out. */}
      <div className="absolute inset-0 bg-obsidian/18" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-obsidian/60 to-transparent" />
    </motion.div>
  );
}

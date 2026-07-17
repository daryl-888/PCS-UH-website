"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

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
 */
export default function ScrollGpuScene() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.82, 1], [1, 0.25]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ opacity }}
    >
      <GpuModel className="h-full w-full" scrollProgress={scrollYProgress} />
      {/* global readability tint so body copy stays legible over the render
          everywhere, not just in a hero-only scrim */}
      <div className="absolute inset-0 bg-obsidian/45" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-obsidian/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-obsidian/70 to-transparent" />
    </motion.div>
  );
}

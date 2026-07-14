"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedGrid from "@/components/AnimatedGrid";
import TerminalTitlebar from "@/components/TerminalTitlebar";

const tickerTerms = [
  "CUDA_STREAM_ACTIVE",
  "GPU_ARCHITECTURE",
  "HPC_WORKSHOPS",
  "AI_INFRASTRUCTURE",
  "STUDENT_RESEARCH",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.65, 0.36, 1] as const },
  },
};

/**
 * The hero no longer carries its own 3D canvas — the 4090 render is the
 * shared page-level layer from ScrollGpuScene, which starts lying flat
 * behind this section and turns as the page scrolls. This section is just
 * the centered title card sitting on top of it.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col pt-16"
      aria-label="Introduction"
    >
      <AnimatedGrid />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-radial"
      />

      {/* terminal chrome, top-left — reinforces the render-pipeline conceit */}
      <div className="absolute left-4 top-20 z-10 hidden w-64 rounded-md border border-line bg-obsidian/60 backdrop-blur-sm sm:block lg:left-8">
        <TerminalTitlebar label="gpu_render.sh" />
        <p className="px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-textSecondary">
          RTX_4090.GLB <span className="text-mint">[LOADED]</span>
        </p>
      </div>

      {/* live-render badge, top-right */}
      <span className="absolute right-4 top-20 z-10 hidden items-center gap-1.5 font-mono text-[10px] tracking-[0.24em] text-gpu lg:right-8 lg:flex">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gpu" />
        RENDERING LIVE
      </span>

      {/* Copy — dead center, the way a title card sits over a hero visual */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6">
        {/* soft spotlight so the type reads clean against whatever the card is doing behind it */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(3,6,4,0.55),transparent_70%)]"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex max-w-3xl flex-col items-center"
        >
          <motion.p
            variants={item}
            className="mb-5 font-mono text-[11px] tracking-[0.3em] text-gpu"
          >
            /// UNIVERSITY OF HOUSTON PARALLEL COMPUTING SOCIETY
          </motion.p>

          <motion.h1
            variants={item}
            className="font-hero uppercase leading-[0.95] tracking-tight text-textPrimary"
          >
            <span className="block text-3xl font-bold sm:text-4xl md:text-5xl">
              The Future of
            </span>
            <span className="headline-gradient glow-text block text-6xl font-black sm:text-7xl md:text-8xl xl:text-[8rem]">
              Computing
            </span>
            <span className="block text-3xl font-bold sm:text-4xl md:text-5xl">
              Is Parallel<span className="text-gpu">.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-sm leading-relaxed text-textSecondary md:text-base"
          >
            The compute stack behind modern AI and graphics — taught through
            workshops, projects, and hands-on engineering.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-5"
          >
            <a
              href="#join"
              className="group inline-flex items-center gap-2 rounded-md border border-lineActive bg-gpu px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-obsidian transition-all hover:bg-mint hover:shadow-glowStrong"
            >
              Become a Member
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a
              href="#projects"
              className="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary transition-colors hover:text-holo"
            >
              Explore the systems →
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* capability ticker — terminal-marquee strip along the bottom edge */}
      <div
        className="relative z-10 overflow-hidden border-t border-line bg-obsidian/70 py-2.5 backdrop-blur-sm"
        aria-hidden
      >
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...tickerTerms, ...tickerTerms].map((term, i) => (
            <span
              key={`${term}-${i}`}
              className="flex items-center gap-8 font-mono text-[10px] tracking-[0.28em] text-textMuted"
            >
              [{term}]
              <span className="text-gpu/60">//</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

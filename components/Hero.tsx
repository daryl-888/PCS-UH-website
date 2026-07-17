"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import AnimatedGrid from "@/components/AnimatedGrid";
import TerminalLabel from "@/components/TerminalLabel";
import { GITHUB_URL } from "@/data/nav";

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
 * the centered title card sitting on top of it, plus a ring of floating
 * HUD labels wired back to the GPU (the "Compute Beam Linking" transition).
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center pt-16"
      aria-label="Introduction"
    >
      <AnimatedGrid depthShift />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-radial"
      />

      {/* Floating HUD micro-labels — desktop only, thin beams toward the GPU */}
      <TerminalLabel label="CUDA_KERNELS" className="left-6 top-[28%]" align="left" delay={0.9} />
      <TerminalLabel label="GPU_ARCH" className="left-10 top-[62%]" align="left" delay={1.05} />
      <TerminalLabel label="THREAD_BLOCKS" className="right-6 top-[24%]" align="right" delay={1.0} />
      <TerminalLabel label="HPC_SYSTEMS" className="right-10 top-[58%]" align="right" delay={1.15} />
      <TerminalLabel label="AI_INFRA" className="left-16 top-[80%]" align="left" delay={1.2} />
      <TerminalLabel label="PARALLEL_EXECUTION" className="right-16 top-[80%]" align="right" delay={1.25} />

      {/* Copy — dead center, the way a title card sits over a hero visual */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center sm:px-6">
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
            A student-led community for GPU computing, CUDA, and
            high-performance systems.
          </motion.p>
          <motion.p
            variants={item}
            className="mt-2 max-w-md font-mono text-xs text-textMuted"
          >
            No prior GPU experience required. Bring curiosity.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/membership"
              className="group inline-flex items-center gap-2 rounded-md border border-lineActive bg-gpu px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-obsidian transition-all hover:bg-mint hover:shadow-glowStrong"
            >
              Join PCS
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-textPrimary transition-all hover:border-lineActive hover:text-mint"
            >
              <Github className="h-4 w-4" aria-hidden />
              Explore GitHub
            </a>
            <a
              href="#offer"
              className="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary transition-colors hover:text-holo"
            >
              View Workshops →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import AnimatedGrid from "@/components/AnimatedGrid";
import CodeTickerVertical from "@/components/CodeTickerVertical";
import TerminalLabel from "@/components/TerminalLabel";
import { GITHUB_URL, MEMBERSHIP_FORM_URL } from "@/data/nav";

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
 * shared page-level layer from ScrollGpuScene, which starts zoomed in and
 * roughly centered/right behind this section. Copy lives in the LEFT
 * column only (lg:col-span-6) so the card is never covered — the right
 * half of the viewport stays clear for it, ringed by HUD labels.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen min-h-svh flex-col justify-center pt-16"
      aria-label="Introduction"
    >
      <AnimatedGrid depthShift />
      <CodeTickerVertical className="left-[2%]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-radial"
      />

      {/* Floating HUD micro-labels ring the GPU on the right — desktop only */}
      <TerminalLabel label="CUDA_KERNELS" className="right-[6%] top-[16%]" align="right" delay={0.9} />
      <TerminalLabel label="GPU_ARCH" className="right-[2%] top-[38%]" align="right" delay={1.05} />
      <TerminalLabel label="THREAD_BLOCKS" className="right-[8%] top-[58%]" align="right" delay={1.0} />
      <TerminalLabel label="HPC_SYSTEMS" className="right-[14%] top-[76%]" align="right" delay={1.15} />
      <TerminalLabel label="AI_INFRA" className="left-6 bottom-[10%]" align="left" delay={1.2} />
      <TerminalLabel label="PARALLEL_EXECUTION" className="right-[22%] bottom-[6%]" align="right" delay={1.25} />

      <div className="relative z-10 mx-auto flex w-full max-w-site flex-1 flex-col justify-center px-4 sm:px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left"
          >
            <motion.p
              variants={item}
              className="mb-5 font-mono text-[11px] tracking-[0.3em] text-gpu"
            >
              /// UNIVERSITY OF HOUSTON
            </motion.p>

            <motion.h1
              variants={item}
              className="font-hero uppercase leading-[0.95] tracking-tight text-textPrimary"
            >
              <span className="block text-3xl font-bold sm:text-4xl md:text-5xl">
                Parallel
              </span>
              <span className="headline-gradient glow-text block text-5xl font-black sm:text-6xl md:text-7xl xl:text-8xl">
                Computing
              </span>
              <span className="block text-3xl font-bold sm:text-4xl md:text-5xl">
                Society
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-lg font-mono text-sm tracking-[0.06em] text-gpu md:text-base"
            >
              The Future of Computing Is Parallel<span className="text-gpu">.</span>
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a
                href={MEMBERSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-lineActive bg-gpu px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-obsidian transition-all hover:bg-mint hover:shadow-glowStrong"
              >
                Join PCS
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
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
          {/* lg:col-span-6 intentionally left empty — the GPU render shows through here */}
        </div>
      </div>
    </section>
  );
}

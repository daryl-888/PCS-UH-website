"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import AnimatedGrid from "@/components/AnimatedGrid";
import StatusBadge from "@/components/StatusBadge";

const GpuModel = dynamic(() => import("@/components/GpuModel"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="font-mono text-[10px] tracking-[0.3em] text-textMuted">
        LOADING GPU MODEL…
      </span>
    </div>
  ),
});

const badges = [
  { label: "CUDA_STREAM_ACTIVE", tone: "green" as const },
  { label: "GPU_ARCHITECTURE", tone: "cyan" as const },
  { label: "HPC_WORKSHOPS", tone: "green" as const },
  { label: "AI_INFRASTRUCTURE", tone: "cyan" as const },
  { label: "STUDENT_RESEARCH", tone: "green" as const },
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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // As the hero scrolls out of view, the card parallaxes up, drifts right,
  // and fades — so it hands off to the next section instead of hard-clipping.
  const modelY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const modelX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const modelOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.4, 0]);
  const modelScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden pt-16"
      aria-label="Introduction"
    >
      <AnimatedGrid />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-radial"
      />

      {/* Ambient background render of the 4090 — sits behind the copy, faded
          out on the left so the text stays legible, and parallaxes/fades as
          the hero scrolls away. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_36%)] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
      >
        <motion.div
          style={{ y: modelY, x: modelX, opacity: modelOpacity, scale: modelScale }}
          className="h-full w-full"
        >
          <GpuModel className="h-full w-full" offsetX={2.1} />
        </motion.div>
      </motion.div>

      <div className="relative mx-auto grid max-w-site items-center gap-8 px-4 pb-16 pt-14 sm:px-6 md:pt-20 lg:min-h-[calc(100vh-4rem)] lg:px-10 lg:pb-0 lg:pt-0">
        {/* Copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-2xl"
        >
          <motion.p
            variants={item}
            className="mb-6 font-mono text-[11px] tracking-[0.3em] text-gpu"
          >
            /// UNIVERSITY OF HOUSTON PARALLEL COMPUTING SOCIETY
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl"
          >
            <span className="block text-textPrimary">The Future of</span>
            <span className="headline-gradient glow-text block">
              Computing
            </span>
            <span className="block text-textPrimary">
              is Parallel<span className="text-gpu">.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-textSecondary md:text-lg"
          >
            UH PCS helps students learn the compute stack behind modern AI,
            simulation, graphics, and data-intensive systems through workshops,
            projects, recruiter events, and hands-on engineering.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
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
              className="inline-flex items-center gap-2 rounded-md border border-line bg-panel px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-textPrimary backdrop-blur-md transition-all hover:border-lineActive hover:text-mint"
            >
              Explore Projects
            </a>
            <a
              href="#events"
              className="group inline-flex items-center gap-1 px-2 py-3 font-mono text-xs uppercase tracking-[0.16em] text-textSecondary transition-colors hover:text-holo"
            >
              View Upcoming Events
              <ChevronRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-2">
            {badges.map((b) => (
              <StatusBadge key={b.label} label={`[${b.label}]`} tone={b.tone} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* floating HUD labels over the ambient render */}
      <span className="pointer-events-none absolute bottom-24 right-4 z-10 hidden font-mono text-[10px] tracking-[0.24em] text-textMuted lg:block lg:right-8">
        THREADS: 1024 · WARPS: 32
      </span>
      <span className="pointer-events-none absolute right-4 top-20 z-10 hidden items-center gap-1.5 font-mono text-[10px] tracking-[0.24em] text-gpu lg:right-8 lg:flex">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gpu" />
        RENDERING LIVE
      </span>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="font-mono text-[9px] tracking-[0.3em] text-textMuted">
          SCROLL
        </span>
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-gpu to-transparent" />
      </div>
    </section>
  );
}

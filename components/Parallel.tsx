"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { usePrefersReducedMotion } from "@/lib/hooks";

const COLS = 12;
const ROWS = 7;

/**
 * Visual metaphor for the section's argument:
 * phase 1 — a single dot travels the first row (sequential work),
 * phase 2 — the whole grid activates in soft waves (parallel work).
 */
function ThreadMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = usePrefersReducedMotion();
  const [parallel, setParallel] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setParallel(true);
      return;
    }
    const t = setTimeout(() => setParallel(true), 2600);
    return () => clearTimeout(t);
  }, [inView, reduced]);

  return (
    <div ref={ref} aria-hidden className="relative">
      <div
        className="grid gap-2.5"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          return (
            <motion.span
              key={i}
              className="aspect-square w-full rounded-full bg-pcs"
              initial={{ opacity: 0.08, scale: 0.7 }}
              animate={
                parallel
                  ? {
                      opacity: [0.12, 0.9, 0.12],
                      scale: [0.7, 1, 0.7],
                    }
                  : inView && row === 0
                    ? {
                        opacity: [0.08, 0.9, 0.08],
                        scale: [0.7, 1, 0.7],
                      }
                    : { opacity: 0.08, scale: 0.7 }
              }
              transition={
                parallel
                  ? {
                      duration: 2.6,
                      repeat: Infinity,
                      delay: (col + row) * 0.09,
                      ease: "easeInOut",
                    }
                  : {
                      duration: 0.5,
                      delay: col * 0.18,
                      ease: "easeInOut",
                    }
              }
            />
          );
        })}
      </div>
      <p className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-textMuted">
        <span>{parallel ? "All threads active" : "One thread active"}</span>
        <span className="text-pcs">{parallel ? `${COLS * ROWS} / ${COLS * ROWS}` : `1 / ${COLS * ROWS}`}</span>
      </p>
    </div>
  );
}

export default function Parallel() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-40"
      aria-label="What parallel computing is"
    >
      <div className="mx-auto max-w-wide px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* typography moment */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-pcs"
            >
              What parallel means
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-textPrimary sm:text-5xl"
            >
              <span className="glow-red text-alert">Nothing</span> runs one
              step at a time anymore.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 font-display text-4xl font-medium leading-[1.1] tracking-tight text-textPrimary sm:text-5xl"
            >
              <span className="glow-green text-pcs">Everything</span> runs at
              once.
            </motion.p>
          </div>

          {/* explanation panel */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <GlassCard className="p-8 md:p-10">
              <ThreadMatrix />
              <p className="mt-8 text-base leading-relaxed text-textSoft">
                Parallel computing means thousands of processes working
                simultaneously instead of one process handling every task in
                sequence. It is the foundation behind real-time graphics,
                modern AI systems, scientific simulation, and high-performance
                software.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

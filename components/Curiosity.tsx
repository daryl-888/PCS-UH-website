"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

/** Thin line-drawn chip that slowly pulses — the "lightbulb" brand moment. */
function PulsingChip() {
  return (
    <div className="relative mx-auto grid h-64 w-64 place-items-center sm:h-80 sm:w-80" aria-hidden>
      {/* expanding glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-pcs/10 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg viewBox="0 0 200 200" className="relative h-full w-full">
        {/* pins */}
        {Array.from({ length: 6 }).map((_, i) => {
          const p = 52 + i * 19.2;
          return (
            <g key={i} stroke="#0F7A49" strokeWidth="1.5">
              <line x1={p} y1="22" x2={p} y2="46" />
              <line x1={p} y1="154" x2={p} y2="178" />
              <line x1="22" y1={p} x2="46" y2={p} />
              <line x1="154" y1={p} x2="178" y2={p} />
              <circle cx={p} cy="20" r="2.5" fill="#0F7A49" stroke="none" />
              <circle cx={p} cy="180" r="2.5" fill="#0F7A49" stroke="none" />
              <circle cx="20" cy={p} r="2.5" fill="#0F7A49" stroke="none" />
              <circle cx="180" cy={p} r="2.5" fill="#0F7A49" stroke="none" />
            </g>
          );
        })}
        {/* die outline */}
        <motion.rect
          x="46"
          y="46"
          width="108"
          height="108"
          rx="10"
          fill="none"
          stroke="#00E676"
          strokeWidth="1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect x="62" y="62" width="76" height="76" rx="6" fill="none" stroke="rgba(0,230,118,0.35)" strokeWidth="1" />
        {/* inner cores */}
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={78 + (i % 2) * 24}
            y={78 + Math.floor(i / 2) * 24}
            width="20"
            height="20"
            rx="3"
            fill="rgba(0,230,118,0.16)"
            stroke="#00E676"
            strokeWidth="1"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Curiosity() {
  return (
    <section className="relative overflow-hidden py-32 md:py-48" aria-label="Who can join">
      <div className="mx-auto max-w-wide px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-[0.85fr,1.15fr] lg:gap-10">
          <Reveal>
            <PulsingChip />
          </Reveal>
          <div className="text-center lg:text-left">
            <Reveal>
              <h2 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-textPrimary sm:text-6xl md:text-7xl">
                <span className="glow-green text-pcs">Curiosity</span> is the
                sole prereq.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-lg leading-relaxed text-textSoft md:text-xl">
                CS, engineering, business, physics, or just AI-curious — you
                belong here.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-textMuted lg:mx-0">
                You do not need prior CUDA, GPU, or high-performance computing
                experience to join. UH PCS is designed to help students grow
                from beginner curiosity into practical technical skill.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-pcs">
                From &quot;Hello World&quot; to custom CUDA kernels.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

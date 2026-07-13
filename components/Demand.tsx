"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import { kpis, aiMarketChart } from "@/data/site";

function MarketChart() {
  const max = Math.max(...aiMarketChart.bars.map((b) => b.value));
  return (
    <div>
      <p className="font-display text-lg font-medium text-textPrimary">
        {aiMarketChart.title}
      </p>
      <p className="mt-1 text-sm text-textMuted">{aiMarketChart.subtitle}</p>
      <div className="mt-8 flex h-48 items-end justify-between gap-5 sm:gap-8">
        {aiMarketChart.bars.map((bar, i) => (
          <div key={bar.year} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
            <span className="font-mono text-[11px] text-pcs">{bar.label}</span>
            <motion.div
              className="w-full max-w-[64px] rounded-t-md bg-gradient-to-t from-pcsDeep to-pcs"
              style={{ transformOrigin: "bottom" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div style={{ height: `${(bar.value / max) * 148}px` }} />
            </motion.div>
            <span className="font-mono text-[11px] tracking-[0.14em] text-textMuted">
              {bar.year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Demand() {
  return (
    <section className="relative py-28 md:py-40" aria-label="Why it matters">
      <div className="mx-auto max-w-wide px-6 lg:px-12">
        <Reveal>
          <SectionLabel
            eyebrow="Why it matters"
            title={
              <>
                The demand for{" "}
                <span className="text-pcs">high-performance computing</span> is
                surging.
              </>
            }
            subtitle="AI, real-time graphics, data centers, simulation, and scientific computing all depend on parallel systems. UH PCS helps students prepare for that shift before they graduate."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {kpis.map((kpi, i) => (
            <Reveal key={kpi.value} delay={i * 0.1} as="div">
              <GlassCard className="flex h-full flex-col p-8 md:p-10">
                <p className="font-display text-5xl font-medium tracking-tight text-pcs md:text-6xl">
                  {kpi.value}
                </p>
                <span className="mb-5 mt-6 h-px w-12 bg-line" aria-hidden />
                <p className="text-sm leading-relaxed text-textSoft">
                  {kpi.label}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-6">
          <GlassCard className="p-8 md:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr,0.9fr]">
              <MarketChart />
              <div className="lg:pl-6">
                <p className="font-display text-2xl font-medium leading-snug text-textPrimary md:text-3xl">
                  We exist to bridge the gap between student curiosity and
                  real-world demand.
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-textSoft">
                  The industry is moving to parallel systems faster than
                  curricula can follow. PCS gives UH students a place to build
                  those skills now — on real hardware, with real projects.
                </p>
              </div>
            </div>
            <p className="mt-10 border-t border-line pt-5 text-xs text-textMuted">
              {aiMarketChart.source}
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

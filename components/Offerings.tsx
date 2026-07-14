"use client";

import {
  Cpu,
  CircuitBoard,
  Boxes,
  Network,
  FlaskConical,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import { offerings } from "@/data/offerings";

const icons: Record<string, LucideIcon> = {
  cpu: Cpu,
  circuit: CircuitBoard,
  boxes: Boxes,
  network: Network,
  flask: FlaskConical,
  rocket: Rocket,
};

export default function Offerings() {
  return (
    <section
      id="workshops"
      className="relative border-t border-line py-28 md:py-36"
      aria-label="What we offer"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            code="SEC.02 // ACTIVE_PROTOCOLS"
            title="What We Offer"
            subtitle="From first CUDA kernel to portfolio-ready systems. Build, profile, optimize, repeat."
          />
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering, i) => {
            const Icon = icons[offering.icon] ?? Cpu;
            return (
              <Reveal key={offering.node} delay={(i % 3) * 0.08} as="li">
                <GlassCard className="flex h-full flex-col p-6" corners beam>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-md border border-line bg-graphite text-gpu transition-colors group-hover:border-lineActive group-hover:text-mint">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-textMuted">
                      {offering.node}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-textPrimary">
                    {offering.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-textSecondary">
                    {offering.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[10px] tracking-[0.2em]">
                    <span
                      className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gpu"
                      aria-hidden
                    />
                    <span className="text-gpu">STATUS: {offering.status}</span>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

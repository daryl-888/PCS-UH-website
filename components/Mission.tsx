"use client";

import { Layers, Boxes, Network } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    node: "01_LEARN",
    icon: Layers,
    description:
      "Hands-on workshops in CUDA, GPU architecture, and systems thinking.",
  },
  {
    node: "02_BUILD",
    icon: Boxes,
    description:
      "Real projects that turn concepts into portfolio-ready technical work.",
  },
  {
    node: "03_CONNECT",
    icon: Network,
    description:
      "Industry talks, recruiter access, alumni support, and mentorship.",
  },
];

export default function Mission() {
  return (
    <section id="mission" className="relative py-28 md:py-40" aria-label="Mission">
      <div className="mx-auto max-w-site px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            code="SEC.01 // MISSION"
            title="Our Mission"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-textSecondary md:text-lg">
            UH PCS closes the gap between traditional CS/ECE education and
            the real-world demand for GPU computing, parallel systems, and
            performance-focused engineering.
          </p>
        </Reveal>

        <ul className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.node} delay={0.16 + i * 0.1} as="li">
              <GlassCard
                className="group/pillar flex h-full flex-col items-center p-7 text-center transition-transform duration-300 hover:-translate-y-1 sm:p-8"
                corners
                beam
              >
                <span className="grid h-12 w-12 place-items-center rounded-md border border-line bg-graphite text-gpu transition-colors group-hover/pillar:border-lineActive group-hover/pillar:text-mint">
                  <pillar.icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-5 font-mono text-[11px] tracking-[0.24em] text-gpu">
                  {pillar.node}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-textSecondary">
                  {pillar.description}
                </p>
                <span
                  className="terminal-cursor mt-4 text-gpu opacity-0 transition-opacity duration-300 group-hover/pillar:opacity-100"
                  aria-hidden
                />
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Layers, Boxes, Network } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import TerminalTitlebar from "@/components/TerminalTitlebar";

const pillars = [
  {
    icon: Layers,
    title: "Learn the Stack",
    description:
      "CUDA, C++, GPU architecture, distributed systems, and performance optimization.",
  },
  {
    icon: Boxes,
    title: "Build Real Projects",
    description:
      "Student-led projects that turn theory into portfolio-ready systems.",
  },
  {
    icon: Network,
    title: "Connect with Industry",
    description:
      "Recruiter sessions, sponsor workshops, technical talks, and resume pipelines.",
  },
];

/** Animated SVG diagram: a warp of compute nodes handing work to each other. */
function ComputeDiagram() {
  const nodes = [
    { x: 60, y: 60 },
    { x: 180, y: 40 },
    { x: 300, y: 70 },
    { x: 90, y: 160 },
    { x: 210, y: 150 },
    { x: 320, y: 180 },
    { x: 150, y: 250 },
    { x: 270, y: 260 },
  ];
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
    [3, 6],
    [4, 7],
    [6, 7],
    [5, 7],
  ];

  return (
    <svg
      viewBox="0 0 380 320"
      className="h-full w-full"
      role="img"
      aria-label="Diagram of interconnected compute nodes"
    >
      {links.map(([a, b], i) => (
        <g key={i}>
          <line
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(110,231,183,0.18)"
            strokeWidth="1"
          />
          <motion.circle
            r="2.4"
            fill="#14F1D9"
            initial={false}
            animate={{
              cx: [nodes[a].x, nodes[b].x],
              cy: [nodes[a].y, nodes[b].y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.8 + (i % 4) * 0.5,
              repeat: Infinity,
              delay: i * 0.35,
              ease: "easeInOut",
            }}
          />
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="10"
            fill="none"
            stroke="#10B981"
            strokeWidth="1"
            animate={{ opacity: [0.25, 0.8, 0.25] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3 }}
          />
          <circle cx={n.x} cy={n.y} r="4" fill="#10B981" opacity="0.9" />
        </g>
      ))}
      <text
        x="16"
        y="304"
        className="fill-textMuted"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="2"
      >
        FIG.01 — WORK DISTRIBUTED ACROSS PARALLEL NODES
      </text>
    </svg>
  );
}

export default function Mission() {
  return (
    <section id="mission" className="relative py-28 md:py-36" aria-label="Mission">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* copy */}
          <div>
            <Reveal>
              <SectionLabel
                code="SEC.01 // MISSION"
                title="Why Parallel Computing?"
                className="mb-8"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-textSecondary">
                AI models, scientific simulations, graphics engines, robotics,
                and large-scale data systems all depend on parallel
                computation. UH PCS exists to help students understand the
                hardware and software stack powering that future.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-4">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={0.12 + i * 0.08} as="li">
                  <GlassCard className="flex items-start gap-4 p-5" corners>
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-md border border-line bg-graphite text-gpu">
                      <pillar.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-textPrimary">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-textSecondary">
                        {pillar.description}
                      </p>
                    </div>
                  </GlassCard>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* diagram */}
          <Reveal delay={0.15} className="lg:sticky lg:top-28">
            <GlassCard className="p-6" corners beam>
              <TerminalTitlebar
                label="[TOPOLOGY://LIVE] · 8 NODES · 11 LINKS"
                className="-mx-6 -mt-6 mb-5"
              />
              <div className="aspect-square w-full">
                <ComputeDiagram />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 font-mono text-[10px] tracking-[0.16em]">
                <div>
                  <p className="text-textMuted">SERIAL</p>
                  <p className="mt-1 text-textSecondary">1 task / step</p>
                </div>
                <div>
                  <p className="text-textMuted">PARALLEL</p>
                  <p className="mt-1 text-mint">N tasks / step</p>
                </div>
                <div>
                  <p className="text-textMuted">RESULT</p>
                  <p className="mt-1 text-holo">The modern world</p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

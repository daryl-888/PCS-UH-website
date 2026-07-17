"use client";

import { type LucideIcon } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";

type OfferNodeProps = {
  icon: LucideIcon;
  node: string;
  title: string;
  description: string;
  status: string;
  chips: string[];
  delay?: number;
};

/** A single "What We Offer" module — terminal card with metadata chips and a hover data-stream tick. */
export default function OfferNode({
  icon: Icon,
  node,
  title,
  description,
  status,
  chips,
  delay = 0,
}: OfferNodeProps) {
  return (
    <Reveal delay={delay} as="li">
      <GlassCard
        className="group/node flex h-full flex-col p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
        corners
        beam
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-md border border-line bg-graphite text-gpu transition-colors group-hover/node:border-lineActive group-hover/node:text-mint">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-textMuted">
            {node}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-textPrimary">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-textSecondary">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-sm border border-line/70 bg-obsidian/50 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-textMuted"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[10px] tracking-[0.2em]">
          <span
            className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gpu"
            aria-hidden
          />
          <span className="text-gpu">STATUS: {status}</span>
          <span
            className="terminal-cursor ml-auto text-gpu opacity-0 transition-opacity duration-300 group-hover/node:opacity-100"
            aria-hidden
          />
        </div>
      </GlassCard>
    </Reveal>
  );
}

"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import TerminalCard from "@/components/TerminalCard";

type OfferNodeProps = {
  icon: LucideIcon;
  node: string;
  title: string;
  description: string;
  status: string;
  chips: string[];
  delay?: number;
};

/**
 * A single "What We Offer" module — starts as a tiny compute node and
 * springs open into the full terminal card (the "Data Node Expansion"
 * transition), rather than a plain fade/slide.
 */
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
    <motion.li
      initial={{ opacity: 0, scale: 0.2, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 15,
        mass: 0.7,
        delay,
      }}
    >
      <TerminalCard
        label={`pcs://offer/${node.replace(/[[\]]/g, "").toLowerCase()}`}
        className="group/node h-full transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="flex h-full flex-col p-6">
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
                className="rounded-sm border border-line/70 bg-obsidian/60 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-textMuted"
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
        </div>
      </TerminalCard>
    </motion.li>
  );
}

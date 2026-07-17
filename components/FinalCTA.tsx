"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessagesSquare, Mail } from "lucide-react";
import DecodeText from "@/components/DecodeText";
import Reveal from "@/components/Reveal";
import { DISCORD_URL } from "@/data/nav";

const buttonPop = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 18, delay: 0.3 + i * 0.09 },
  }),
};

export default function FinalCTA() {
  return (
    <section
      id="join"
      className="relative border-t border-line py-32 md:py-44"
      aria-label="Join UH PCS"
    >
      <div className="mx-auto max-w-site px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-gpu">
            SEC.04 // ACCESS_CONTROL
          </p>
        </Reveal>
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-textPrimary sm:text-5xl md:text-6xl">
          <DecodeText text="Start before" /> <span className="text-gpu"><DecodeText text="you feel ready." delay={0.3} /></span>
        </h2>
        <Reveal delay={0.5}>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-textSecondary">
            You do not need CUDA experience to join. PCS is built for
            students who are curious, ambitious, and ready to learn by
            building.
          </p>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={buttonPop}
          >
            <Link
              href="/membership"
              className="group inline-flex items-center gap-2 rounded-md border border-lineActive bg-gpu px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-obsidian transition-all hover:bg-mint hover:shadow-glowStrong"
            >
              Become a Member
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </motion.div>
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={buttonPop}
          >
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-textPrimary transition-all hover:border-lineActive hover:text-mint"
            >
              <MessagesSquare className="h-4 w-4" aria-hidden />
              Join Discord
            </a>
          </motion.div>
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={buttonPop}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-textSecondary transition-colors hover:text-holo"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact Officers
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

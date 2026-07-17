"use client";

import Link from "next/link";
import { ArrowRight, MessagesSquare, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import { DISCORD_URL } from "@/data/nav";

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
        <Reveal delay={0.08}>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-textPrimary sm:text-5xl md:text-6xl">
            Start before <span className="text-gpu">you feel ready.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-textSecondary">
            You do not need CUDA experience to join. PCS is built for
            students who are curious, ambitious, and ready to learn by
            building.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-textPrimary transition-all hover:border-lineActive hover:text-mint"
            >
              <MessagesSquare className="h-4 w-4" aria-hidden />
              Join Discord
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-textSecondary transition-colors hover:text-holo"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact Officers
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

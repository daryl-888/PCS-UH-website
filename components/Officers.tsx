"use client";

import { AtSign, Phone } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import TerminalCard from "@/components/TerminalCard";
import Reveal from "@/components/Reveal";
import { officers } from "@/data/officers";

/** Deterministic abstract GPU-node avatar (no generic profile pictures). */
function NodeAvatar({ seed }: { seed: number }) {
  const cells = Array.from({ length: 25 }, (_, i) => {
    // simple deterministic pseudo-random pattern per officer
    const v = Math.sin(seed * 37.7 + i * 13.13) * 0.5 + 0.5;
    return v;
  });
  return (
    <svg
      viewBox="0 0 60 60"
      className="h-16 w-16"
      role="img"
      aria-label="Abstract compute node avatar"
    >
      <rect
        x="1"
        y="1"
        width="58"
        height="58"
        rx="4"
        fill="rgba(8,20,14,0.9)"
        stroke="rgba(16,185,129,0.45)"
      />
      {cells.map((v, i) => {
        const x = 8 + (i % 5) * 9.5;
        const y = 8 + Math.floor(i / 5) * 9.5;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="6.5"
            height="6.5"
            rx="1"
            fill={v > 0.72 ? "#14F1D9" : v > 0.42 ? "#10B981" : "#0A2417"}
            opacity={v > 0.42 ? 0.9 : 0.6}
          />
        );
      })}
    </svg>
  );
}

export default function Officers() {
  return (
    <section
      id="officers"
      className="relative border-t border-line py-28 md:py-36"
      aria-label="Officers"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            code="SEC.05 // MAINTAINERS"
            title="Core Maintainers"
            subtitle="The student engineers keeping the system online."
          />
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {officers.map((officer, i) => (
            <Reveal key={officer.id} delay={(i % 3) * 0.08} as="li">
              <TerminalCard
                label={`pcs://officers/${officer.id.replace(/[[\]]/g, "").toLowerCase()}`}
                className="relative h-full overflow-hidden"
                contentClassName="p-6"
                corners
              >
                <span className="scan-bar" aria-hidden />
                <div className="flex items-start justify-between">
                  <NodeAvatar seed={i + 1} />
                  <span className="font-mono text-[10px] tracking-[0.18em] text-textMuted">
                    {officer.id}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-textPrimary">
                  {officer.name}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gpu">
                  {officer.role}
                </p>
                <dl className="mt-4 space-y-1.5 border-t border-line pt-4 font-mono text-[11px]">
                  <div className="flex gap-2">
                    <dt className="w-14 shrink-0 text-textMuted">MAJOR</dt>
                    <dd className="text-textSecondary">{officer.major}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-14 shrink-0 text-textMuted">FOCUS</dt>
                    <dd className="text-textSecondary">{officer.focus}</dd>
                  </div>
                </dl>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <a
                    href={officer.contact}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-textMuted transition-colors hover:text-mint"
                  >
                    <AtSign className="h-3.5 w-3.5" aria-hidden />
                    Contact
                  </a>
                  {officer.phone ? (
                    <a
                      href={`tel:${officer.phone.replace(/[^\d+]/g, "")}`}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-textMuted transition-colors hover:text-mint"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      {officer.phone}
                    </a>
                  ) : null}
                </div>
              </TerminalCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

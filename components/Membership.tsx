"use client";

import { ArrowRight, Check } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import { membershipBenefits, LINKS } from "@/data/site";

export default function Membership() {
  return (
    <section
      id="membership"
      className="relative py-28 md:py-40"
      aria-label="Membership"
    >
      <div className="mx-auto max-w-site px-6 lg:px-12">
        <Reveal>
          <SectionLabel
            align="center"
            eyebrow="Membership"
            title="Join the parallel layer at UH."
            subtitle="Become part of a student-led community building skills in GPU computing, systems thinking, and high-performance engineering."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-3xl">
            {/* soft glow behind the panel */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 -inset-y-6 rounded-[32px] bg-pcs/[0.06] blur-3xl"
            />
            <GlassCard className="relative p-10 text-center md:p-14">
              <p className="font-display text-5xl font-medium tracking-tight text-textPrimary">
                $15
                <span className="ml-2 text-lg text-textMuted">/ year</span>
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-textMuted">
                Open to all UH students · No prior experience required
              </p>

              <ul className="mx-auto mt-10 grid max-w-xl gap-x-10 gap-y-4 text-left sm:grid-cols-2">
                {membershipBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-textSoft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-pcs" aria-hidden />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={LINKS.membershipForm}
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-pcs px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-void transition-all duration-300 hover:bg-pcsBright hover:shadow-glowStrong sm:w-auto"
                >
                  Become a Member
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
                <a
                  href={`mailto:${LINKS.email}`}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.16em] text-textPrimary transition-all duration-300 hover:border-lineActive hover:text-pcs sm:w-auto"
                >
                  Contact PCS
                </a>
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

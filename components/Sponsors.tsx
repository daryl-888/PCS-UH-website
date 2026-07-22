"use client";

import { CheckCircle2, FileDown, Presentation } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import TerminalCard from "@/components/TerminalCard";
import Reveal from "@/components/Reveal";
import { sponsorBenefits } from "@/data/sponsors";
import { CONTACT_EMAIL } from "@/data/nav";

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="relative border-t border-line py-28 md:py-36"
      aria-label="Sponsorship"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            code="SEC.06 // PARTNERSHIPS"
            title="Sponsor the Compute Pipeline"
            subtitle="UH PCS partners with companies interested in GPU computing, AI infrastructure, high-performance systems, and technical student talent."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
          {/* benefits */}
          <Reveal>
            <TerminalCard
              label="SPONSORSHIP_MANIFEST.TXT"
              contentClassName="p-6 sm:p-8"
              corners
            >
              <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {sponsorBenefits.map((benefit) => (
                  <li key={benefit.id} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-gpu"
                      aria-hidden
                    />
                    <div>
                      <p className="text-sm font-medium text-textPrimary">
                        {benefit.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-textSecondary">
                        {benefit.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </TerminalCard>
          </Reveal>

          {/* CTA panel */}
          <Reveal delay={0.12}>
            <TerminalCard
              label="PARTNER_UPLINK.LOG"
              className="flex h-full flex-col"
              contentClassName="flex flex-1 flex-col justify-between bg-panelHigh p-6 sm:p-8"
              corners
              beam
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.24em] text-holo">
                  [PARTNER_UPLINK: OPEN]
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-textPrimary">
                  Put your stack in front of the students building on it.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-textSecondary">
                  Sponsorship tiers scale from single-event support to
                  semester-long partnerships. We&apos;ll send a full packet with
                  tiers, audience data, and past programming.
                </p>
              </div>
              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=UH%20PCS%20Sponsorship%20Packet%20Request`}
                  className="flex items-center justify-center gap-2 rounded-md border border-lineActive bg-gpu px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-obsidian transition-all hover:bg-mint hover:shadow-glowStrong"
                >
                  <FileDown className="h-4 w-4" aria-hidden />
                  Request Sponsorship Packet
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=UH%20PCS%20Workshop%20Hosting`}
                  className="flex items-center justify-center gap-2 rounded-md border border-line bg-panel px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-textPrimary transition-all hover:border-lineActive hover:text-mint"
                >
                  <Presentation className="h-4 w-4" aria-hidden />
                  Host a Workshop
                </a>
                <p className="pt-1 text-center font-mono text-[10px] tracking-[0.16em] text-textMuted">
                  RESPONSE_SLA: 48 HOURS
                </p>
              </div>
            </TerminalCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

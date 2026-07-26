"use client";

import { CheckCircle2 } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import TerminalCard from "@/components/TerminalCard";
import Reveal from "@/components/Reveal";
import { sponsorBenefits } from "@/data/sponsors";

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

        <Reveal>
          <TerminalCard
            label="SPONSORSHIP_MANIFEST.TXT"
            contentClassName="p-6 sm:p-8"
            corners
          >
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Check } from "lucide-react";
import SiteChrome from "@/components/SiteChrome";
import TerminalCard from "@/components/TerminalCard";
import Reveal from "@/components/Reveal";
import Join from "@/components/Join";
import { CONTACT_EMAIL } from "@/data/nav";

export const metadata: Metadata = {
  title: "Membership — UH PCS",
  description:
    "$15/year. Open to all UH students. No prior experience required.",
};

const BENEFITS = [
  "CUDA and C++ workshops",
  "GitHub organization access",
  "Project pool access",
  "Resume pool access",
  "Sponsor + industry events",
  "Technical mentorship",
];

export default function MembershipPage() {
  return (
    <SiteChrome>
      <section className="relative pb-8 pt-36 md:pt-44">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-gpu">
              /// MEMBERSHIP
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-textPrimary sm:text-5xl md:text-6xl">
              Join the parallel layer.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-textSecondary">
              Open to all UH students. No prior GPU or CUDA experience
              required.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="relative border-t border-line py-16 md:py-24"
        aria-label="Pricing"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <TerminalCard
              label="PRICING.TXT"
              className="mx-auto max-w-2xl"
              contentClassName="p-8 text-center sm:p-12"
              corners
              beam
            >
              <p className="font-display text-5xl font-bold text-textPrimary">
                $15{" "}
                <span className="text-lg font-normal text-textMuted">
                  / year
                </span>
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-textMuted">
                Open to all UH students · No prior experience required
              </p>

              <ul className="mx-auto mt-8 grid max-w-md gap-x-8 gap-y-3 text-left sm:grid-cols-2">
                {BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2.5 text-sm text-textSecondary"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-gpu"
                      aria-hidden
                    />
                    {benefit}
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  "UH PCS Membership Question"
                )}`}
                className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.18em] text-textSecondary transition-colors hover:text-mint"
              >
                Questions? Contact PCS →
              </a>
            </TerminalCard>
          </Reveal>
        </div>
      </section>

      <Join />
    </SiteChrome>
  );
}

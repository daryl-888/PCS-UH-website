import type { Metadata } from "next";
import { Mail, Phone, HandCoins, ArrowUpRight } from "lucide-react";
import SiteChrome from "@/components/SiteChrome";
import SectionLabel from "@/components/SectionLabel";
import TerminalCard from "@/components/TerminalCard";
import SponsorTiers from "@/components/SponsorTiers";
import Sponsors from "@/components/Sponsors";
import Reveal from "@/components/Reveal";
import {
  sponsorStats,
  programTypes,
  sponsorContacts,
  donateSteps,
  GIVING_PORTAL_URL,
} from "@/data/sponsorship";

export const metadata: Metadata = {
  title: "Sponsor — UH PCS",
  description:
    "Partner with the UH Parallel Computing Society — sponsorship tiers, market impact, and how to give.",
};

export default function SponsorPage() {
  return (
    <SiteChrome>
      <section className="relative pb-8 pt-36 md:pt-44">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-gpu">
              /// SPONSOR
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-textPrimary sm:text-5xl md:text-6xl">
              Partner with PCS.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-textSecondary">
              Building the next generation of parallel computing engineers —
              GPU programming, CUDA, AI acceleration, HPC, and systems.
            </p>
            <p className="mt-4 max-w-xl border-l-2 border-gpu/50 pl-4 text-sm italic leading-relaxed text-textMuted">
              &ldquo;UH PCS was founded with a simple mission: to prepare the
              next generation of engineers... we created UH PCS to bridge
              that gap.&rdquo;
              <span className="mt-1 block not-italic font-mono text-[10px] uppercase tracking-[0.18em] text-textMuted">
                — Daryl Alfaro, President
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* market impact stats */}
      <section
        className="relative border-t border-line py-20 md:py-28"
        aria-label="Why sponsor UH PCS"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionLabel
              code="SEC.01 // MARKET_SIGNAL"
              title="The Talent You're Supporting"
              subtitle="Your partnership supports UH students building careers in a job market where parallel-computing and AI skills are in soaring demand."
            />
          </Reveal>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {sponsorStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06} as="li">
                <TerminalCard
                  label={stat.label}
                  className="h-full"
                  contentClassName="flex h-full flex-col gap-2 p-4 sm:p-5"
                >
                  <p className="font-display text-2xl font-bold text-mint sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-xs leading-relaxed text-textSecondary">
                    {stat.detail}
                  </p>
                </TerminalCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* programming sponsors plug into */}
      <section
        className="relative border-t border-line py-20 md:py-28"
        aria-label="Programming sponsors support"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionLabel
              code="SEC.02 // PROGRAMMING"
              title="What Members Experience"
              subtitle="The recurring programming your sponsorship funds and plugs into, all year."
            />
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programTypes.map((program, i) => (
              <Reveal key={program.id} delay={(i % 3) * 0.08} as="li">
                <TerminalCard
                  label={`pcs://sponsor/${program.id.toLowerCase()}`}
                  className="h-full"
                  contentClassName="flex h-full flex-col p-6"
                  corners
                >
                  <h3 className="font-display text-lg font-bold text-textPrimary">
                    {program.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-textSecondary">
                    {program.description}
                  </p>
                </TerminalCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* tiers table */}
      <section
        className="relative border-t border-line py-20 md:py-28"
        aria-label="Sponsorship tiers"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionLabel
              code="SEC.03 // PARTNERSHIP_LEVELS"
              title="Sponsorship Tiers"
              subtitle="All sponsorships run for the full 2026–2027 academic year. Custom partnerships are welcome."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SponsorTiers />
          </Reveal>
        </div>
      </section>

      {/* full benefits breakdown + request CTA */}
      <Sponsors />

      {/* one-time gift alternative */}
      <section
        className="relative border-t border-line py-20 md:py-28"
        aria-label="Make a one-time gift"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <TerminalCard label="pcs://sponsor/donate" contentClassName="p-6 sm:p-8" corners>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-line bg-graphite text-gpu">
                  <HandCoins className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.24em] text-gpu">
                    PREFER_A_ONE_TIME_GIFT
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-textPrimary">
                    Give through the UH giving portal
                  </h3>
                </div>
              </div>
              <ol className="mt-6 space-y-3">
                {donateSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-textSecondary">
                    <span className="font-mono text-[10px] text-gpu">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-4 shrink-0 translate-y-2 bg-line" aria-hidden />
                    {step}
                  </li>
                ))}
              </ol>
              <a
                href={GIVING_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-lineActive bg-gpu/12 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mint transition-all hover:bg-gpu/25 hover:shadow-glow"
              >
                Open Giving Portal
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </TerminalCard>
          </Reveal>
        </div>
      </section>

      {/* direct officer contacts */}
      <section
        className="relative border-t border-line py-20 md:py-28"
        aria-label="Sponsor contacts"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionLabel
              code="SEC.04 // SPONSOR_CONTACTS"
              title="Talk to the Team"
              subtitle="Questions or ready to set up a custom partnership? Reach out directly."
            />
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-2">
            {sponsorContacts.map((contact, i) => (
              <Reveal key={contact.email} delay={(i % 2) * 0.08} as="li">
                <TerminalCard
                  label={`pcs://sponsor/contacts/${contact.name.toLowerCase().replace(/\s+/g, "_")}`}
                  className="h-full"
                  contentClassName="p-6"
                  corners
                >
                  <h3 className="font-display text-lg font-bold text-textPrimary">
                    {contact.name}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gpu">
                    {contact.role}
                  </p>
                  <div className="mt-4 space-y-2 border-t border-line pt-4">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 font-mono text-xs text-textSecondary transition-colors hover:text-mint"
                    >
                      <Mail className="h-3.5 w-3.5 text-gpu" aria-hidden />
                      {contact.email}
                    </a>
                    <a
                      href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                      className="flex items-center gap-2 font-mono text-xs text-textSecondary transition-colors hover:text-mint"
                    >
                      <Phone className="h-3.5 w-3.5 text-gpu" aria-hidden />
                      {contact.phone}
                    </a>
                  </div>
                </TerminalCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </SiteChrome>
  );
}

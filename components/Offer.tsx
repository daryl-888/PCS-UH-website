"use client";

import { Terminal, Trophy, Boxes, Building2, type LucideIcon } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import { offers } from "@/data/site";

const icons: LucideIcon[] = [Terminal, Trophy, Boxes, Building2];

export default function Offer() {
  return (
    <section id="offer" className="relative py-28 md:py-40" aria-label="What we offer">
      <div className="mx-auto max-w-wide px-6 lg:px-12">
        <Reveal>
          <SectionLabel
            eyebrow="What we offer"
            title="What we offer"
            subtitle="Real skills, real projects, real access — built around parallel computing."
          />
        </Reveal>

        <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
          {offers.map((offer, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={offer.title} delay={(i % 2) * 0.1} as="li">
                <GlassCard className="h-full p-10 md:p-12" scan>
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-abyss text-pcs transition-colors duration-300 group-hover:border-lineActive">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-8 font-display text-2xl font-medium tracking-tight text-textPrimary">
                    {offer.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-textSoft">
                    {offer.description}
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-20 max-w-2xl text-center font-display text-xl font-medium leading-relaxed text-textPrimary md:text-2xl">
            The only student organization at UH built entirely around{" "}
            <span className="text-pcs">parallel computing</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

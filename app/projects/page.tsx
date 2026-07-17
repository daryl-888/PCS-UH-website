import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import Projects from "@/components/Projects";
import { CONTACT_EMAIL } from "@/data/nav";

export const metadata: Metadata = {
  title: "Projects — UH PCS",
  description:
    "The full UH PCS project gallery — GPU kernels, emulators, and simulations built by members.",
};

export default function ProjectsPage() {
  return (
    <SiteChrome>
      <section className="relative pb-8 pt-36 md:pt-44">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-gpu">
              /// PROJECTS
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-textPrimary sm:text-5xl md:text-6xl">
              See what we&apos;ve built.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-textSecondary">
              GPU kernels, emulators, and simulations — built to be studied,
              forked, and shown.
            </p>
          </Reveal>
        </div>
      </section>

      <Projects />

      <section
        id="submit"
        className="relative border-t border-line py-20 md:py-28"
        aria-label="Submit a project"
      >
        <div className="mx-auto max-w-site px-4 text-center sm:px-6 lg:px-10">
          <Reveal>
            <GlassCard className="mx-auto max-w-xl p-8 sm:p-10" corners beam>
              <p className="font-mono text-[10px] tracking-[0.24em] text-gpu">
                SUBMIT_A_PROJECT
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-textPrimary">
                Built something worth showing?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-textSecondary">
                Members can propose projects for the pool — email a short
                pitch and we&apos;ll help you scope it.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  "UH PCS Project Submission"
                )}`}
                className="mt-6 inline-flex items-center justify-center rounded-md border border-lineActive bg-gpu px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-obsidian transition-all hover:bg-mint hover:shadow-glowStrong"
              >
                Submit a Project
              </a>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </SiteChrome>
  );
}

import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import Officers from "@/components/Officers";

export const metadata: Metadata = {
  title: "About — UH PCS",
  description:
    "What UH PCS is, why parallel computing matters, and who can join.",
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <section className="relative pb-8 pt-36 md:pt-44">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-gpu">
              /// ABOUT
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-textPrimary sm:text-5xl md:text-6xl">
              Built by students. For students.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-textSecondary">
              UH PCS is a student-led technical organization at the
              University of Houston, focused on GPU computing, CUDA,
              high-performance systems, and performance-oriented engineering.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="relative border-t border-line py-20 md:py-28"
        aria-label="Why parallel computing matters"
      >
        <div className="mx-auto grid max-w-site gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-10">
          <Reveal>
            <GlassCard className="h-full p-7 sm:p-8" corners>
              <p className="font-mono text-[10px] tracking-[0.24em] text-gpu">
                WHY_IT_MATTERS
              </p>
              <p className="mt-4 text-base leading-relaxed text-textSecondary">
                AI, graphics, robotics, and large-scale data systems all run
                on parallel computation. Most CS/ECE curricula don&apos;t
                teach it — we do.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full p-7 sm:p-8" corners>
              <p className="font-mono text-[10px] tracking-[0.24em] text-gpu">
                WHO_CAN_JOIN
              </p>
              <p className="mt-4 text-base leading-relaxed text-textSecondary">
                Any UH student, any major, any year. No CUDA or GPU
                experience required — curiosity is the only prerequisite.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <Officers />
    </SiteChrome>
  );
}

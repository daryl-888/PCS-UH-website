"use client";

import { useEffect, useState } from "react";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import { featuredProject, projects } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Terminal preview for the featured emulator.
 * On hover, PC / ACC / CYCLES tick forward like the emulator is running.
 */
function EmulatorTerminal() {
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!hovered || reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), 320);
    return () => clearInterval(id);
  }, [hovered, reduced]);

  const pc = 0x0032 + tick * 2;
  const acc = 0x06 + (tick % 4);
  const cycles = 128 + tick * 3;

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="rounded-xl border border-line bg-void/80 font-mono text-[13px] leading-relaxed"
      role="img"
      aria-label="Terminal preview of the 8-bit CPU emulator running instructions"
    >
      <div className="flex items-center gap-2 border-b border-line px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-alert/60" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-pcsDeep" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-pcs/70" aria-hidden />
        <span className="ml-3 text-[10px] uppercase tracking-[0.22em] text-textMuted">
          emu — zsh
        </span>
      </div>
      <div className="space-y-1 px-5 py-4 text-textSoft">
        <p>&gt; LOAD A, 0x04</p>
        <p>&gt; ADD A, 0x02</p>
        <p>
          &gt; PC:{" "}
          <span className="text-pcs">
            0x{pc.toString(16).toUpperCase().padStart(4, "0")}
          </span>
        </p>
        <p>
          &gt; ACC:{" "}
          <span className="text-pcs">
            0x{acc.toString(16).toUpperCase().padStart(2, "0")}
          </span>
        </p>
        <p>
          &gt; CYCLES: <span className="text-pcs">{cycles}</span>
          <span className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 animate-pulse-soft bg-pcs/80" aria-hidden />
        </p>
      </div>
    </div>
  );
}

export default function ProjectPool() {
  return (
    <section id="projects" className="relative py-28 md:py-40" aria-label="Projects">
      <div className="mx-auto max-w-wide px-6 lg:px-12">
        <Reveal>
          <SectionLabel
            eyebrow="Project pool"
            title="Build the systems you used to only read about."
            subtitle="Members collaborate on technical projects that connect software, hardware, performance, and real implementation."
          />
        </Reveal>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {/* featured — spans two columns */}
          <Reveal className="lg:col-span-2">
            <GlassCard className="h-full p-8 md:p-10" scan>
              <div className="grid items-center gap-8 md:grid-cols-[1fr,0.95fr]">
                <div>
                  <p className="mb-4 inline-block rounded-md border border-line bg-abyss px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-pcs">
                    Featured build
                  </p>
                  <h3 className="font-display text-2xl font-medium tracking-tight text-textPrimary md:text-3xl">
                    {featuredProject.name}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-textSoft">
                    {featuredProject.description}
                  </p>
                </div>
                <EmulatorTerminal />
              </div>
            </GlassCard>
          </Reveal>

          {/* remaining projects stack in the third column on desktop */}
          <div className="grid gap-6 md:gap-8 lg:grid-rows-3">
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={0.1 + i * 0.08}>
                <GlassCard className="flex h-full flex-col justify-center p-7">
                  <h3 className="font-display text-lg font-medium tracking-tight text-textPrimary">
                    {project.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-textSoft">
                    {project.description}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { GitBranch, ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import StatusBadge from "@/components/StatusBadge";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const statusTone: Record<Project["status"], "green" | "cyan" | "amber"> = {
  Deployed: "green",
  "Workshop Ready": "cyan",
  Optimizing: "amber",
  Prototype: "amber",
};

/** CSS/SVG generated thumbnail — no image assets needed. */
function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  return (
    <div className="relative h-full min-h-[160px] w-full overflow-hidden rounded-md border border-line bg-obsidian">
      {visual === "blur" && (
        <div className="absolute inset-0">
          <div className="absolute left-[15%] top-[20%] h-20 w-20 rounded-full bg-gpu/60 blur-none transition-all duration-500 group-hover:blur-md" />
          <div className="absolute bottom-[18%] right-[20%] h-16 w-16 rounded-full bg-holo/50 blur-md transition-all duration-500 group-hover:blur-none" />
          <div className="absolute inset-x-6 top-1/2 h-px bg-line" />
          <span className="absolute bottom-2 left-3 font-mono text-[9px] tracking-[0.2em] text-textMuted">
            CPU → GPU
          </span>
        </div>
      )}
      {visual === "matrix" && (
        <div className="absolute inset-4 grid grid-cols-6 grid-rows-6 gap-1">
          {Array.from({ length: 36 }).map((_, i) => (
            <motion.span
              key={i}
              className="rounded-[2px] bg-gpu/25"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: ((i % 6) + Math.floor(i / 6)) * 0.12,
              }}
            />
          ))}
        </div>
      )}
      {visual === "cpu" && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-20 w-20 rounded-sm border border-lineActive bg-graphite">
            <span className="absolute inset-3 rounded-[2px] border border-line" />
            {[0, 1, 2, 3].map((side) =>
              [0, 1, 2].map((pin) => (
                <span
                  key={`${side}-${pin}`}
                  className="absolute h-1 w-3 bg-gpu/70"
                  style={
                    side === 0
                      ? { top: `${22 + pin * 22}%`, left: -12 }
                      : side === 1
                        ? { top: `${22 + pin * 22}%`, right: -12 }
                        : side === 2
                          ? { left: `${22 + pin * 22}%`, top: -8, width: 4, height: 12 }
                          : { left: `${22 + pin * 22}%`, bottom: -8, width: 4, height: 12 }
                  }
                />
              ))
            )}
            <span className="absolute inset-0 grid place-items-center font-mono text-[9px] tracking-[0.2em] text-mint">
              8-BIT
            </span>
          </div>
        </div>
      )}
      {visual === "particles" && (
        <div className="absolute inset-0">
          {Array.from({ length: 26 }).map((_, i) => (
            <motion.span
              key={i}
              className={cn(
                "absolute h-1 w-1 rounded-full",
                i % 3 === 0 ? "bg-holo" : "bg-gpu"
              )}
              style={{ left: `${(i * 37) % 92 + 4}%` }}
              animate={{ top: ["104%", "-6%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 3 + (i % 5),
                repeat: Infinity,
                delay: i * 0.24,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-node-grid opacity-60"
        style={{ backgroundSize: "20px 20px" }}
      />
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-line py-28 md:py-36"
      aria-label="Featured projects"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            code="SEC.03 // SYSTEM_OUTPUTS"
            title="System Outputs"
            subtitle="Projects built by members to understand parallel systems from the hardware up."
          />
        </Reveal>

        <ul className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.1} as="li">
              <GlassCard className="grid h-full gap-5 p-5 sm:grid-cols-[200px,1fr]" corners beam>
                <ProjectVisual visual={project.visual} />

                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.2em] text-textMuted">
                        {project.id} · {project.type.toUpperCase()}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-bold text-textPrimary">
                        {project.name}
                      </h3>
                    </div>
                    <StatusBadge
                      label={project.status}
                      tone={statusTone[project.status]}
                      pulse={project.status !== "Deployed"}
                    />
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-textSecondary">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm border border-line bg-graphite px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] text-textSecondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* hidden stats revealed on hover */}
                  <div className="mt-3 grid max-h-0 grid-cols-3 gap-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {project.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-sm border border-line/60 bg-obsidian/60 p-2"
                      >
                        <p className="font-mono text-[8px] tracking-[0.16em] text-textMuted">
                          {stat.label}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-mint">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
                    <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-textMuted">
                      <GitBranch className="h-3.5 w-3.5" aria-hidden />
                      github.com/uh-pcs
                    </span>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-textPrimary transition-all hover:border-lineActive hover:text-mint"
                    >
                      View Repository
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </a>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GitBranch, ArrowUpRight, Star, GitFork } from "lucide-react";
import DecodeText from "@/components/DecodeText";
import TerminalCard from "@/components/TerminalCard";
import StatusBadge from "@/components/StatusBadge";
import Reveal from "@/components/Reveal";
import { projects, type Project } from "@/data/projects";
import { GITHUB_URL } from "@/data/nav";

const statusTone: Record<Project["status"], "green" | "cyan" | "amber"> = {
  Deployed: "green",
  "Workshop Ready": "cyan",
  Optimizing: "amber",
  Prototype: "amber",
};

/** Deterministic fake stars/forks so numbers don't shift between renders. */
function fakeStats(id: string) {
  const seed = id.charCodeAt(id.length - 1);
  return { stars: 12 + (seed % 40), forks: 3 + (seed % 10) };
}

export default function GitHubRepoPanel() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="github"
      className="relative border-t border-line py-28 md:py-40 lg:py-52"
      aria-label="GitHub repositories"
    >
      {/* Narrower + centered than the other sections — deliberately leaves
          open margins left and right so the GPU (now well zoomed-out at
          this scroll stop) frames the terminal window instead of hiding
          behind it. */}
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-lineActive" aria-hidden />
            <span className="font-mono text-[11px] tracking-[0.28em] text-gpu">
              SEC.03 // SOURCE_CONTROL
            </span>
            <span className="h-px w-8 bg-lineActive" aria-hidden />
          </div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-textPrimary sm:text-4xl md:text-5xl">
            <DecodeText text="Open Repositories. Real Systems." />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-textSecondary">
            PCS projects are built to be studied, forked, improved, and
            shown. Our GitHub is the technical portfolio of the
            organization.
          </p>
        </Reveal>

        {/* Repo Terminal Transition — the panel unmasks top-down like a terminal window opening */}
        <motion.div
          className="mt-12 text-left"
          initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.65, 0.36, 1] }}
        >
          <TerminalCard label="uh-pcs@github:~$ ls repositories/ --featured">
            <ul className="divide-y divide-line">
              {featured.map((project) => {
                const stats = fakeStats(project.id);
                return (
                  <li
                    key={project.id}
                    className="flex flex-col gap-4 p-5 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between sm:p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <GitBranch
                          className="h-4 w-4 shrink-0 text-gpu"
                          aria-hidden
                        />
                        <h3 className="font-display text-base font-bold text-textPrimary sm:text-lg">
                          {project.name}
                        </h3>
                        <StatusBadge
                          label={project.status}
                          tone={statusTone[project.status]}
                          pulse={project.status !== "Deployed"}
                        />
                      </div>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-textSecondary">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-sm border border-line bg-black px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] text-textSecondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-5 font-mono text-[11px] text-textMuted">
                      <span className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5" aria-hidden />
                        {stats.stars}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GitFork className="h-3.5 w-3.5" aria-hidden />
                        {stats.forks}
                      </span>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-textPrimary transition-all hover:border-lineActive hover:text-mint"
                      >
                        View
                        <ArrowUpRight className="h-3 w-3" aria-hidden />
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-4 sm:px-6">
              <p className="font-mono text-xs text-textSecondary">
                <span className="text-matrix">$</span> git clone
                uh-pcs/future-of-computing
                <span className="terminal-cursor text-gpu" aria-hidden />
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-lineActive bg-gpu/12 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mint transition-all hover:bg-gpu/25 hover:shadow-glow"
                >
                  View GitHub
                </a>
                <Link
                  href="/projects#submit"
                  className="rounded-md border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-textPrimary transition-all hover:border-lineActive hover:text-mint"
                >
                  Submit a Project
                </Link>
              </div>
            </div>
          </TerminalCard>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Layers, Boxes, Network } from "lucide-react";
import DecodeText from "@/components/DecodeText";
import TerminalCard from "@/components/TerminalCard";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    node: "01_LEARN",
    icon: Layers,
    description:
      "Hands-on workshops in CUDA, GPU architecture, and systems thinking.",
  },
  {
    node: "02_BUILD",
    icon: Boxes,
    description:
      "Real projects that turn concepts into portfolio-ready technical work.",
  },
  {
    node: "03_CONNECT",
    icon: Network,
    description:
      "Industry talks, recruiter access, alumni support, and mentorship.",
  },
];

export default function Mission() {
  return (
    <section
      id="mission"
      className="relative py-28 md:py-40 lg:py-52"
      aria-label="Mission"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* right column only — the left half stays clear of copy so the GPU
            (drifted/zoomed for this scroll stop) is never covered */}
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-lineActive" aria-hidden />
                <span className="font-mono text-[11px] tracking-[0.28em] text-gpu">
                  SEC.01 // MISSION
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-textPrimary sm:text-4xl md:text-5xl">
                <DecodeText text="Our Mission" />
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-textSecondary">
                UH PCS closes the gap between traditional CS/ECE education
                and the real-world demand for GPU computing, parallel
                systems, and performance-focused engineering.
              </p>
            </Reveal>

            <ul className="mt-12 space-y-8">
              {pillars.map((pillar, i) => (
                <motion.li
                  key={pillar.node}
                  initial={{ opacity: 0, y: 46, scale: 0.94, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.75,
                    delay: 0.1 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <TerminalCard label={`pcs://mission/${pillar.node.toLowerCase()}`}>
                    <div className="flex items-start gap-4 p-6">
                      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-md border border-line bg-graphite text-gpu">
                        <pillar.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <p className="font-mono text-[11px] tracking-[0.22em] text-gpu">
                          {pillar.node}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-textSecondary">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </TerminalCard>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  Cpu,
  CircuitBoard,
  Boxes,
  Network,
  type LucideIcon,
} from "lucide-react";
import DecodeText from "@/components/DecodeText";
import OfferNode from "@/components/OfferNode";
import Reveal from "@/components/Reveal";
import { offerings } from "@/data/offerings";

const icons: Record<string, LucideIcon> = {
  cpu: Cpu,
  circuit: CircuitBoard,
  boxes: Boxes,
  network: Network,
};

export default function Offerings() {
  return (
    <section
      id="offer"
      className="relative flex min-h-screen min-h-dvh snap-start flex-col justify-center border-t border-line py-24"
      aria-label="What we offer"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        {/* left column this time — alternates with Mission's right column so
            the GPU's open side changes with it as you scroll */}
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-lineActive" aria-hidden />
                <span className="font-mono text-[11px] tracking-[0.28em] text-gpu">
                  SEC.02 // ACTIVE_PROTOCOLS
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-textPrimary sm:text-4xl md:text-5xl">
                <DecodeText text="What We Offer" />
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-textSecondary">
                From first CUDA kernel to portfolio-ready systems.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-8 sm:grid-cols-2">
              {offerings.map((offering, i) => (
                <OfferNode
                  key={offering.node}
                  icon={icons[offering.icon] ?? Cpu}
                  node={offering.node}
                  title={offering.title}
                  description={offering.description}
                  status={offering.status}
                  chips={offering.chips}
                  delay={(i % 2) * 0.12 + Math.floor(i / 2) * 0.1}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

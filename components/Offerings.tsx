"use client";

import {
  Cpu,
  CircuitBoard,
  Boxes,
  Network,
  type LucideIcon,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
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
      className="relative border-t border-line py-28 md:py-40"
      aria-label="What we offer"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            code="SEC.02 // ACTIVE_PROTOCOLS"
            title="What We Offer"
            subtitle="From first CUDA kernel to portfolio-ready systems."
          />
        </Reveal>

        <ul className="grid gap-6 sm:grid-cols-2">
          {offerings.map((offering, i) => (
            <OfferNode
              key={offering.node}
              icon={icons[offering.icon] ?? Cpu}
              node={offering.node}
              title={offering.title}
              description={offering.description}
              status={offering.status}
              chips={offering.chips}
              delay={(i % 2) * 0.1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

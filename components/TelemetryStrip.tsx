"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import TerminalCard from "@/components/TerminalCard";
import TerminalLog from "@/components/TerminalLog";
import { telemetryStats, terminalLines, marqueeTerms } from "@/data/telemetry";

export default function TelemetryStrip() {
  return (
    <section aria-label="Live telemetry" className="relative border-y border-line">
      {/* capability marquee */}
      <div
        className="overflow-hidden border-b border-line bg-graphite/60 py-2.5"
        aria-hidden
      >
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...marqueeTerms, ...marqueeTerms].map((term, i) => (
            <span
              key={`${term}-${i}`}
              className="flex items-center gap-8 font-mono text-[10px] tracking-[0.28em] text-textMuted"
            >
              {term}
              <span className="text-gpu/60">//</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-site px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-4 lg:grid-cols-[1.6fr,1fr]">
          {/* stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {telemetryStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={i === 4 ? "col-span-2 sm:col-span-1" : ""}
              >
                <TerminalCard
                  label={stat.label}
                  className="h-full"
                  contentClassName="flex flex-col justify-center p-4"
                  beam
                >
                  <p className="font-display text-lg font-bold leading-snug text-mint">
                    {typeof stat.count === "number" ? (
                      <CountUp to={stat.count} suffix={stat.suffix} />
                    ) : (
                      <span className="text-sm leading-tight text-textPrimary sm:text-base">
                        {stat.value}
                      </span>
                    )}
                  </p>
                </TerminalCard>
              </motion.div>
            ))}
          </div>

          {/* terminal */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <TerminalLog lines={terminalLines} className="h-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

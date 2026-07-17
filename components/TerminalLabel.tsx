"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TerminalLabelProps = {
  label: string;
  /** absolute-positioning utility classes, e.g. "left-8 top-1/3" */
  className?: string;
  /** which side the connecting line extends toward the GPU */
  align?: "left" | "right";
  delay?: number;
};

/**
 * Floating HUD micro-label with a thin line reaching toward the GPU —
 * the hero's "compute beam" dressing (CUDA_KERNELS, GPU_ARCH, ...).
 * Desktop-only; hidden on small screens to keep the hero uncluttered.
 */
export default function TerminalLabel({
  label,
  className,
  align = "left",
  delay = 0,
}: TerminalLabelProps) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute z-10 hidden items-center gap-2 lg:flex",
        className
      )}
      initial={{ opacity: 0, x: align === "left" ? -14 : 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.21, 0.65, 0.36, 1] }}
    >
      {align === "right" && (
        <span
          aria-hidden
          className="h-px w-12 bg-gradient-to-l from-gpu/60 to-transparent"
        />
      )}
      <span className="rounded-sm border border-line bg-obsidian/50 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-mint backdrop-blur-sm">
        {label}
      </span>
      {align === "left" && (
        <span
          aria-hidden
          className="h-px w-12 bg-gradient-to-r from-gpu/60 to-transparent"
        />
      )}
    </motion.div>
  );
}

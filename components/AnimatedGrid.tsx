"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useSharedScrollProgress } from "@/lib/scroll-context";
import { cn } from "@/lib/utils";

type AnimatedGridProps = {
  className?: string;
  /** grid cell size in px */
  size?: number;
  /** slowly pans the grid diagonally */
  animate?: boolean;
  /** fade the grid out towards the edges */
  masked?: boolean;
  /** ties grid scale/opacity to page scroll — a subtle sense of depth as sections pass (Grid Depth Shift) */
  depthShift?: boolean;
};

/** Compute-node grid overlay. Purely decorative. */
export default function AnimatedGrid({
  className,
  size = 48,
  animate = true,
  masked = true,
  depthShift = false,
}: AnimatedGridProps) {
  // Reads the page's shared scroll value (from ScrollProgressProvider)
  // instead of starting a second independent scroll listener; falls back
  // to a static value so this component still works standalone/unwrapped.
  const shared = useSharedScrollProgress();
  const fallback = useMotionValue(0);
  const scrollYProgress = shared ?? fallback;
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0.3]);

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-node-grid",
        animate && "animate-grid-pan",
        className
      )}
      style={{
        backgroundSize: `${size}px ${size}px`,
        ...(depthShift ? { scale, opacity } : {}),
        ...(masked
          ? {
              maskImage:
                "radial-gradient(ellipse 75% 65% at 50% 40%, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 65% at 50% 40%, black 30%, transparent 75%)",
            }
          : {}),
      }}
    />
  );
}

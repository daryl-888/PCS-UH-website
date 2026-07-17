"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll();
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

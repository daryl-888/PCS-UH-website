import { cn } from "@/lib/utils";

type AnimatedGridProps = {
  className?: string;
  /** grid cell size in px */
  size?: number;
  /** slowly pans the grid diagonally */
  animate?: boolean;
  /** fade the grid out towards the edges */
  masked?: boolean;
};

/** Compute-node grid overlay. Purely decorative. */
export default function AnimatedGrid({
  className,
  size = 48,
  animate = true,
  masked = true,
}: AnimatedGridProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-node-grid",
        animate && "animate-grid-pan",
        className
      )}
      style={{
        backgroundSize: `${size}px ${size}px`,
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

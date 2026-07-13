import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  label: string;
  tone?: "green" | "cyan" | "amber" | "red";
  pulse?: boolean;
  className?: string;
};

const toneStyles: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  green: "text-gpu border-gpu/40 bg-gpu/10",
  cyan: "text-holo border-holo/40 bg-holo/10",
  amber: "text-amber-300 border-amber-300/40 bg-amber-300/10",
  red: "text-uhred border-uhred/40 bg-uhred/10",
};

const dotStyles: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  green: "bg-gpu",
  cyan: "bg-holo",
  amber: "bg-amber-300",
  red: "bg-uhred",
};

/** Monospace HUD badge like `[CUDA_STREAM_ACTIVE]` with a pulsing status dot. */
export default function StatusBadge({
  label,
  tone = "green",
  pulse = true,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-2.5 py-1",
        "font-mono text-[10px] uppercase tracking-[0.18em]",
        toneStyles[tone],
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          dotStyles[tone],
          pulse && "animate-pulse-dot"
        )}
        aria-hidden
      />
      {label}
    </span>
  );
}

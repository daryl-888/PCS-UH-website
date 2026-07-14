import { cn } from "@/lib/utils";

type TerminalTitlebarProps = {
  label: string;
  className?: string;
};

/** macOS-style terminal window chrome: traffic-light dots + a mono label. */
export default function TerminalTitlebar({
  label,
  className,
}: TerminalTitlebarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-line px-4 py-2",
        className
      )}
    >
      <span className="font-mono text-[10px] tracking-[0.24em] text-textMuted">
        {label}
      </span>
      <span className="flex gap-1.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-uhred/70" />
        <span className="h-2 w-2 rounded-full bg-amber-300/70" />
        <span className="h-2 w-2 rounded-full bg-gpu/80" />
      </span>
    </div>
  );
}

import TerminalTitlebar from "@/components/TerminalTitlebar";
import { cn } from "@/lib/utils";

type TerminalCardProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
  contentClassName?: string;
};

/** Pure-black mac-terminal-style window: traffic-light titlebar + black content pane. */
export default function TerminalCard({
  children,
  label,
  className,
  contentClassName,
}: TerminalCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-line bg-black transition-all duration-300 hover:border-lineActive hover:shadow-glow",
        className
      )}
    >
      <TerminalTitlebar label={label} />
      <div className={cn("bg-black", contentClassName)}>{children}</div>
    </div>
  );
}

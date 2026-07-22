import TerminalTitlebar from "@/components/TerminalTitlebar";
import { cn } from "@/lib/utils";

type TerminalCardProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
  contentClassName?: string;
  /** adds HUD corner brackets */
  corners?: boolean;
  /** adds the sweeping light beam on hover */
  beam?: boolean;
};

/** Pure-black mac-terminal-style window: traffic-light titlebar + black content pane. */
export default function TerminalCard({
  children,
  label,
  className,
  contentClassName,
  corners = false,
  beam = false,
}: TerminalCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-line bg-black transition-all duration-300 hover:border-lineActive hover:shadow-glow",
        corners && "hud-corners",
        className
      )}
    >
      {beam ? (
        <span className="beam-track" aria-hidden>
          <span className="beam" />
        </span>
      ) : null}
      <TerminalTitlebar label={label} />
      <div className={cn("bg-black", contentClassName)}>{children}</div>
    </div>
  );
}

import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  /** adds HUD corner brackets */
  corners?: boolean;
  /** adds the sweeping light beam on hover (requires `group` behavior, added here) */
  beam?: boolean;
  as?: "div" | "article" | "li";
};

/** Frosted glass panel with thin neon border — the base surface of the site. */
export default function GlassCard({
  children,
  className,
  corners = false,
  beam = false,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "group relative rounded-md border border-line bg-panel backdrop-blur-md",
        "transition-all duration-300",
        "hover:border-lineActive hover:shadow-glow",
        corners && "hud-corners",
        className
      )}
    >
      {beam ? (
        <span className="beam-track" aria-hidden>
          <span className="beam" />
        </span>
      ) : null}
      {children}
    </Tag>
  );
}

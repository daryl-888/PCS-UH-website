import { cn } from "@/lib/utils";

type SectionLabelProps = {
  code: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
};

/**
 * Section header: monospace system code + large display title,
 * framed by ruler lines like a lab instrument readout.
 */
export default function SectionLabel({
  code,
  title,
  subtitle,
  className,
  align = "left",
}: SectionLabelProps) {
  return (
    <header
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-8 bg-lineActive" aria-hidden />
        <span className="font-mono text-[11px] tracking-[0.28em] text-gpu">
          {code}
        </span>
        <span className="h-px flex-1 max-w-24 bg-line" aria-hidden />
      </div>
      <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-textPrimary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-textSecondary",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

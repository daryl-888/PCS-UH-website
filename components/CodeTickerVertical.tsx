import { cn } from "@/lib/utils";
import { cudaTokens } from "@/data/cudaSnippets";

type CodeTickerVerticalProps = {
  className?: string;
  /** scrolls upward instead of the default downward */
  reverse?: boolean;
};

/** Thin edge rail of vertically-scrolling CUDA tokens — the vertical
 *  counterpart to CodeTicker, meant to sit at a section's outer edge
 *  (outside the max-w-site content column) so it never covers copy or the
 *  GPU render showing through the section's empty column. Desktop-only:
 *  there's no spare edge width for it once the layout stacks on mobile. */
export default function CodeTickerVertical({ className, reverse = false }: CodeTickerVerticalProps) {
  const items = [...cudaTokens, ...cudaTokens];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 z-0 hidden w-8 overflow-hidden opacity-[0.35] xl:block",
        className
      )}
    >
      <div
        className={cn(
          "flex h-max flex-col items-center gap-7 whitespace-nowrap py-4 animate-marquee-y",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {items.map((token, i) => (
          <span
            key={i}
            className="font-mono text-[9px] tracking-[0.06em] text-mint [writing-mode:vertical-rl]"
          >
            {token}
          </span>
        ))}
      </div>
    </div>
  );
}

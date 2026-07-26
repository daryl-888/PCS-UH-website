import { cn } from "@/lib/utils";
import { cudaSnippets, CUDA_KEYWORDS, CUDA_CALLS } from "@/data/cudaSnippets";

type CodeTickerProps = {
  className?: string;
  /** scrolls left-to-right instead of the default right-to-left, for visual
   *  variety when more than one ticker appears on the same page */
  reverse?: boolean;
};

const ALL_TOKENS = [...CUDA_KEYWORDS, ...CUDA_CALLS];
const TOKEN_RE = new RegExp(`\\b(${ALL_TOKENS.join("|")})\\b`, "g");
const KEYWORD_SET = new Set(CUDA_KEYWORDS);
const CALL_SET = new Set(CUDA_CALLS);

/** Splits a code line on known CUDA keywords/API calls and colors each
 *  class differently — cheap, regex-based syntax highlighting, not a full
 *  tokenizer, which is all a decorative ticker needs. */
function highlightLine(line: string) {
  return line.split(TOKEN_RE).map((part, i) => {
    if (KEYWORD_SET.has(part)) {
      return (
        <span key={i} className="text-holo">
          {part}
        </span>
      );
    }
    if (CALL_SET.has(part)) {
      return (
        <span key={i} className="text-mint">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/** Infinite-scrolling strip of real CUDA syntax — decorative, threaded
 *  between landing-page sections to keep the "live compute cluster" feel
 *  going between the heavier 3D/terminal set pieces. Pure CSS animation
 *  (the existing `animate-marquee` keyframe), so it costs nothing beyond
 *  paint — no JS animation loop. */
export default function CodeTicker({ className, reverse = false }: CodeTickerProps) {
  const items = [...cudaSnippets, ...cudaSnippets];

  return (
    <div
      aria-hidden
      className={cn("overflow-hidden border-y border-line bg-graphite/50 py-2.5", className)}
    >
      <div
        className={cn(
          "flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-[11px] text-textSecondary sm:text-xs",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {items.map((line, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            {highlightLine(line)}
            <span className="text-gpu/50">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}

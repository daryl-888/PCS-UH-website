"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%_/\\";

type DecodeTextProps = {
  text: string;
  className?: string;
  /** ms per scramble tick */
  speed?: number;
  /** seconds to wait before starting */
  delay?: number;
};

/**
 * Scramble-flicker heading text — the "Terminal Decode Text" transition.
 * Starts showing the real text (matches SSR, safe for no-JS/crawlers),
 * then flickers to glyphs and resolves back once it enters the viewport.
 * Renders a plain inline <span>; wrap it in whatever heading tag is needed.
 */
export default function DecodeText({
  text,
  className,
  speed = 26,
  delay = 0,
}: DecodeTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView || reduced) return;
    let tickTimer: ReturnType<typeof setTimeout>;
    let frame = 0;
    const totalFrames = Math.max(text.length * 2, 8);

    const startTimer = setTimeout(() => {
      const tick = () => {
        frame++;
        const revealCount = Math.floor((frame / totalFrames) * text.length);
        setDisplay(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              return i < revealCount
                ? ch
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );
        if (frame < totalFrames) {
          tickTimer = setTimeout(tick, speed);
        } else {
          setDisplay(text);
        }
      };
      tick();
    }, delay * 1000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(tickTimer);
    };
  }, [inView, reduced, text, speed, delay]);

  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text}>
      {display}
    </span>
  );
}

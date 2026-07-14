"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import TerminalTitlebar from "@/components/TerminalTitlebar";

type TerminalLogProps = {
  lines: string[];
  className?: string;
  /** ms between lines appearing */
  interval?: number;
  loop?: boolean;
};

/** Fake terminal that types out log lines one by one when in view. */
export default function TerminalLog({
  lines,
  className,
  interval = 900,
  loop = true,
}: TerminalLogProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVisible(lines.length);
      return;
    }
    const id = setInterval(() => {
      setVisible((v) => {
        if (v >= lines.length) return loop ? 1 : v;
        return v + 1;
      });
    }, interval);
    return () => clearInterval(id);
  }, [inView, interval, lines.length, loop, reduced]);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md border border-line bg-obsidian/80 font-mono text-xs",
        className
      )}
      role="log"
      aria-label="System activity log"
    >
      <TerminalTitlebar label="PCS://ACTIVITY_STREAM" />
      <div className="min-h-[132px] space-y-1.5 px-4 py-3">
        {lines.slice(0, visible).map((line) => (
          <p key={line} className="text-textSecondary">
            <span className="mr-2 text-gpu">›</span>
            {line}
          </p>
        ))}
        <p className="terminal-cursor text-gpu" aria-hidden>
          $
        </p>
      </div>
    </div>
  );
}

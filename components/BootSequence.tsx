"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

const BOOT_LINES = [
  "PCS_BIOS v4.2.1 — UNIVERSITY OF HOUSTON",
  "detecting compute devices ............ [ OK ]",
  "device 0: STUDENT_CURIOSITY (∞ cores)",
  "allocating shared memory ............. [ OK ]",
  "launching kernel <<<grid, block>>> ... [ OK ]",
  "synchronizing 1024 threads ........... [ OK ]",
  "mounting /parallel/future ............ [ OK ]",
];

/**
 * Terminal POST sequence shown once per session on first load.
 * Skippable with any key / click. Skipped entirely for reduced motion.
 */
export default function BootSequence() {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      sessionStorage.setItem("pcs-booted", "1");
    } catch {
      /* storage unavailable — fine */
    }
  }, []);

  // Decide whether to boot (client only, once).
  useEffect(() => {
    let booted = false;
    try {
      booted = sessionStorage.getItem("pcs-booted") === "1";
    } catch {
      booted = false;
    }
    const reducedNow = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!booted && !reducedNow) setShow(true);
  }, []);

  // Type lines + fill progress, then dismiss.
  useEffect(() => {
    if (!show) return;
    const lineTimer = setInterval(() => {
      setLineCount((c) => Math.min(c + 1, BOOT_LINES.length));
    }, 210);
    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 4 + Math.random() * 7, 100));
    }, 70);
    const doneTimer = setTimeout(dismiss, 2300);
    return () => {
      clearInterval(lineTimer);
      clearInterval(progTimer);
      clearTimeout(doneTimer);
    };
  }, [show, dismiss]);

  // Skip on any key / click / touch.
  useEffect(() => {
    if (!show) return;
    const skip = () => dismiss();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [show, dismiss]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-obsidian px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          aria-hidden
        >
          <div className="w-full max-w-lg font-mono text-xs sm:text-sm">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-gpu" />
              <span className="tracking-[0.3em] text-gpu">
                UH_PCS // SYSTEM BOOT
              </span>
            </div>
            <div className="min-h-[168px] space-y-1.5 text-textSecondary">
              {BOOT_LINES.slice(0, lineCount).map((line) => (
                <p key={line}>
                  <span className="mr-2 text-matrix">›</span>
                  {line}
                </p>
              ))}
              <p className="terminal-cursor text-gpu" />
            </div>
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-graphite">
              <div
                className="h-full bg-gradient-to-r from-gpu via-mint to-holo transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 text-center text-[10px] tracking-[0.24em] text-textMuted">
              PRESS ANY KEY TO SKIP
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

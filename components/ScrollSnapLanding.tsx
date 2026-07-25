"use client";

import { useEffect } from "react";

/**
 * Turns on document-level scroll-snap for as long as the landing page is
 * mounted, so each section rests exactly at its SCROLL_STOPS fraction
 * (see GpuModel.tsx) instead of free-scrolling to any point in between —
 * that's what gives the GPU choreography a predictable angle per section.
 * Scoped to the landing page only: toggled on `<html>` on mount, off on
 * unmount, so other routes keep normal free scrolling.
 */
export default function ScrollSnapLanding() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("snap-y", "snap-mandatory");
    return () => {
      root.classList.remove("snap-y", "snap-mandatory");
    };
  }, []);

  return null;
}

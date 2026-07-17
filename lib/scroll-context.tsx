"use client";

import { createContext, useContext } from "react";
import { useScroll, type MotionValue } from "framer-motion";

const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

/**
 * Calls framer-motion's `useScroll()` exactly once for the whole page and
 * shares the resulting 0→1 progress value through context. Without this,
 * every consumer (the GPU scene, the depth-shifting grid, ...) would set up
 * its own independent scroll listener for the same document scroll.
 */
export function ScrollProgressProvider({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  return (
    <ScrollProgressContext.Provider value={scrollYProgress}>
      {children}
    </ScrollProgressContext.Provider>
  );
}

/** The shared page-scroll progress, or `null` if used outside the provider. */
export function useSharedScrollProgress() {
  return useContext(ScrollProgressContext);
}

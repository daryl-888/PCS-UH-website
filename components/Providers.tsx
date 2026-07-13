"use client";

import { MotionConfig } from "framer-motion";

/** Global motion config: honors the user's reduced-motion preference. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

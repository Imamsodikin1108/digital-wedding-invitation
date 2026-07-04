import type { Transition } from "framer-motion";

export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  hero: 0.8,
  section: 0.6,
} as const;

export const baseTransition = (delay = 0, duration = DURATION.section): Transition => ({
  duration,
  delay,
  ease: EASE_OUT_EXPO,
});

import type { Variants, Transition, TargetAndTransition } from "framer-motion";

export type AnimationVariant =
  | "fadeIn"
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn"
  | "slideLeft"
  | "slideRight"
  | "revealText";

export interface MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

export interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
}

export interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  amplitude?: number;
  duration?: number;
}

export type { Variants, Transition, TargetAndTransition };

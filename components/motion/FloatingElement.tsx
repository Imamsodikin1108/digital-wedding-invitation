"use client";

import { motion } from "framer-motion";
import type { FloatingElementProps } from "@/types/motion";

export function FloatingElement({
  children,
  className,
  style,
  amplitude = 12,
  duration = 4,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function PulsingElement({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.06, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function RotatingElement({
  children,
  className,
  clockwise = true,
}: {
  children: React.ReactNode;
  className?: string;
  clockwise?: boolean;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        rotate: clockwise ? 360 : -360,
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
}

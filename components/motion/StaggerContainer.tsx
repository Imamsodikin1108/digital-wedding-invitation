"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animation";
import type { StaggerContainerProps } from "@/types/motion";

export function StaggerContainer({
  children,
  className,
  staggerChildren = 0.1,
  delayChildren = 0,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE_OUT_EXPO },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

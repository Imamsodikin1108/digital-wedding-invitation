"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animation";
import type { MotionProps } from "@/types/motion";

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.2,
}: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
}: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

export function FadeDown({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
}: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.2,
}: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

export function SlideLeft({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
}: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

export function SlideRight({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
}: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

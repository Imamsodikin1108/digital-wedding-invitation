"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const cardVariants = cva(
  [
    "rounded-[2rem] transition-all duration-300",
    "border border-[var(--border)]",
  ],
  {
    variants: {
      variant: {
        default: "bg-[var(--card)] shadow-[var(--shadow-soft)]",
        glass: "glass shadow-[var(--shadow-medium)]",
        elevated: "bg-[var(--card)] shadow-[var(--shadow-large)]",
        ghost: "bg-transparent border-transparent",
      },
      padding: {
        none: "",
        sm: "p-5",
        md: "p-8",
        lg: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hoverable?: boolean;
}

export function Card({
  className,
  variant,
  padding,
  hoverable = false,
  children,
  ...props
}: CardProps) {
  if (hoverable) {
    return (
      <motion.div
        className={cn(cardVariants({ variant, padding }), className)}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn(cardVariants({ variant, padding }), className)} {...props}>
      {children}
    </div>
  );
}

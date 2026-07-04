"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-jakarta font-medium tracking-[0.06em]",
    "rounded-full transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
    "disabled:opacity-50 disabled:pointer-events-none",
    "select-none cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-gold text-white shadow-[var(--shadow-gold)]",
          "hover:shadow-[0_6px_32px_0_rgba(198,169,105,0.4)]",
        ],
        secondary: [
          "border border-gold text-gold bg-transparent",
          "hover:bg-gold hover:text-white",
        ],
        ghost: [
          "text-foreground bg-transparent",
          "hover:text-gold hover:bg-[var(--muted)]",
        ],
        glass: [
          "glass text-foreground border-[var(--glass-border)]",
          "hover:bg-[var(--glass-bg)]",
        ],
        outline: [
          "border border-[var(--border)] text-foreground bg-transparent",
          "hover:border-gold hover:text-gold",
        ],
      },
      size: {
        sm: "h-9 px-5 text-sm",
        md: "h-11 px-7 text-base",
        lg: "h-13 px-9 text-base",
        xl: "h-15 px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full h-12 px-4 rounded-xl bg-[var(--muted)] border font-jakarta text-sm text-[var(--foreground)]",
        "placeholder:text-[var(--muted-foreground)] transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent",
        error ? "border-rose" : "border-[var(--border)]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-xl bg-[var(--muted)] border font-jakarta text-sm text-[var(--foreground)]",
        "placeholder:text-[var(--muted-foreground)] resize-none transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent",
        error ? "border-rose" : "border-[var(--border)]",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

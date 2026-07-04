"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", icon: Sun, label: "Light theme" },
  { value: "dark", icon: Moon, label: "Dark theme" },
  { value: "system", icon: Monitor, label: "System theme" },
];

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-10 h-10 rounded-full bg-[var(--muted)] animate-pulse",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const currentTheme = themes.find((t) => t.value === theme) ?? themes[2];
  const isDark = resolvedTheme === "dark";

  function cycleTheme() {
    const current = themes.findIndex((t) => t.value === theme);
    const next = themes[(current + 1) % themes.length];
    setTheme(next.value);
  }

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        "relative w-10 h-10 rounded-full",
        "flex items-center justify-center",
        "glass border border-[var(--border)]",
        "text-[var(--muted-foreground)] hover:text-gold",
        "transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        className
      )}
      aria-label={`Switch theme. Current: ${currentTheme.label}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {isDark ? (
            <Moon className="w-4 h-4" />
          ) : theme === "system" ? (
            <Monitor className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </motion.div>
      </AnimatePresence>

      {showLabel && (
        <span className="ml-2 font-jakarta text-sm">{currentTheme.label}</span>
      )}
    </button>
  );
}

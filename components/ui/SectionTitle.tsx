import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion";
import { COLORS } from "@/lib/tokens";

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
  titleClassName?: string;
}

function MiniGunungan() {
  return (
    <svg width="20" height="28" viewBox="0 0 20 28" fill="none" aria-hidden="true">
      <path d="M10 1 L18 10 L18 26 L2 26 L2 10 Z" stroke={COLORS.gold} strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M10 5 L15 11 L15 23 L5 23 L5 11 Z" stroke={COLORS.gold} strokeWidth="0.7" fill="none" opacity="0.4" />
      <circle cx="10" cy="1" r="1.5" fill={COLORS.gold} opacity="0.8" />
      <line x1="10" y1="5" x2="10" y2="23" stroke={COLORS.gold} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function SectionTitle({
  label,
  title,
  subtitle,
  className,
  align = "center",
  titleClassName,
}: SectionTitleProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className={cn("flex flex-col gap-4", alignClass, className)}>
      {label && (
        <FadeUp delay={0}>
          <span className="font-cinzel text-gold text-xs tracking-[0.2em] uppercase">
            {label}
          </span>
        </FadeUp>
      )}

      <FadeUp delay={0.1}>
        <h2
          className={cn(
            "font-cormorant font-semibold text-[var(--foreground)]",
            "text-4xl md:text-5xl lg:text-[3rem]",
            "leading-[1.2] tracking-[-0.02em]",
            titleClassName
          )}
        >
          {title}
        </h2>
      </FadeUp>

      <FadeUp delay={0.05}>
        <div className="flex items-center gap-3 justify-center">
          <div className="h-px w-10 bg-gold opacity-40" />
          <MiniGunungan />
          <div className="h-px w-10 bg-gold opacity-40" />
        </div>
      </FadeUp>

      {subtitle && (
        <FadeUp delay={0.2}>
          <p className="font-jakarta text-[var(--muted-foreground)] text-base md:text-lg max-w-xl">
            {subtitle}
          </p>
        </FadeUp>
      )}
    </div>
  );
}

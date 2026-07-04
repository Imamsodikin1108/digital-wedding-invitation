import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  variant?: "line" | "ornament" | "dots" | "gunungan";
}

function GununganMini({ color = "#c6a969" }: { color?: string }) {
  return (
    <svg width="24" height="34" viewBox="0 0 24 34" fill="none" aria-hidden="true">
      <path d="M12 2 L22 13 L22 31 L2 31 L2 13 Z" stroke={color} strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M12 6 L18 14 L18 27 L6 27 L6 14 Z" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M12 10 L15 15 L15 24 L9 24 L9 15 Z" stroke={color} strokeWidth="0.5" fill="none" opacity="0.35" />
      <circle cx="12" cy="2" r="2" fill={color} opacity="0.9" />
      <circle cx="12" cy="18.5" r="3" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
      <circle cx="12" cy="18.5" r="1" fill={color} opacity="0.7" />
      <line x1="12" y1="10" x2="12" y2="27" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function Divider({ className, variant = "ornament" }: DividerProps) {
  if (variant === "line") {
    return (
      <div
        className={cn(
          "w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-30",
          className
        )}
        role="separator"
        aria-hidden="true"
      />
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn("flex items-center justify-center gap-2", className)}
        role="separator"
        aria-hidden="true"
      >
        <div className="w-1 h-1 rounded-full bg-gold opacity-40" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-60" />
        <div className="w-2 h-2 rounded-full bg-gold" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-60" />
        <div className="w-1 h-1 rounded-full bg-gold opacity-40" />
      </div>
    );
  }

  if (variant === "gunungan") {
    return (
      <div
        className={cn("flex items-center justify-center gap-3", className)}
        role="separator"
        aria-hidden="true"
      >
        <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-gold opacity-35" />
        <div className="h-px w-6 bg-gold opacity-35" />
        <GununganMini />
        <div className="h-px w-6 bg-gold opacity-35" />
        <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-gold opacity-35" />
      </div>
    );
  }

  // ornament — batik kawung center motif
  return (
    <div
      className={cn("flex items-center justify-center gap-4", className)}
      role="separator"
      aria-hidden="true"
    >
      <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold opacity-40" />
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        {/* Kawung center motif */}
        <ellipse cx="11" cy="5.5" rx="3" ry="4.5" stroke="#c6a969" strokeWidth="1" fill="none" opacity="0.8" />
        <ellipse cx="11" cy="16.5" rx="3" ry="4.5" stroke="#c6a969" strokeWidth="1" fill="none" opacity="0.8" />
        <ellipse cx="5.5" cy="11" rx="4.5" ry="3" stroke="#c6a969" strokeWidth="1" fill="none" opacity="0.8" />
        <ellipse cx="16.5" cy="11" rx="4.5" ry="3" stroke="#c6a969" strokeWidth="1" fill="none" opacity="0.8" />
        <circle cx="11" cy="11" r="2" fill="#c6a969" opacity="0.9" />
      </svg>
      <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gold opacity-40" />
    </div>
  );
}

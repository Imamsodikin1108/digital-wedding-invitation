import { cn } from "@/lib/utils";

interface OrnamentProps {
  className?: string;
  size?: number;
  color?: string;
}

export function BatikKawung({
  className,
  size = 200,
  color = "currentColor",
}: OrnamentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={cn("ornament", className)}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <pattern id="kawung" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <ellipse cx="10" cy="5" rx="4" ry="3.5" stroke={color} strokeWidth="0.8" fill="none" />
          <ellipse cx="10" cy="15" rx="4" ry="3.5" stroke={color} strokeWidth="0.8" fill="none" />
          <ellipse cx="5" cy="10" rx="3.5" ry="4" stroke={color} strokeWidth="0.8" fill="none" />
          <ellipse cx="15" cy="10" rx="3.5" ry="4" stroke={color} strokeWidth="0.8" fill="none" />
          <circle cx="10" cy="10" r="1.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#kawung)" />
    </svg>
  );
}

export function BatikParang({
  className,
  size = 200,
  color = "currentColor",
}: OrnamentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={cn("ornament", className)}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <pattern id="parang" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M0 12 Q6 0 12 12 Q18 24 24 12"
            stroke={color}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M0 24 Q6 12 12 24 Q18 36 24 24"
            stroke={color}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M12 0 Q0 6 12 12 Q24 18 12 24"
            stroke={color}
            strokeWidth="0.6"
            fill="none"
            opacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#parang)" />
    </svg>
  );
}

export function FloralJava({
  className,
  size = 120,
  color = "currentColor",
}: OrnamentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={cn("ornament", className)}
      aria-hidden="true"
      role="presentation"
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 60 60)`}>
          <ellipse cx="60" cy="30" rx="6" ry="14" fill={color} />
          <ellipse cx="60" cy="28" rx="3" ry="10" fill={color} opacity="0.5" />
        </g>
      ))}
      <circle cx="60" cy="60" r="8" fill={color} />
      <circle cx="60" cy="60" r="4" fill={color} opacity="0.6" />
    </svg>
  );
}

export function Gunungan({
  className,
  size = 160,
  color = "currentColor",
}: OrnamentProps) {
  return (
    <svg
      width={size}
      height={(size * 4) / 3}
      viewBox="0 0 120 160"
      fill="none"
      className={cn("ornament", className)}
      aria-hidden="true"
      role="presentation"
    >
      {/* Outer frame */}
      <path d="M60 8 L108 80 L108 148 L12 148 L12 80 Z" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M60 20 L100 82 L100 140 L20 140 L20 82 Z" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M60 34 L92 85 L92 132 L28 132 L28 85 Z" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Cross lines */}
      <line x1="60" y1="34" x2="60" y2="132" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="28" y1="85" x2="92" y2="85" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Decorative inner diamond grid */}
      <path d="M60 50 L72 85 L60 120 L48 85 Z" stroke={color} strokeWidth="0.6" fill="none" opacity="0.3" />
      {/* Apex jewel */}
      <circle cx="60" cy="8" r="4" fill={color} />
      <circle cx="60" cy="85" r="6" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="60" cy="85" r="2" fill={color} opacity="0.6" />
      {/* Base decorative dots */}
      {[24, 36, 48, 60, 72, 84, 96].map((x) => (
        <circle key={x} cx={x} cy="144" r="1" fill={color} opacity="0.4" />
      ))}
    </svg>
  );
}

export function CornerOrnament({
  className,
  size = 80,
  color = "currentColor",
}: OrnamentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={cn("ornament", className)}
      aria-hidden="true"
      role="presentation"
    >
      <path d="M4 4 L40 4 Q4 4 4 40" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M4 4 L4 40 Q4 4 40 4" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
      <circle cx="4" cy="4" r="3" fill={color} />
      <circle cx="40" cy="4" r="2" fill={color} opacity="0.5" />
      <circle cx="4" cy="40" r="2" fill={color} opacity="0.5" />
      {[12, 20, 28, 36].map((pos) => (
        <circle key={pos} cx={pos} cy="4" r="0.8" fill={color} opacity="0.4" />
      ))}
      {[12, 20, 28, 36].map((pos) => (
        <circle key={pos} cx="4" cy={pos} r="0.8" fill={color} opacity="0.4" />
      ))}
    </svg>
  );
}

/** Wayang Gunungan silhouette — bold filled version for large background decorations */
export function WayangGunungan({
  className,
  size = 200,
  color = "currentColor",
}: OrnamentProps) {
  return (
    <svg
      width={size}
      height={(size * 5) / 3}
      viewBox="0 0 120 200"
      fill="none"
      className={cn("ornament", className)}
      aria-hidden="true"
      role="presentation"
    >
      {/* Main silhouette */}
      <path
        d="M60 4 L112 90 L112 188 L8 188 L8 90 Z"
        fill={color}
        opacity="0.12"
      />
      <path
        d="M60 4 L112 90 L112 188 L8 188 L8 90 Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      {/* Inner layers */}
      <path d="M60 18 L104 92 L104 180 L16 180 L16 92 Z" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M60 32 L96 94 L96 172 L24 172 L24 94 Z" stroke={color} strokeWidth="0.7" fill="none" opacity="0.3" />
      {/* Spine */}
      <line x1="60" y1="32" x2="60" y2="172" stroke={color} strokeWidth="1" opacity="0.35" />
      {/* Horizontal bands */}
      {[110, 130, 150].map((y) => (
        <line key={y} x1="24" y1={y} x2="96" y2={y} stroke={color} strokeWidth="0.5" opacity="0.25" />
      ))}
      {/* Apex flame */}
      <path d="M60 4 Q64 0 60 -6 Q56 0 60 4 Z" fill={color} opacity="0.7" />
      <circle cx="60" cy="4" r="3.5" fill={color} opacity="0.9" />
      {/* Center medallion */}
      <circle cx="60" cy="110" r="10" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="60" cy="110" r="5" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
      <circle cx="60" cy="110" r="2" fill={color} opacity="0.6" />
      {/* Base row ornaments */}
      {[20, 32, 44, 60, 76, 88, 100].map((x) => (
        <rect key={x} x={x - 2} y="183" width="4" height="4" transform={`rotate(45 ${x} 185)`} fill={color} opacity="0.3" />
      ))}
    </svg>
  );
}

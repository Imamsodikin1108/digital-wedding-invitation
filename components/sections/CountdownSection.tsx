"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { BatikParang } from "@/components/ornament";
import { useCountdown } from "@/hooks/useCountdown";
import { WEDDING } from "@/constants/wedding";
import { formatNumber } from "@/lib/utils";
import { COLORS } from "@/lib/tokens";

function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <StaggerItem>
      <div className="flex flex-col items-center gap-3 px-4 py-6 sm:px-8 sm:py-8 rounded-[1.5rem] bg-[var(--card)] border border-[var(--border)] shadow-[var(--shadow-soft)] min-w-[80px]">
        <span className="font-cormorant font-semibold text-5xl sm:text-6xl text-[var(--foreground)] leading-none tabular-nums">
          {formatNumber(value)}
        </span>
        <span className="font-cinzel text-gold text-[11px] tracking-[0.18em] uppercase">
          {label}
        </span>
      </div>
    </StaggerItem>
  );
}

export function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(
    WEDDING.dateISO
  );

  return (
    <section
      className="section relative overflow-hidden bg-[var(--secondary)]"
      id="countdown"
      aria-label="Countdown timer"
    >
      {/* Background ornament */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <BatikParang size={500} color={COLORS.gold} className="opacity-[0.04]" />
      </div>

      <div className="container-wedding relative z-10 flex flex-col items-center gap-12">
        <SectionTitle
          label="Menuju Hari Bahagia"
          title="Hitung Mundur"
          subtitle={`${WEDDING.date} · ${WEDDING.events[0]?.address}, ${WEDDING.events[0]?.city}`}
        />

        {isExpired ? (
          <FadeUp>
            <p className="font-cormorant italic text-2xl text-gold text-center">
              Alhamdulillah, hari bahagia telah tiba 🌸
            </p>
          </FadeUp>
        ) : (
          <StaggerContainer
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            staggerChildren={0.1}
          >
            <CountdownUnit value={days} label="Hari" />
            <span
              className="font-cormorant text-gold text-4xl sm:text-5xl mb-4 hidden sm:block"
              aria-hidden="true"
            >
              :
            </span>
            <CountdownUnit value={hours} label="Jam" />
            <span
              className="font-cormorant text-gold text-4xl sm:text-5xl mb-4 hidden sm:block"
              aria-hidden="true"
            >
              :
            </span>
            <CountdownUnit value={minutes} label="Menit" />
            <span
              className="font-cormorant text-gold text-4xl sm:text-5xl mb-4 hidden sm:block"
              aria-hidden="true"
            >
              :
            </span>
            <CountdownUnit value={seconds} label="Detik" />
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}

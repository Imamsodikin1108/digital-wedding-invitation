import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SlideLeft, SlideRight, FadeIn } from "@/components/motion";
import { BatikKawung } from "@/components/ornament";
import { WEDDING } from "@/constants/wedding";
import { COLORS } from "@/lib/tokens";
import type { LoveStoryItem } from "@/types/wedding";
import { cn } from "@/lib/utils";

function TimelineItem({
  item,
  index,
}: {
  item: LoveStoryItem;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const MotionWrapper = isEven ? SlideRight : SlideLeft;

  return (
    <div
      className={cn(
        "relative flex items-start gap-0",
        "flex-col md:flex-row",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Timeline line and dot (desktop) */}
      <div className="hidden md:flex flex-col items-center w-16 shrink-0 pt-1">
        {/* Kawung dot */}
        <div className="relative w-4 h-4 shrink-0 z-10">
          <div className="absolute inset-0 rounded-full bg-gold/20 ring-4 ring-gold/15" />
          <div className="absolute inset-[3px] rounded-full bg-gold" />
        </div>
        {index < WEDDING.loveStory.length - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-gold/30 via-gold/15 to-gold/30 min-h-[120px]" />
        )}
      </div>

      {/* Mobile dot */}
      <div className="flex md:hidden items-center gap-3 mb-4">
        <div className="relative w-3 h-3 shrink-0">
          <div className="absolute inset-0 rounded-full bg-gold/20 ring-4 ring-gold/15" />
          <div className="absolute inset-[2px] rounded-full bg-gold" />
        </div>
        <span className="font-cinzel text-gold text-xs tracking-[0.15em]">
          {item.date}
        </span>
      </div>

      {/* Content */}
      <MotionWrapper
        className={cn(
          "flex-1 mb-12 md:mb-16",
          isEven ? "md:pr-12" : "md:pl-12"
        )}
        delay={index * 0.1}
      >
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2rem] overflow-hidden shadow-[var(--shadow-soft)] group relative">
          {/* Subtle batik corner accent */}
          <div className="absolute top-3 right-3 pointer-events-none opacity-30" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 2 L18 2" stroke={COLORS.gold} strokeWidth="0.8" />
              <path d="M2 2 L2 18" stroke={COLORS.gold} strokeWidth="0.8" />
              <circle cx="2" cy="2" r="1.5" fill={COLORS.gold} />
              {[5, 8, 11, 14].map((x) => (
                <circle key={x} cx={x} cy="2" r="0.5" fill={COLORS.gold} opacity="0.5" />
              ))}
            </svg>
          </div>

          {item.photo && (
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={item.photo}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: item.objectPosition ?? "center center" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 sm:p-8">
            <span className="hidden md:inline-block font-cinzel text-gold text-[10px] tracking-[0.22em] uppercase mb-3">
              {item.date}
            </span>
            <h3 className="font-cormorant font-semibold text-2xl text-[var(--foreground)] mb-3">
              {item.title}
            </h3>
            <p className="font-jakarta text-[var(--muted-foreground)] text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}

export function LoveStory() {
  return (
    <section className="section relative overflow-hidden bg-[var(--secondary)]" id="story" aria-label="Love story">
      {/* Batik kawung background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <BatikKawung size={700} color={COLORS.gold} className="opacity-[0.05]" />
      </div>

      {/* Gold border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" aria-hidden="true" />

      <div className="container-wedding relative z-10">
        <SectionTitle
          label="Perjalanan Cinta"
          title="Kisah Kami"
          subtitle="Setiap pertemuan adalah awal dari sebuah cerita yang indah"
          className="mb-16"
        />

        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line (desktop) */}
          <div
            className="absolute hidden md:block left-8 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent"
            aria-hidden="true"
          />

          {WEDDING.loveStory.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

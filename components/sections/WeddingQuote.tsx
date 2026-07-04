import { FadeIn, ScaleIn } from "@/components/motion";
import { Divider } from "@/components/ui/Divider";
import { BatikKawung, Gunungan } from "@/components/ornament";
import { WEDDING } from "@/constants/wedding";
import { COLORS } from "@/lib/tokens";

export function WeddingQuote() {
  return (
    <section
      className="section relative overflow-hidden bg-[var(--secondary)]"
      id="quote"
      aria-label="Wedding quote"
    >
      {/* Full-area batik pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <BatikKawung size={700} color={COLORS.gold} className="opacity-[0.06]" />
      </div>

      {/* Gunungan kiri */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 pointer-events-none" aria-hidden="true">
        <Gunungan size={200} color={COLORS.gold} className="opacity-[0.08]" />
      </div>
      {/* Gunungan kanan */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true">
        <Gunungan size={200} color={COLORS.gold} className="opacity-[0.08]" />
      </div>

      <div className="container-wedding relative z-10">
        <ScaleIn className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">

          {/* Gunungan divider atas */}
          <Divider variant="gunungan" className="w-80" />

          {/* Quote mark */}
          <span
            className="font-cormorant text-gold text-7xl sm:text-8xl leading-none select-none -mb-2"
            aria-hidden="true"
          >
            &#8220;
          </span>

          {/* Quote text */}
          <FadeIn delay={0.2}>
            <blockquote>
              <p className="font-cormorant italic text-xl sm:text-2xl md:text-3xl text-[var(--foreground)] leading-relaxed tracking-[0.01em]">
                {WEDDING.quote.text}
              </p>
            </blockquote>
          </FadeIn>

          {/* Closing quote mark */}
          <span
            className="font-cormorant text-gold text-7xl sm:text-8xl leading-none select-none self-end -mt-2"
            aria-hidden="true"
          >
            &#8221;
          </span>

          {/* Source */}
          <FadeIn delay={0.4}>
            <cite className="font-cinzel text-gold text-sm tracking-[0.18em] not-italic">
              {WEDDING.quote.source}
            </cite>
          </FadeIn>

          {/* Doa */}
          {WEDDING.quote.doa && (
            <FadeIn delay={0.6}>
              <div className="mt-2 px-6 py-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] max-w-xl">
                <p className="font-jakarta text-sm text-[var(--muted-foreground)] leading-relaxed text-center italic">
                  {WEDDING.quote.doa}
                </p>
              </div>
            </FadeIn>
          )}

          {/* Gunungan divider bawah */}
          <Divider variant="gunungan" className="w-80" />
        </ScaleIn>
      </div>
    </section>
  );
}

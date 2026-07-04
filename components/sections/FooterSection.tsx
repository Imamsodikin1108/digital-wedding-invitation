import { Divider } from "@/components/ui/Divider";
import { FadeIn } from "@/components/motion";
import { CornerOrnament } from "@/components/ornament";
import { WEDDING } from "@/constants/wedding";
import { COLORS } from "@/lib/tokens";

export function FooterSection() {
  return (
    <footer className="relative bg-[var(--background)] overflow-hidden" aria-label="Footer">
      {/* Corner ornaments */}
      <div className="absolute top-0 left-0 pointer-events-none" aria-hidden="true">
        <CornerOrnament size={100} color={COLORS.gold} />
      </div>
      <div
        className="absolute top-0 right-0 rotate-90 pointer-events-none"
        aria-hidden="true"
      >
        <CornerOrnament size={100} color={COLORS.gold} />
      </div>

      <div className="container-wedding py-16 sm:py-20 flex flex-col items-center gap-8">
        {/* Top divider */}
        <FadeIn className="w-full max-w-xs">
          <Divider variant="ornament" />
        </FadeIn>

        {/* Names */}
        <FadeIn delay={0.1}>
          <div className="text-center flex flex-col items-center gap-2">
            <span className="font-cinzel text-gold text-[10px] tracking-[0.25em] uppercase">
              The Wedding of
            </span>
            <h2 className="font-cormorant font-light text-4xl sm:text-5xl text-[var(--foreground)]">
              {WEDDING.groom.nickname}{" "}
              <span className="text-gold">&amp;</span>{" "}
              {WEDDING.bride.nickname}
            </h2>
            <p className="font-jakarta text-[var(--muted-foreground)] text-sm">
              {WEDDING.date}
            </p>
          </div>
        </FadeIn>

        {/* Closing message */}
        <FadeIn delay={0.2} className="max-w-md text-center">
          <p className="font-cormorant italic text-lg text-[var(--muted-foreground)] leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
          <p className="font-jakarta text-sm text-[var(--muted-foreground)] mt-4">
            Terima kasih atas doa dan restunya.
          </p>
        </FadeIn>

        {/* Couple names sign */}
        <FadeIn delay={0.3}>
          <div className="flex items-center gap-4">
            <span className="font-cormorant font-semibold text-2xl text-[var(--foreground)]">
              {WEDDING.groom.nickname}
            </span>
            <span className="font-cinzel text-gold text-2xl">&amp;</span>
            <span className="font-cormorant font-semibold text-2xl text-[var(--foreground)]">
              {WEDDING.bride.nickname}
            </span>
          </div>
        </FadeIn>

        {/* Bottom divider */}
        <FadeIn delay={0.4} className="w-full max-w-xs">
          <Divider variant="ornament" />
        </FadeIn>

        {/* Copyright */}
        <FadeIn delay={0.5}>
          <p className="font-jakarta text-[var(--muted-foreground)] text-xs text-center">
            &copy; {new Date().getFullYear()} Digital Wedding Invitation Platform
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}

import Image from "next/image";
import { InstagramIcon } from "@/components/ui/icons/InstagramIcon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Divider } from "@/components/ui/Divider";
import { FadeUp, SlideLeft, SlideRight } from "@/components/motion";
import { BatikParang, CornerOrnament } from "@/components/ornament";
import { WEDDING } from "@/constants/wedding";
import { COLORS } from "@/lib/tokens";
import type { Person } from "@/types/wedding";

function PersonCard({
  person,
  direction,
}: {
  person: Person;
  direction: "left" | "right";
}) {
  const MotionWrapper = direction === "left" ? SlideRight : SlideLeft;

  return (
    <MotionWrapper className="flex flex-col items-center gap-6 text-center">
      {/* Photo */}
      <div className="relative">
        {/* Corner ornament */}
        <div className="absolute -top-3 -left-3 z-10 pointer-events-none">
          <CornerOrnament size={40} color={COLORS.gold} className="opacity-60" />
        </div>
        <div className="absolute -bottom-3 -right-3 z-10 pointer-events-none rotate-180">
          <CornerOrnament size={40} color={COLORS.gold} className="opacity-60" />
        </div>

        <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] rounded-[2rem] overflow-hidden shadow-[var(--shadow-large)]">
          <Image
            src={person.photo}
            alt={`Foto ${person.fullName}`}
            fill
            className="object-cover object-top transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 288px, 320px"
          />
        </div>
        {/* Gold border accent */}
        <div className="absolute -inset-1 rounded-[2.25rem] border border-gold/25 pointer-events-none" />
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-cormorant font-semibold text-3xl text-[var(--foreground)] tracking-[-0.01em]">
          {person.name}
        </h3>
        <p className="font-jakarta text-sm text-[var(--muted-foreground)]">
          {person.fullName}
        </p>
      </div>

      {/* Instagram */}
      {person.instagram && (
        <a
          href={`https://instagram.com/${person.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors font-jakarta text-sm group"
          aria-label={`Instagram ${person.name}`}
        >
          <InstagramIcon className="w-4 h-4" />
          <span className="group-hover:underline">@{person.instagram}</span>
        </a>
      )}

      {/* Parents */}
      <div className="flex flex-col gap-1 max-w-xs">
        <p className="font-cinzel text-[10px] text-gold tracking-[0.2em] uppercase">
          {person.nickname}, {person.role === "groom" ? "Putra" : "Putri"} dari
        </p>
        <p className="font-jakarta text-sm text-[var(--foreground)]">
          {person.parents.father}
        </p>
        <p className="font-jakarta text-sm text-[var(--foreground)]">
          &amp; {person.parents.mother}
        </p>
      </div>
    </MotionWrapper>
  );
}

export function BrideGroom() {
  return (
    <section
      className="section relative overflow-hidden bg-[var(--background)]"
      id="couple"
      aria-label="Couple section"
    >
      {/* Batik parang background — full coverage */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <BatikParang size={800} color={COLORS.sogan} className="opacity-[0.04] w-full h-full" />
      </div>

      {/* Top border ornament line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden="true" />

      <div className="container-wedding relative z-10">
        <SectionTitle
          label="Yang Berbahagia"
          title="Mempelai"
          subtitle="Dua jiwa yang dipersatukan dalam ikatan suci pernikahan"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 lg:gap-12 items-center">
          <PersonCard person={WEDDING.groom} direction="left" />

          {/* Center ampersand — selalu di tengah antara kedua mempelai
              (vertikal di desktop, horizontal di mobile) */}
          <FadeUp className="flex flex-col items-center gap-3 md:gap-5" delay={0.2}>
            <div className="hidden md:block h-16 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            <div className="md:hidden h-px w-16 bg-gold/25" />
            <span className="font-cinzel text-gold text-3xl">&amp;</span>
            <Divider variant="gunungan" className="hidden md:flex w-8 flex-col rotate-90" />
            <div className="hidden md:block h-16 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            <div className="md:hidden h-px w-16 bg-gold/25" />
          </FadeUp>

          <PersonCard person={WEDDING.bride} direction="right" />
        </div>
      </div>
    </section>
  );
}

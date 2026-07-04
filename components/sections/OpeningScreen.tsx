"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FloatingElement } from "@/components/motion/FloatingElement";
import { WayangGunungan } from "@/components/ornament";
import { useMusicStore } from "@/providers/musicStore";
import { WEDDING } from "@/constants/wedding";
import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/tokens";
import { EASE_OUT_EXPO } from "@/lib/animation";
import { IMAGES, VIDEOS } from "@/lib/assets";

interface OpeningScreenProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

const floatingFlowers = [
  { top: "10%", left: "8%", size: 32, delay: 0, duration: 4 },
  { top: "20%", right: "6%", size: 24, delay: 0.5, duration: 5 },
  { top: "60%", left: "5%", size: 20, delay: 1, duration: 3.5 },
  { top: "75%", right: "8%", size: 28, delay: 0.8, duration: 4.5 },
  { top: "40%", left: "3%", size: 16, delay: 1.5, duration: 3.8 },
  { top: "85%", left: "15%", size: 22, delay: 0.3, duration: 4.2 },
];

export function OpeningScreen({ guestName, isOpen, onOpen }: OpeningScreenProps) {
  const { setInteracted } = useMusicStore();

  const handleOpen = useCallback(() => {
    setInteracted();
    onOpen();
    document.documentElement.classList.remove("no-scroll");
  }, [setInteracted, onOpen]);

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.classList.add("no-scroll");
    }
    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ touchAction: "none" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Video */}
          <div className="absolute inset-0 -z-10">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={IMAGES.openingPoster}
              preload="metadata"
            >
              {/* TODO: Add real wedding video to public/videos/opening.mp4 */}
              <source src={VIDEOS.opening} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#1c1c1c]/70" />
          </div>

          {/* Wayang Gunungan — decorative left & right framing */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block" aria-hidden="true">
            <WayangGunungan size={80} color={COLORS.gold} className="opacity-20" />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block" aria-hidden="true">
            <WayangGunungan size={80} color={COLORS.gold} className="opacity-20" />
          </div>

          {/* Floating Flowers */}
          {floatingFlowers.map((flower, i) => (
            <FloatingElement
              key={i}
              className="absolute pointer-events-none"
              style={
                {
                  top: flower.top,
                  left: "left" in flower ? flower.left : undefined,
                  right: "right" in flower ? flower.right : undefined,
                } as React.CSSProperties
              }
              amplitude={flower.size / 3}
              duration={flower.duration}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: flower.delay + 0.5, duration: 0.8 }}
              >
                <svg
                  width={flower.size}
                  height={flower.size}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <g key={angle} transform={`rotate(${angle} 12 12)`}>
                      <ellipse
                        cx="12"
                        cy="6"
                        rx="2.5"
                        ry="5"
                        fill={COLORS.gold}
                      />
                    </g>
                  ))}
                  <circle cx="12" cy="12" r="2.5" fill={COLORS.gold} />
                </svg>
              </motion.div>
            </FloatingElement>
          ))}

          {/* Content — gap-5 mobile, gap-8 sm+ to prevent overflow on short screens */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 gap-5 sm:gap-8 max-w-sm w-full py-[max(1.5rem,var(--safe-top))] pb-[max(1.5rem,var(--safe-bottom))]">
            {/* Logo / Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: EASE_OUT_EXPO }}
              className="flex flex-col items-center gap-1"
            >
              {/* TODO: Replace with real couple monogram */}
              <img
                src={IMAGES.logo}
                alt="I & S monogram"
                width={120}
                height={52}
                className="opacity-90 w-[120px] sm:w-[160px]"
              />
              <div className="w-12 sm:w-16 h-px bg-gold/50 my-1" />
              <span className="font-cinzel text-gold text-[11px] tracking-[0.25em] uppercase">
                The Wedding of
              </span>
            </motion.div>

            {/* Couple Name */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: EASE_OUT_EXPO }}
              className="flex flex-col items-center gap-2"
            >
              <h1 className="font-cormorant font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-none">
                {WEDDING.groom.nickname}
              </h1>
              <span className="font-cinzel text-gold text-lg sm:text-xl">&amp;</span>
              <h1 className="font-cormorant font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-none">
                {WEDDING.bride.nickname}
              </h1>
            </motion.div>

            {/* Guest Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-8 h-px bg-gold/40" />
              <p className="font-jakarta text-white/70 text-xs tracking-[0.15em] uppercase mt-1">
                Kepada Yth.
              </p>
              <p className="font-cormorant italic text-white text-xl mt-1">
                {guestName}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: EASE_OUT_EXPO }}
              className="flex flex-col items-center gap-3 w-full"
            >
              <Button
                onClick={handleOpen}
                variant="primary"
                size="lg"
                className="w-full max-w-xs"
                aria-label="Buka undangan"
              >
                Buka Undangan
              </Button>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-2"
              >
                <ChevronDown className="w-5 h-5 text-white/40" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

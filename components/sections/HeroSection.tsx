"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WEDDING } from "@/constants/wedding";
import { IMAGES, VIDEOS } from "@/lib/assets";
import { COLORS } from "@/lib/tokens";
import { EASE_OUT_EXPO } from "@/lib/animation";

export function HeroSection() {
  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={IMAGES.heroPoster}
          preload="metadata"
        >
          <source src={VIDEOS.hero} type="video/mp4" />
        </video>
        {/* Overlay ringan — gambar tetap jelas */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-5">
        {/* Label atas */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-cinzel text-gold text-[10px] sm:text-xs tracking-[0.3em] uppercase">
            Bismillahirrahmanirrahim
          </span>
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-gold/50" />
            <div className="w-1 h-1 rounded-full bg-gold/70" />
            <div className="h-px w-8 bg-gold/50" />
          </div>
          <span className="font-cinzel text-white/70 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
            Dengan Ridho Allah SWT, Kami Mengundang Anda Hadir Dalam Pernikahan Kami
          </span>
        </motion.div>

        {/* Couple name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: EASE_OUT_EXPO }}
          className="flex flex-col items-center gap-2"
        >
          <h1 className="font-cormorant font-light text-6xl sm:text-7xl md:text-8xl text-white leading-[1.05] tracking-[-0.02em]">
            {WEDDING.groom.nickname}
          </h1>
          <span className="font-cinzel text-gold text-2xl sm:text-3xl">&amp;</span>
          <h1 className="font-cormorant font-light text-6xl sm:text-7xl md:text-8xl text-white leading-[1.05] tracking-[-0.02em]">
            {WEDDING.bride.nickname}
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        >
          <div className="h-px w-12 bg-gold/60" />
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none" aria-hidden="true">
            <path d="M8 1 L15 8 L15 20 L1 20 L1 8 Z" stroke={COLORS.gold} strokeWidth="1" fill="none" opacity="0.9" />
            <circle cx="8" cy="1" r="1.5" fill={COLORS.gold} opacity="1" />
            <circle cx="8" cy="12" r="2" stroke={COLORS.gold} strokeWidth="0.8" fill="none" opacity="0.7" />
          </svg>
          <div className="h-px w-12 bg-gold/60" />
        </motion.div>

        {/* Date */}
        <motion.p
          className="font-jakarta text-white/85 text-sm sm:text-base tracking-[0.1em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {WEDDING.date}
        </motion.p>

        <motion.p
          className="font-jakarta text-white/60 text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          {WEDDING.events[0]?.address} · {WEDDING.events[0]?.city}
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="font-cinzel text-white/40 text-[11px] tracking-[0.18em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

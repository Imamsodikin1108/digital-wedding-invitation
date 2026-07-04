"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn, ScaleIn } from "@/components/motion";
import { WEDDING } from "@/constants/wedding";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = `https://www.youtube.com/embed/${WEDDING.video.youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <section className="section bg-[var(--background)]" id="video" aria-label="Wedding video">
      <div className="container-wedding">
        <SectionTitle
          label="Momen Bahagia"
          title="Video Pernikahan"
          subtitle="Abadikan setiap momen indah dalam kenangan yang tak terlupakan"
          className="mb-12"
        />

        <ScaleIn className="max-w-4xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden shadow-[var(--shadow-large)] bg-black aspect-video">
            {!isPlaying ? (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Play wedding video"
              >
                <Image
                  src={WEDDING.video.poster}
                  alt="Wedding video thumbnail"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw, 1024px"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-3 rounded-full border-2 border-white/30"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    />
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/90 flex items-center justify-center shadow-[var(--shadow-gold)]">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </motion.div>
              </button>
            ) : (
              <FadeIn className="absolute inset-0">
                <iframe
                  src={embedUrl}
                  title="Wedding Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </FadeIn>
            )}
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}

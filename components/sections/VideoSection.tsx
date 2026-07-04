"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScaleIn } from "@/components/motion";
import { VIDEOS, IMAGES } from "@/lib/assets";
import { useMusicStore } from "@/providers/musicStore";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { play: playMusic, pause: pauseMusic } = useMusicStore();

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      playMusic();
    } else {
      video.play();
      setIsPlaying(true);
      pauseMusic();
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    playMusic();
  };

  return (
    <section className="section bg-[var(--background)]" id="video" aria-label="Wedding video">
      <div className="container-wedding">
        <SectionTitle
          label="Momen Bahagia"
          title="Video Pernikahan"
          subtitle="Abadikan setiap momen indah dalam kenangan yang tak terlupakan"
          className="mb-12"
        />

        <ScaleIn className="max-w-2xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden shadow-[var(--shadow-large)] bg-black w-full p-3">
            <video
              ref={videoRef}
              src={VIDEOS.hero}
              poster={IMAGES.videoPoster}
              className="w-full h-auto block"
              playsInline
              preload="metadata"
              onEnded={handleEnded}
            />

            {/* Overlay + play button */}
            <button
              onClick={handleToggle}
              className="absolute inset-0 group flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {/* Dim overlay — hanya tampil saat pause */}
              <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              />

              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.08 }}
                animate={{ opacity: isPlaying ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {!isPlaying && (
                  <>
                    <motion.div
                      className="absolute -inset-3 rounded-full border-2 border-white/30"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    />
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/90 flex items-center justify-center shadow-[var(--shadow-gold)]">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="white" />
                    </div>
                  </>
                )}
              </motion.div>

              {/* Pause button — tampil saat hover ketika playing */}
              {isPlaying && (
                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center">
                    <Pause className="w-6 h-6 text-white" fill="white" />
                  </div>
                </div>
              )}
            </button>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}

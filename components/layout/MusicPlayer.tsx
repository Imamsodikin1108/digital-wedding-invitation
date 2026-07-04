"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2, Volume2, VolumeX } from "lucide-react";
import { useMusicStore } from "@/providers/musicStore";
import { WEDDING } from "@/constants/wedding";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
  const { isPlaying, hasInteracted, volume, toggle, setVolume } = useMusicStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(WEDDING.music.src);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "metadata";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  if (!hasInteracted) return null;
  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "flex flex-col items-end gap-2"
        )}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-[var(--shadow-medium)]">
          <button
            onClick={toggle}
            className={cn(
              "relative w-10 h-10 rounded-full flex items-center justify-center",
              "bg-gold text-white transition-all duration-300",
              "hover:bg-gold-dark focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            )}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gold"
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: isPlaying ? 4 : 0.3,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear",
              }}
            >
              {isPlaying ? (
                <Music2 className="w-4 h-4" />
              ) : (
                <Music className="w-4 h-4" />
              )}
            </motion.div>
          </button>

          <div className="hidden sm:flex flex-col min-w-0">
            <span className="font-jakarta text-xs font-semibold text-[var(--foreground)] truncate max-w-[120px]">
              {WEDDING.music.title}
            </span>
            <span className="font-jakarta text-[10px] text-[var(--muted-foreground)] truncate max-w-[120px]">
              {WEDDING.music.artist}
            </span>
          </div>

          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
            className="text-[var(--muted-foreground)] hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md"
            aria-label={volume > 0 ? "Mute music" : "Unmute music"}
          >
            {volume > 0 ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

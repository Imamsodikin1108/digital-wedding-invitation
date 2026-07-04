import { WEDDING } from "@/constants/wedding";

/**
 * Singleton <audio> instance for the wedding backsound.
 *
 * Kenapa singleton? Mobile browser (iOS Safari, Chrome Android) hanya
 * mengizinkan audio.play() bila dipanggil SINKRON di dalam handler gesture
 * user. Dengan singleton, handler gesture di OpeningScreen bisa memanggil
 * play() langsung, sementara MusicPlayer tetap memakai instance yang sama
 * untuk sinkronisasi state play/pause & volume.
 */
let audio: HTMLAudioElement | null = null;

export function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio(WEDDING.music.src);
    audio.loop = true;
    audio.preload = "metadata";
  }
  return audio;
}

/**
 * Mulai memutar musik. HARUS dipanggil langsung di dalam event handler
 * gesture (onClick / pointerdown) agar lolos autoplay policy mobile.
 */
export function playAudioOnGesture(): void {
  const el = getAudio();
  if (!el) return;
  el.play().catch(() => {});
}

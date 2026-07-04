import { create } from "zustand";

interface MusicState {
  isPlaying: boolean;
  hasInteracted: boolean;
  currentTrack: number;
  volume: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setInteracted: () => void;
  setVolume: (volume: number) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  isPlaying: false,
  hasInteracted: false,
  currentTrack: 0,
  volume: 0.7,

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setInteracted: () => set({ hasInteracted: true, isPlaying: true }),
  setVolume: (volume) => set({ volume }),
}));

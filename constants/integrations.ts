import { IMAGES, AUDIO, VIDEOS } from "@/lib/assets";

export const MUSIC = {
  title: "Musik Latar Pernikahan",
  artist: "Azwan & Septia · 19 Juli 2026",
  src: AUDIO.background,
} as const;

export const VIDEO = {
  youtubeId: "2Vv-BfVoq4g",
  poster: IMAGES.videoPoster,
} as const;

export const FORMSPREE_ID = "YOUR_FORMSPREE_ID";

export const GISCUS = {
  repo: "YOUR_USERNAME/YOUR_REPO",
  repoId: "YOUR_REPO_ID",
  category: "Wedding Wishes",
  categoryId: "YOUR_CATEGORY_ID",
} as const;

// Keep VIDEOS exported so page-level components can reference them
export { VIDEOS };

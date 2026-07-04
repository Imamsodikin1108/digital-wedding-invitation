// ---------------------------------------------------------------------------
// Asset Registry — single source of truth for all media paths.
// ---------------------------------------------------------------------------

// Unsplash CDN helper — fallback placeholder for story photos
const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const IMAGES = {
  // ---------- People (lampiran_1) ----------
  groom: "/images/lampiran_1/azwan.jpg",
  bride: "/images/lampiran_1/septia.jpg",

  // ---------- Cover / Hero (lampiran_2) ----------
  couple: "/images/lampiran_2/IMG_8868.jpg",
  heroPoster: "/images/lampiran_2/IMG_8868.jpg",
  openingPoster: "/images/lampiran_2/IMG_8868.jpg",
  videoPoster: "/images/lampiran_2/IMG_8868.jpg",
  ogImage: "/images/lampiran_2/IMG_8868.jpg",

  // ---------- Love Story timeline (use prewedding photos) ----------
  story: {
    1: "/images/lampiran_5/DSC00685.jpg",
    2: "/images/lampiran_5/IMG_8882.jpg",
    3: "/images/lampiran_5/IMG_8890.jpg",
    4: "/images/lampiran_5/IMG_8906.jpg",
    5: "/images/lampiran_5/IMG_8927.jpg",
  },

  // ---------- Gallery (lampiran_5) — handled in constants/gallery.ts ----------
  gallery: {
    1:  "/images/lampiran_5/DSC00685.jpg",
    2:  "/images/lampiran_5/DSC00689.jpg",
    3:  "/images/lampiran_5/DSC00692.jpg",
    4:  "/images/lampiran_5/DSC00713.jpg",
    5:  "/images/lampiran_5/DSC00718.jpg",
    6:  "/images/lampiran_5/IMG_8868.jpg",
    7:  "/images/lampiran_5/IMG_8882.jpg",
    8:  "/images/lampiran_5/IMG_8887.jpg",
  },

  // ---------- Gift & payment logos ----------
  logos: {
    bca: "/images/logos/bca.svg",
    mandiri: "/images/logos/mandiri.svg",
    dana: "/images/logos/dana.svg",
  },

  // ---------- QR Code ----------
  qris: "/images/qris.svg",

  // ---------- Logo / Monogram ----------
  logo: "/icons/logo.svg",
} as const;

export const VIDEOS = {
  hero: "/videos/septia_1.mp4",
  opening: "/videos/septia_1.mp4",
} as const;

export const AUDIO = {
  background: "/audio/background.mp3",
} as const;

/* ─────────────────────────────────────────────
   Wedding Domain Types
   Source: All documentation sections
   ───────────────────────────────────────────── */

export interface Person {
  name: string;
  fullName: string;
  nickname: string;
  photo: string;
  parents: {
    father: string;
    mother: string;
  };
  instagram?: string;
  bio?: string;
  role: "bride" | "groom";
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  endTime?: string;
  venue: string;
  address: string;
  city: string;
  mapsUrl: string;
  description?: string;
  dressCode?: string;
}

export interface LoveStoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  photo?: string;
  objectPosition?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface GiftMethod {
  id: string;
  type: "bank" | "ewallet" | "qris";
  name: string;
  accountNumber: string;
  accountName: string;
  logo?: string;
  qrImage?: string;
}

export interface WeddingData {
  bride: Person;
  groom: Person;
  date: string;
  dateISO: string;
  greeting: string;
  quote: {
    text: string;
    source: string;
    doa?: string;
  };
  events: WeddingEvent[];
  loveStory: LoveStoryItem[];
  gallery: GalleryImage[];
  gifts: GiftMethod[];
  music: {
    title: string;
    artist: string;
    src: string;
  };
  video: {
    youtubeId: string;
    poster: string;
  };
  formspreeId: string;
  giscus: {
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
  };
}

export interface RSVPFormData {
  name: string;
  attending: "yes" | "no" | "maybe";
  guests: number;
  message?: string;
}

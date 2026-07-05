/**
 * Filter kata kurang pantas (Bahasa Indonesia + Inggris umum).
 * Kata yang cocok (sebagai kata utuh, tidak sensitif huruf besar/kecil)
 * diganti dengan tanda bintang. Dipakai di server (API) & sebagai fallback
 * di klien, agar ucapan tampil langsung namun tetap tersaring.
 */
const BAD_WORDS = [
  // Indonesia
  "anjing", "anjg", "anjay", "asu", "bangsat", "bajingan", "kontol", "kntl",
  "memek", "mmk", "pepek", "pepek", "ngentot", "ngentod", " entot", "jancok",
  "jancuk", "kampret", "tai", "taik", "tolol", "goblok", "bego", "brengsek",
  "keparat", "bangke", "perek", "lonte", "pelacur", "titit", "pantek",
  "pukimak", "puki", "babi", "monyet", "sinting", "bencong", "banci", "setan",
  // Inggris
  "fuck", "fucking", "shit", "bitch", "asshole", "dick", "pussy", "bastard",
  "cunt", "nigga", "motherfucker",
];

const PATTERN = new RegExp(
  `\\b(${BAD_WORDS.map((w) => w.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "gi"
);

export function censorMessage(text: string): { clean: string; censored: boolean } {
  let censored = false;
  const clean = text.replace(PATTERN, (m) => {
    censored = true;
    return "*".repeat(m.length);
  });
  return { clean, censored };
}

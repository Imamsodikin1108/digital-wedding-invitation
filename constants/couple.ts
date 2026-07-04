import type { Person } from "@/types/wedding";
import { IMAGES } from "@/lib/assets";

export const GROOM: Person = {
  name: "Ahmad Kurniawan",
  fullName: "Ahmad Kurniawan, S.M.",
  nickname: "Azwan",
  photo: IMAGES.groom,
  parents: {
    father: "Bapak Darami, SP",
    mother: "Ibu Jasmiati",
  },
  instagram: "bywannnnn",
  bio: "Putra Pertama dari Bapak Darami, SP dan Ibu Jasmiati.",
  role: "groom",
};

export const BRIDE: Person = {
  name: "Septia Purnawati",
  fullName: "Septia Purnawati, S. Pd.",
  nickname: "Septia",
  photo: IMAGES.bride,
  parents: {
    father: "Bapak Saimin (Alm.)",
    mother: "Ibu Jumini",
  },
  instagram: "fitwithkakak",
  bio: "Putri Terakhir dari Bapak Saimin (Alm.) dan Ibu Jumini.",
  role: "bride",
};

export const WEDDING_DATE = "Minggu, 19 Juli 2026";
export const WEDDING_DATE_ISO = "2026-07-19T10:00:00+07:00";

export const GREETING =
  "Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\nPlot twist terbaik tahun ini?\n\nKami memutuskan untuk mengubah status dari \"dua orang yang saling menemukan\" menjadi \"suami dan istri.\"\n\nDi momen bahagia ini rasanya belum lengkap tanpa kehadiran dan doa dari Bapak/Ibu, Saudara/Saudari, serta sahabat tercinta.\n\nJadi… kosongkan jadwalnya ya. Kami tunggu kehadirannya untuk ikut merayakan hari spesial kami.";

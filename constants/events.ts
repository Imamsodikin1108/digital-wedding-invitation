import type { WeddingEvent } from "@/types/wedding";

export const EVENTS: WeddingEvent[] = [
  {
    id: "akad",
    name: "Akad Nikah & Resepsi",
    date: "Minggu, 19 Juli 2026",
    time: "10.00",
    endTime: "selesai",
    venue: "Kediaman Mempelai",
    address: "Desa Wonosari, Kec. Gunung Sugih",
    city: "Lampung Tengah, Lampung",
    mapsUrl: "https://maps.app.goo.gl/4ySjNQNpuZyiCX1y9",
    description: "Prosesi akad nikah dan resepsi pernikahan",
    dressCode: "Batik / Kebaya",
  },
  {
    id: "ngunduh",
    name: "Ngunduh Mantu",
    date: "Sabtu, 08 Agustus 2026",
    time: "13.00",
    endTime: "selesai",
    venue: "Kediaman Mempelai Pria",
    address: "Desa Wonosari, Kec. Gunung Sugih",
    city: "Lampung Tengah, Lampung",
    mapsUrl: "https://maps.app.goo.gl/4nX5hU2jT6wHLeEL8",
    description: "Prosesi ngunduh mantu (WITA)",
    dressCode: "Formal / Batik",
  },
];

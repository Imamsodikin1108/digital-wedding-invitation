import type { WeddingEvent } from "@/types/wedding";

export const EVENTS: WeddingEvent[] = [
  {
    id: "akad",
    name: "Akad Nikah & Resepsi",
    date: "Minggu, 19 Juli 2026",
    time: "10.00",
    endTime: "selesai",
    venue: "Kediaman Mempelai Wanita",
    address: "Desa Wonosari, Kec. Gn. Sugih",
    city: "Kab. Lampung Tengah, Lampung",
    mapsUrl: "https://maps.app.goo.gl/4ySjNQNpuZyiCX1y9?g_st=iw",
    description: "Prosesi akad nikah dan resepsi pernikahan",
    dressCode: "Batik / Kebaya",
  },
  {
    id: "ngunduh",
    name: "Ngunduh Mantu",
    date: "Sabtu, 08 Agustus 2026",
    time: "13.00",
    endTime: "selesai",
    venue: "Apoang, Desa Bukit Samang",
    address: "Kec. Sendana, Kab. Majene",
    city: "Sulawesi Barat",
    mapsUrl: "https://maps.app.goo.gl/4nX5hU2jT6wHLeEL8?g_st=ipc",
    description: "Prosesi ngunduh mantu (WITA)",
    dressCode: "Formal / Batik",
  },
];

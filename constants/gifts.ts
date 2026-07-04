import type { GiftMethod } from "@/types/wedding";
import { IMAGES } from "@/lib/assets";

export const GIFTS: GiftMethod[] = [
  {
    id: "bca",
    type: "bank",
    name: "Bank BCA",
    accountNumber: "6880687130",
    accountName: "AHMAD KURNIAWAN",
    logo: IMAGES.logos.bca,
  },
  {
    id: "bri",
    type: "bank",
    name: "Bank BRI",
    accountNumber: "031901007718530",
    accountName: "SEPTIA PURNAWATI",
    logo: IMAGES.logos.mandiri,
  },
  {
    id: "qris",
    type: "qris",
    name: "QRIS",
    accountNumber: "",
    accountName: "Azwan & Septia",
    qrImage: IMAGES.qris,
  },
];

import type { GiftMethod } from "@/types/wedding";
import { IMAGES } from "@/lib/assets";

export const GIFTS: GiftMethod[] = [
  {
    id: "bca",
    type: "bank",
    name: "BCA",
    accountNumber: "6880687130",
    accountName: "AHMAD KURNIAWAN",
    logo: IMAGES.logos.bca,
  },
  {
    id: "bri",
    type: "bank",
    name: "BRI",
    accountNumber: "031901007718530",
    accountName: "SEPTIA PURNAWATI",
    logo: IMAGES.logos.bri,
  },
];

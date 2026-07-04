import type { MetadataRoute } from "next";
import { WEDDING } from "@/constants/wedding";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Wedding of ${WEDDING.groom.nickname} & ${WEDDING.bride.nickname}`,
    short_name: `${WEDDING.groom.nickname} & ${WEDDING.bride.nickname}`,
    description: `Undangan pernikahan digital ${WEDDING.groom.fullName} dan ${WEDDING.bride.fullName}`,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfbf8",
    theme_color: "#c6a969",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["lifestyle", "wedding"],
  };
}

import type { Metadata } from "next";
import { WEDDING } from "@/constants/wedding";
import { BASE_URL } from "@/lib/config";

export const siteMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `The Wedding of ${WEDDING.groom.nickname} & ${WEDDING.bride.nickname}`,
    template: `%s | ${WEDDING.groom.nickname} & ${WEDDING.bride.nickname}`,
  },
  description: `Dengan penuh kebahagiaan, kami mengundang Anda untuk menyaksikan pernikahan ${WEDDING.groom.fullName} dan ${WEDDING.bride.fullName} pada ${WEDDING.date} di Yogyakarta.`,
  keywords: [
    "undangan pernikahan digital",
    "wedding invitation",
    WEDDING.bride.name,
    WEDDING.groom.name,
    "pernikahan Yogyakarta",
    "digital wedding invitation",
    "harmony of java",
  ],
  authors: [{ name: `${WEDDING.groom.name} & ${WEDDING.bride.name}` }],
  creator: "Digital Wedding Invitation Platform",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: `Wedding of ${WEDDING.groom.nickname} & ${WEDDING.bride.nickname}`,
    title: `The Wedding of ${WEDDING.groom.nickname} & ${WEDDING.bride.nickname}`,
    description: `${WEDDING.date} · Yogyakarta`,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `The Wedding of ${WEDDING.groom.nickname} & ${WEDDING.bride.nickname}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `The Wedding of ${WEDDING.groom.nickname} & ${WEDDING.bride.nickname}`,
    description: `${WEDDING.date} · Yogyakarta`,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Pernikahan ${WEDDING.groom.fullName} dan ${WEDDING.bride.fullName}`,
    startDate: WEDDING.dateISO,
    description: `Pernikahan ${WEDDING.groom.fullName} dan ${WEDDING.bride.fullName} di Yogyakarta.`,
    location: [
      {
        "@type": "Place",
        name: WEDDING.events[0]?.venue,
        address: {
          "@type": "PostalAddress",
          streetAddress: WEDDING.events[0]?.address,
          addressLocality: WEDDING.events[0]?.city,
          addressCountry: "ID",
        },
      },
    ],
    organizer: {
      "@type": "Person",
      name: `${WEDDING.groom.name} & ${WEDDING.bride.name}`,
    },
    image: `${BASE_URL}/images/og-image.jpg`,
    url: BASE_URL,
  };
}

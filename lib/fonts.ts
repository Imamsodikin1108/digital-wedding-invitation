import {
  Cormorant_Garamond,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Cinzel,
} from "next/font/google";

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "swap",
  preload: true,
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
  preload: true,
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  preload: true,
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  cormorantGaramond.variable,
  playfairDisplay.variable,
  plusJakartaSans.variable,
  cinzel.variable,
].join(" ");

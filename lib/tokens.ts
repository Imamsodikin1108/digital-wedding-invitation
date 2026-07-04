export const COLORS = {
  gold: "#c6a969",
  goldLight: "#d4bc89",
  goldDark: "#a88a4a",
  ivory: "#f8f5f0",
  warmWhite: "#fcfbf8",
  dark: "#1c1c1c",
  brown: "#6b4f3a",
  success: "#4e8d62",
  rose: "#c98d8d",
  // Javanese palette
  sogan: "#7a5c3a",       // batik sogan brown
  soganLight: "#a07850",  // lighter sogan
  indigo: "#3d4f6e",      // batik indigo blue
  parchment: "#f0ead8",   // aged batik paper
  earthDark: "#0f0a06",   // deep wayang night
  earthMid: "#1e1206",    // warm dark brown
} as const;

export const SHADOWS = {
  gold: "0 4px 24px 0 rgba(198, 169, 105, 0.25)",
  goldLg: "0 8px 40px 0 rgba(198, 169, 105, 0.35)",
  large: "0 20px 60px rgba(0,0,0,0.12)",
} as const;

export const TOKENS = { colors: COLORS, shadows: SHADOWS } as const;

"use client";

import { ThemeProvider } from "./ThemeProvider";
import { LenisProvider } from "./LenisProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LenisProvider>{children}</LenisProvider>
    </ThemeProvider>
  );
}

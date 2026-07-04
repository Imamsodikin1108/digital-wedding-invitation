import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { siteMetadata, generateJsonLd } from "@/lib/metadata";
import { Providers } from "@/providers";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5edd8" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0a06" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateJsonLd();

  return (
    <html lang="id" suppressHydrationWarning className={fontVariables}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-jakarta min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Providers>
          {children}

          <div className="fixed top-4 left-4 z-50">
            <ThemeToggle />
          </div>

          <MusicPlayer />
        </Providers>
      </body>
    </html>
  );
}

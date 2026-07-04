"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/motion";
import { WEDDING } from "@/constants/wedding";
import { isGiscusConfigured } from "@/lib/config";

export function WeddingWishes() {
  const { resolvedTheme } = useTheme();
  const giscusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = giscusRef.current;
    if (!container) return;

    // Remove previous script if theme changed
    const existing = container.querySelector("script");
    if (existing) existing.remove();

    const iframe = container.querySelector("iframe.giscus-frame");
    if (iframe) {
      (iframe as HTMLIFrameElement).contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: resolvedTheme === "dark" ? "dark_dimmed" : "light",
            },
          },
        },
        "https://giscus.app"
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", WEDDING.giscus.repo);
    script.setAttribute("data-repo-id", WEDDING.giscus.repoId);
    script.setAttribute("data-category", WEDDING.giscus.category);
    script.setAttribute("data-category-id", WEDDING.giscus.categoryId);
    script.setAttribute("data-mapping", "title");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark_dimmed" : "light");
    script.setAttribute("data-lang", "id");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    container.appendChild(script);
  }, [resolvedTheme]);

  const isConfigured = isGiscusConfigured(WEDDING.giscus.repo);

  return (
    <section
      className="section bg-[var(--secondary)]"
      id="wishes"
      aria-label="Wedding wishes section"
    >
      <div className="container-wedding">
        <SectionTitle
          label="Doa & Ucapan"
          title="Ucapan Selamat"
          subtitle="Setiap doa dan ucapan Anda adalah kebahagiaan bagi kami"
          className="mb-12"
        />

        <FadeUp className="max-w-2xl mx-auto" delay={0.2}>
          {isConfigured ? (
            <div
              ref={giscusRef}
              className="giscus"
              aria-label="Wedding wishes comments"
            />
          ) : (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2rem] p-8 text-center">
              <p className="font-cormorant italic text-xl text-[var(--foreground)] mb-3">
                Belum ada ucapan.
              </p>
              <p className="font-jakarta text-sm text-[var(--muted-foreground)]">
                Jadilah tamu pertama yang memberikan doa dan harapan.
              </p>
              <p className="font-jakarta text-xs text-[var(--muted-foreground)] mt-6 opacity-60">
                (Konfigurasikan Giscus di{" "}
                <code className="bg-[var(--muted)] px-1.5 py-0.5 rounded text-[10px]">
                  constants/wedding.ts
                </code>{" "}
                untuk mengaktifkan fitur ini)
              </p>
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { Loader2, Globe, Smartphone } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/motion";
import { useWishesStore, type Attending, type Wish } from "@/providers/wishesStore";

const ATTENDING_LABEL: Record<Attending, string> = {
  yes: "Hadir",
  maybe: "Mungkin Hadir",
  no: "Tidak Hadir",
};

function WishCard({ wish }: { wish: Wish }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 flex flex-col gap-2 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-cormorant font-semibold text-lg text-[var(--foreground)] min-w-0 truncate">
          {wish.name}
        </h4>
        <span
          className={`shrink-0 font-jakarta text-[10px] px-2.5 py-1 rounded-full ${
            wish.attending === "no"
              ? "bg-rose/15 text-rose"
              : "bg-green/15 text-green"
          }`}
        >
          {ATTENDING_LABEL[wish.attending]}
        </span>
      </div>
      <p className="font-jakarta text-sm text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
        {wish.message}
      </p>
    </div>
  );
}

export function WeddingWishes() {
  const wishes = useWishesStore((s) => s.wishes);
  const loading = useWishesStore((s) => s.loading);
  const loaded = useWishesStore((s) => s.loaded);
  const shared = useWishesStore((s) => s.shared);
  const refresh = useWishesStore((s) => s.refresh);

  useEffect(() => {
    refresh();
  }, [refresh]);

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
          className="mb-6"
        />

        {/* Status penyimpanan ucapan */}
        {loaded && (
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-1.5 font-jakarta text-[11px] text-[var(--muted-foreground)]">
              {shared ? (
                <>
                  <Globe className="w-3.5 h-3.5 text-gold" />
                  Ucapan dibagikan ke semua tamu
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-gold" />
                  Tersimpan di perangkat ini
                </>
              )}
            </span>
          </div>
        )}

        <FadeUp className="max-w-2xl mx-auto" delay={0.2}>
          {!loaded || (loading && wishes.length === 0) ? (
            <div className="flex items-center justify-center gap-2 py-12 text-[var(--muted-foreground)]">
              <Loader2 className="w-5 h-5 animate-spin text-gold" />
              <span className="font-jakarta text-sm">Memuat ucapan…</span>
            </div>
          ) : wishes.length === 0 ? (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2rem] p-8 text-center">
              <p className="font-cormorant italic text-xl text-[var(--foreground)] mb-3">
                Belum ada ucapan.
              </p>
              <p className="font-jakarta text-sm text-[var(--muted-foreground)]">
                Jadilah yang pertama memberi doa &amp; harapan melalui form RSVP di atas.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {wishes.map((w) => (
                <WishCard key={w.id} wish={w} />
              ))}
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

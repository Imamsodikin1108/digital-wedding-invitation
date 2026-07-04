"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { WEDDING } from "@/constants/wedding";
import type { GiftMethod } from "@/types/wedding";
import { cn } from "@/lib/utils";

function GiftCard({ gift }: { gift: GiftMethod }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  async function handleCopy() {
    if (!gift.accountNumber) return;
    await navigator.clipboard.writeText(gift.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <StaggerItem>
      <Card
        variant="default"
        padding="none"
        hoverable
        className="relative flex flex-col gap-5 !rounded-2xl overflow-hidden p-6 ring-1 ring-gold/15"
      >
        {/* Top gold accent bar */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 gradient-gold"
        />
        {/* Subtle corner glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gold/10 blur-2xl"
        />

        {/* Header */}
        <div className="flex items-center gap-3">
          {gift.logo && (
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white ring-1 ring-gold/20 shadow-[var(--shadow-soft)] flex items-center justify-center p-1.5">
              <Image
                src={gift.logo}
                alt={gift.name}
                fill
                className="object-contain p-1.5"
                sizes="48px"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-jakarta text-[0.65rem] uppercase tracking-[0.15em] text-gold">
              Transfer Bank
            </p>
            <h4 className="font-playfair font-semibold text-[var(--foreground)] text-lg leading-tight">
              {gift.name}
            </h4>
          </div>
        </div>

        {/* Account Info */}
        {gift.type !== "qris" && (
          <div className="relative flex flex-col gap-1.5 p-4 rounded-xl bg-linear-to-br from-[var(--muted)] to-[var(--secondary)] border border-gold/10">
            <p className="font-jakarta text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
              Nomor Rekening
            </p>
            <p className="font-jakarta font-bold text-[var(--foreground)] text-xl tracking-[0.12em]">
              {gift.accountNumber}
            </p>
            <p className="font-cormorant italic text-sm text-[var(--muted-foreground)]">
              a.n. {gift.accountName}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {gift.type !== "qris" && (
            <button
              onClick={handleCopy}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-full text-sm font-jakarta font-medium transition-all duration-300",
                "focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none",
                copied
                  ? "bg-green text-white"
                  : "bg-gold text-white hover:bg-gold-dark shadow-[var(--shadow-gold)]"
              )}
              aria-label={`Copy ${gift.name} account number`}
            >
              {copied ? (
                <><Check className="w-3.5 h-3.5" /> Tersalin!</>
              ) : (
                <><Copy className="w-3.5 h-3.5" /> Salin</>
              )}
            </button>
          )}

          {(gift.qrImage || gift.type === "qris") && (
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 text-sm font-jakarta font-medium focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              aria-label="Show QR code"
            >
              <QrCode className="w-3.5 h-3.5" />
              {showQR ? "Sembunyikan" : "QR Code"}
            </button>
          )}
        </div>

        {/* QR Code */}
        <AnimatePresence>
          {showQR && gift.qrImage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex justify-center pt-2">
                <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-[var(--border)]">
                  <Image
                    src={gift.qrImage}
                    alt={`QR Code ${gift.name}`}
                    fill
                    className="object-contain p-2"
                    sizes="160px"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </StaggerItem>
  );
}

export function GiftSection() {
  return (
    <section className="section bg-[var(--secondary)]" id="gift" aria-label="Wedding gift section">
      <div className="container-wedding">
        <SectionTitle
          label="Hadiah Pernikahan"
          title="Tanda Kasih"
          className="mb-6"
        />

        <FadeIn className="text-center mb-10 max-w-lg mx-auto" delay={0.2}>
          <p className="font-cormorant italic text-lg text-[var(--muted-foreground)]">
            Doa restu Anda adalah hadiah terindah bagi kami.
          </p>
          <p className="font-jakarta text-sm text-[var(--muted-foreground)] mt-2">
            Namun apabila Anda ingin memberikan tanda kasih,
            Anda dapat menggunakan informasi berikut.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto"
          staggerChildren={0.1}
        >
          {WEDDING.gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

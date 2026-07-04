"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
      <Card variant="default" padding="md" hoverable className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          {gift.logo && (
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
              <Image
                src={gift.logo}
                alt={gift.name}
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-jakarta font-semibold text-[var(--foreground)] text-sm">
              {gift.name}
            </h4>
            <Badge variant="muted" className="mt-1 capitalize">
              {gift.type === "ewallet" ? "E-Wallet" : gift.type.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Account Info */}
        {gift.type !== "qris" && (
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-[var(--muted)]">
            <p className="font-jakarta text-xs text-[var(--muted-foreground)]">
              Nomor Rekening
            </p>
            <p className="font-jakarta font-semibold text-[var(--foreground)] text-lg tracking-wider">
              {gift.accountNumber}
            </p>
            <p className="font-jakarta text-xs text-[var(--muted-foreground)]">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
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

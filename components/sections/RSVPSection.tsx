"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { FadeUp } from "@/components/motion";
import { BatikKawung } from "@/components/ornament";
import { WEDDING } from "@/constants/wedding";
import { COLORS } from "@/lib/tokens";
import { isFormspreeConfigured } from "@/lib/config";
import { useWishesStore } from "@/providers/wishesStore";
import { cn } from "@/lib/utils";

const rsvpSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(80, "Nama terlalu panjang"),
  attending: z.enum(["yes", "no", "maybe"]).refine((val) => val !== undefined, {
    message: "Mohon pilih konfirmasi kehadiran",
  }),
  guests: z.number().min(1).max(10),
  message: z.string().max(300).optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

const attendingOptions = [
  { value: "yes", label: "Hadir", emoji: "✓" },
  { value: "maybe", label: "Mungkin Hadir", emoji: "~" },
  { value: "no", label: "Tidak Hadir", emoji: "✗" },
] as const;

export function RSVPSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitWish = useWishesStore((s) => s.submit);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guests: 1 },
  });

  const selectedAttending = watch("attending");

  async function onSubmit(data: RSVPFormData) {
    setIsSubmitting(true);
    try {
      // 1) Rekam data kehadiran ke Formspree (bila dikonfigurasi) — best effort.
      if (isFormspreeConfigured(WEDDING.formspreeId)) {
        await fetch(`https://formspree.io/f/${WEDDING.formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        }).catch(() => {});
      }

      // 2) Simpan ucapan (server bila ada → dibagikan ke semua tamu; else lokal).
      const msg = data.message?.trim();
      if (msg) {
        await submitWish({
          name: data.name,
          attending: data.attending,
          message: msg,
        });
      }

      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="section relative overflow-hidden bg-[var(--background)]"
      id="rsvp"
      aria-label="RSVP section"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <BatikKawung size={500} color={COLORS.gold} className="opacity-[0.03]" />
      </div>

      <div className="container-wedding relative z-10">
        <SectionTitle
          label="Konfirmasi Kehadiran"
          title="RSVP"
          subtitle="Kehadiran Anda merupakan kebahagiaan bagi kami. Mohon konfirmasi sebelum 12 Juli 2026."
          className="mb-12"
        />

        <FadeUp className="max-w-lg mx-auto" delay={0.2}>
          <Card variant="default" padding="lg">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-5 py-6"
                >
                  <CheckCircle2 className="w-16 h-16 text-green" />
                  <div>
                    <h3 className="font-cormorant font-semibold text-2xl text-[var(--foreground)]">
                      Terima Kasih!
                    </h3>
                    <p className="font-jakarta text-[var(--muted-foreground)] text-sm mt-2">
                      Konfirmasi kehadiran Anda telah kami terima. Kami sangat menantikan kehadiran Anda.
                      Bila Anda menuliskan pesan, ucapan Anda kini tampil di bagian
                      &ldquo;Ucapan Selamat&rdquo;.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                  aria-label="RSVP form"
                >
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rsvp-name" className="font-jakarta text-sm font-medium text-[var(--foreground)]">
                      Nama Lengkap <span className="text-rose" aria-hidden="true">*</span>
                    </label>
                    <Input
                      id="rsvp-name"
                      type="text"
                      placeholder="Nama Anda"
                      autoComplete="name"
                      error={!!errors.name}
                      aria-describedby={errors.name ? "rsvp-name-error" : undefined}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p id="rsvp-name-error" className="font-jakarta text-xs text-rose" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Attendance */}
                  <div className="flex flex-col gap-2">
                    <p className="font-jakarta text-sm font-medium text-[var(--foreground)]">
                      Konfirmasi Kehadiran <span className="text-rose" aria-hidden="true">*</span>
                    </p>
                    <div className="grid grid-cols-3 gap-2" role="group" aria-label="Attendance options">
                      {attendingOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setValue("attending", opt.value)}
                          className={cn(
                            "py-3 rounded-xl font-jakarta text-xs font-medium transition-all duration-200",
                            "focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none",
                            selectedAttending === opt.value
                              ? "bg-gold text-white shadow-[var(--shadow-gold)]"
                              : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:border-gold border border-[var(--border)]"
                          )}
                          aria-pressed={selectedAttending === opt.value}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" {...register("attending")} />
                    {errors.attending && (
                      <p className="font-jakarta text-xs text-rose" role="alert">
                        {errors.attending.message}
                      </p>
                    )}
                  </div>

                  {/* Guests */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rsvp-guests" className="font-jakarta text-sm font-medium text-[var(--foreground)]">
                      Jumlah Tamu
                    </label>
                    <Input
                      id="rsvp-guests"
                      type="number"
                      min={1}
                      max={10}
                      {...register("guests", { valueAsNumber: true })}
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rsvp-message" className="font-jakarta text-sm font-medium text-[var(--foreground)]">
                      Pesan (opsional)
                    </label>
                    <Textarea
                      id="rsvp-message"
                      rows={3}
                      placeholder="Sampaikan pesan atau ucapan Anda..."
                      {...register("message")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full h-12 rounded-full inline-flex items-center justify-center gap-2",
                      "bg-gold text-white font-jakarta font-medium text-sm shadow-[var(--shadow-gold)]",
                      "hover:bg-gold-dark transition-all duration-300",
                      "focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isSubmitting ? "Mengirim..." : "Konfirmasi Kehadiran"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Card>
        </FadeUp>
      </div>
    </section>
  );
}

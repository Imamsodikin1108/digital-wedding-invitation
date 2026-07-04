import { MapPin, Clock, Calendar, Shirt } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { Gunungan, BatikParang } from "@/components/ornament";
import { WEDDING } from "@/constants/wedding";
import type { WeddingEvent } from "@/types/wedding";
import { COLORS } from "@/lib/tokens";

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const addToCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${event.date}&details=${encodeURIComponent(event.description ?? "")}&location=${encodeURIComponent(event.address + ", " + event.city)}`;

  return (
    <StaggerItem>
      <Card variant="default" padding="lg" className="h-full flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <Badge variant="gold">{index === 0 ? "Akad Nikah" : "Resepsi"}</Badge>
          <h3 className="font-cormorant font-semibold text-2xl sm:text-3xl text-[var(--foreground)]">
            {event.name}
          </h3>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-gold mt-1 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-jakarta text-sm font-medium text-[var(--foreground)]">
                {event.date}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-gold mt-1 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-jakarta text-sm font-medium text-[var(--foreground)]">
                {event.time} {event.endTime ? `– ${event.endTime}` : ""} WIB
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-jakarta text-sm font-semibold text-[var(--foreground)]">
                {event.venue}
              </p>
              <p className="font-jakarta text-xs text-[var(--muted-foreground)] mt-0.5">
                {event.address}
              </p>
              <p className="font-jakarta text-xs text-[var(--muted-foreground)]">
                {event.city}
              </p>
            </div>
          </div>

          {event.dressCode && (
            <div className="flex items-start gap-3">
              <Shirt className="w-4 h-4 text-gold mt-1 shrink-0" aria-hidden="true" />
              <p className="font-jakarta text-sm text-[var(--foreground)]">
                {event.dressCode}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[var(--border)]">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 font-jakarta text-sm font-medium focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            aria-label={`Open ${event.venue} in Google Maps`}
          >
            <MapPin className="w-4 h-4" />
            Lihat Lokasi
          </a>
          <a
            href={addToCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] hover:border-gold hover:text-gold transition-all duration-300 font-jakarta text-sm font-medium focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            aria-label={`Add ${event.name} to calendar`}
          >
            <Calendar className="w-4 h-4" />
            Kalender
          </a>
        </div>
      </Card>
    </StaggerItem>
  );
}

export function EventDetail() {
  return (
    <section
      className="section relative overflow-hidden bg-[var(--secondary)]"
      id="events"
      aria-label="Event details"
    >
      {/* Batik parang background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <BatikParang size={600} color={COLORS.gold} />
      </div>
      {/* Gunungan kiri atas */}
      <div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/3 pointer-events-none"
        aria-hidden="true"
      >
        <Gunungan size={240} color={COLORS.gold} className="opacity-[0.07]" />
      </div>
      {/* Gunungan kanan bawah */}
      <div
        className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/3 pointer-events-none"
        aria-hidden="true"
      >
        <Gunungan size={240} color={COLORS.gold} className="opacity-[0.07]" />
      </div>

      <div className="container-wedding relative z-10">
        <SectionTitle
          label="Acara Pernikahan"
          title="Detail Acara"
          subtitle="Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu"
          className="mb-12"
        />

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          staggerChildren={0.15}
        >
          {WEDDING.events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

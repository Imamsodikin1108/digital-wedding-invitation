"use client";

import { useState } from "react";
import { MapPin, Navigation, ParkingCircle } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScaleIn, FadeUp } from "@/components/motion";
import { WEDDING } from "@/constants/wedding";

export function LocationSection() {
  const [activeEventId, setActiveEventId] = useState(WEDDING.events[0]?.id ?? "");

  const activeEvent = WEDDING.events.find((e) => e.id === activeEventId) ?? WEDDING.events[0];
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent((activeEvent?.venue ?? "") + " " + (activeEvent?.city ?? ""))}&output=embed`;

  return (
    <section className="section bg-[var(--background)]" id="location" aria-label="Location section">
      <div className="container-wedding">
        <SectionTitle
          label="Petunjuk Lokasi"
          title="Lokasi Acara"
          subtitle="Temukan jalan menuju tempat berlangsungnya hari bahagia kami"
          className="mb-12"
        />

        {/* Event Selector */}
        <FadeUp className="flex justify-center gap-3 mb-8">
          {WEDDING.events.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveEventId(event.id)}
              className={`px-5 py-2 rounded-full font-jakarta text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none ${
                activeEventId === event.id
                  ? "bg-gold text-white shadow-[var(--shadow-gold)]"
                  : "border border-[var(--border)] text-[var(--muted-foreground)] hover:border-gold hover:text-gold"
              }`}
              aria-pressed={activeEventId === event.id}
            >
              {event.name}
            </button>
          ))}
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Map */}
          <ScaleIn className="lg:col-span-2">
            <div className="rounded-[2rem] overflow-hidden shadow-[var(--shadow-large)] aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px]">
              <iframe
                src={mapsEmbedUrl}
                title={`Map of ${activeEvent?.venue}`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label={`Google Maps showing ${activeEvent?.venue}`}
              />
            </div>
          </ScaleIn>

          {/* Info */}
          <FadeUp className="flex flex-col gap-4" delay={0.2}>
            {activeEvent && (
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2rem] p-6 sm:p-8 flex flex-col gap-6 h-full">
                <div className="flex flex-col gap-2">
                  <h3 className="font-cormorant font-semibold text-2xl text-[var(--foreground)]">
                    {activeEvent.venue}
                  </h3>
                  <p className="font-jakarta text-sm text-[var(--muted-foreground)]">
                    {activeEvent.address}
                  </p>
                  <p className="font-jakarta text-sm text-[var(--muted-foreground)]">
                    {activeEvent.city}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                  <ParkingCircle className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                  <p className="font-jakarta text-xs">
                    Tersedia area parkir luas di sekitar lokasi
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-[var(--border)]">
                  <a
                    href={activeEvent.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 rounded-full bg-gold text-white font-jakarta text-sm font-medium hover:bg-gold-dark transition-all duration-300 shadow-[var(--shadow-gold)] focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    aria-label={`Navigate to ${activeEvent.venue}`}
                  >
                    <Navigation className="w-4 h-4" />
                    Petunjuk Arah
                  </a>
                  <a
                    href={`https://maps.apple.com/?q=${encodeURIComponent(activeEvent.venue)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] font-jakarta text-sm font-medium hover:border-gold hover:text-gold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    aria-label={`Open ${activeEvent.venue} in Apple Maps`}
                  >
                    <MapPin className="w-4 h-4" />
                    Apple Maps
                  </a>
                </div>
              </div>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

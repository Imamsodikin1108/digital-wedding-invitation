"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useGuestName } from "@/hooks/useGuestName";
import {
  OpeningScreen,
  HeroSection,
  BrideGroom,
  WeddingQuote,
  CountdownSection,
  LoveStory,
  EventDetail,
  GiftSection,
  RSVPSection,
  FooterSection,
} from "@/components/sections";

const GallerySection = dynamic(
  () => import("@/components/sections/GallerySection").then((m) => m.GallerySection),
  { ssr: false }
);
const VideoSection = dynamic(
  () => import("@/components/sections/VideoSection").then((m) => m.VideoSection),
  { ssr: false }
);
const LocationSection = dynamic(
  () => import("@/components/sections/LocationSection").then((m) => m.LocationSection),
  { ssr: false }
);
const WeddingWishes = dynamic(
  () => import("@/components/sections/WeddingWishes").then((m) => m.WeddingWishes),
  { ssr: false }
);

function InvitationContent() {
  const [isOpen, setIsOpen] = useState(false);
  const guestName = useGuestName();

  return (
    <>
      <OpeningScreen
        guestName={guestName}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
      />

      <main id="main-content" aria-label="Wedding invitation content">
        <HeroSection />
        <BrideGroom />
        <WeddingQuote />
        <CountdownSection />
        <LoveStory />
        <GallerySection />
        <VideoSection />
        <EventDetail />
        <LocationSection />
        <GiftSection />
        <RSVPSection />
        <WeddingWishes />
      </main>

      <FooterSection />
    </>
  );
}

export default function Home() {
  return (
    <Suspense>
      <InvitationContent />
    </Suspense>
  );
}

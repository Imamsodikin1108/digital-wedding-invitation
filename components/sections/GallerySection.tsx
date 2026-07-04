"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { WEDDING } from "@/constants/wedding";
import type { GalleryImage } from "@/types/wedding";
import { cn } from "@/lib/utils";

function Lightbox({
  image,
  onClose,
  onPrev,
  onNext,
}: {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
    >
      <motion.div
        className="relative max-w-4xl max-h-[90vh] w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: `${image.width}/${image.height}`, maxHeight: "80vh" }}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        <p className="text-center text-white/60 font-jakarta text-sm mt-3">{image.alt}</p>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold transition-colors"
        aria-label="Previous image"
      >
        &#8249;
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold transition-colors"
        aria-label="Next image"
      >
        &#8250;
      </button>
    </motion.div>
  );
}

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const images = WEDDING.gallery;

  const handleOpen = useCallback((index: number) => setActiveIndex(index), []);
  const handleClose = useCallback(() => setActiveIndex(null), []);
  const handlePrev = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : 0)),
    [images.length]
  );
  const handleNext = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i + 1) % images.length : 0)),
    [images.length]
  );

  return (
    <section className="section bg-[var(--secondary)]" id="gallery" aria-label="Photo gallery">
      <div className="container-wedding">
        <SectionTitle
          label="Kenangan Indah"
          title="Galeri Foto"
          subtitle="Setiap gambar menyimpan cerita yang tak terlupakan"
          className="mb-12"
        />

        <StaggerContainer
          className="columns-2 md:columns-3 gap-4 space-y-4"
          staggerChildren={0.06}
        >
          {images.map((image, index) => (
            <StaggerItem key={image.id}>
              <button
                onClick={() => handleOpen(index)}
                className="relative w-full rounded-2xl overflow-hidden group block focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label={`View photo: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            image={images[activeIndex]}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

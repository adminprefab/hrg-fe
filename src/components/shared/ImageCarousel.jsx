import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export default function ImageCarousel({ images = [], title }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef(null);

  const scrollByAmount = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const openLightbox = (index) => setLightboxIndex(index);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  if (!images.length) return null;

  return (
    <>
      <div className="relative">
        {/* Arrows */}
        <button
          onClick={() => scrollByAmount(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={() => scrollByAmount(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-1"
          style={{ scrollbarWidth: "thin" }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] sm:w-[360px] snap-center group cursor-pointer"
              onClick={() => openLightbox(i)}
            >
              <div className="relative overflow-hidden rounded-lg border border-border bg-card">
                <img
                  src={img.src}
                  alt={img.alt || img.label || `Image ${i + 1}`}
                  className={`w-full h-64 sm:h-56 ${img.fit === "contain" ? "object-contain bg-card" : "object-cover"} transition-transform duration-500 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                    <ZoomIn className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              </div>
              {img.label && (
                <p className="text-sm font-semibold text-foreground text-center mt-2">{img.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            <motion.img
              key={lightboxIndex}
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt || images[lightboxIndex].label || ""}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {images[lightboxIndex].label && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-center">
                <p className="font-semibold">{images[lightboxIndex].label}</p>
                <p className="text-sm text-white/60 mt-1">{lightboxIndex + 1} / {images.length}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
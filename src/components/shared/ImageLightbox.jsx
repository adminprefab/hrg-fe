import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Full-screen image viewer: swipe (touch or mouse drag), arrows, and keyboard navigation.
// Parent controls open/close; internal index starts at `startIndex`.
export default function ImageLightbox({ images = [], startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);

  const close = useCallback(() => {
    document.body.style.overflow = "";
    onClose?.();
  }, [onClose]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [close, next, prev]);

  if (!images.length) return null;
  const active = images[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={close}
    >
      <button
        onClick={close}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Previous"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Next"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      <motion.img
        key={index}
        src={active.src}
        alt={active.alt || ""}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) next();
          else if (info.offset.x > 60) prev();
        }}
        className="max-w-[92vw] max-h-[78vh] object-contain rounded-lg touch-none cursor-grab"
        onClick={(e) => e.stopPropagation()}
        onTap={() => close()}
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none w-full px-6">
        {active.label && <p className="font-semibold text-white">{active.label}</p>}
        <p className="text-sm text-white/60 mt-1">
          {index + 1} / {images.length} · Swipe or use arrows to browse
        </p>
      </div>
    </motion.div>
  );
}
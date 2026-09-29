import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import MobileProductCard from "@/components/shared/MobileProductCard";
import ImageLightbox from "@/components/shared/ImageLightbox";

export default function ModelCatalogGrid({ models }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const lightboxImages = models.map((m) => ({
    src: m.img,
    alt: m.name,
    label: `${m.id} · ${m.name} · ${m.sqft}${m.sqftMetric ? ` (${m.sqftMetric})` : ""}`,
  }));
  const active = lightboxIndex !== null;

  return (
    <section className="bg-secondary/30 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel>24 Standard Models</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
            Model <em className="not-italic font-bold">Catalog</em>
          </AnimatedHeading>
          <p className="text-muted-foreground mt-3">From compact studio cabins to multi-bedroom estate villas. Tap any card to view it full screen, then swipe to browse.</p>
        </div>
        {/* Mobile: big, readable 9:16 style product cards */}
        <div className="md:hidden space-y-6">
          {models.map((m, i) => (
            <MobileProductCard
              key={m.id}
              image={m.img}
              onImageClick={() => setLightboxIndex(i)}
              imageAlt={`${m.id} ${m.name}`}
              imageFit="contain"
              title={m.id}
              subtitle={m.name}
              area={m.sqft}
              areaMetric={m.sqftMetric ? `(${m.sqftMetric})` : undefined}
              beds={m.beds}
              baths={m.baths}
              dimensions={m.dim || undefined}
              dimensionsMetric={m.dim ? m.dimMetric || undefined : undefined}
            />
          ))}
        </div>

        {/* Desktop: zoomable catalog grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative block w-full h-48 overflow-hidden cursor-zoom-in"
                aria-label={`View ${m.name} larger`}
              >
                <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                    <ZoomIn className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              </button>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-0.5">{m.id}</div>
                    <div className="font-heading font-bold text-foreground">{m.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary font-heading">{m.sqft}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {m.beds} Bed · {m.baths} Bath
                  {m.dim && ` · ${m.dim}${m.dimMetric ? ` (${m.dimMetric})` : ""}`}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <ImageLightbox
            key={lightboxIndex}
            images={lightboxImages}
            startIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
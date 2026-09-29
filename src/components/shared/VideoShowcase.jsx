import React from "react";
import { motion } from "framer-motion";

const videos = [
  {
    src: "https://media.base44.com/videos/public/6a3d99160f311f943d2b9488/2527ed7bf_HRG-101.mp4",
    id: "HRG-101",
    name: "Studio Cabin",
    sqft: "258 ft²",
  },
  {
    src: "https://media.base44.com/videos/public/6a3d99160f311f943d2b9488/53cf20b05_HRG-102.mp4",
    id: "HRG-102",
    name: "Single-Bedroom Suite",
    sqft: "452 ft²",
  },
  {
    src: "https://media.base44.com/videos/public/6a3d99160f311f943d2b9488/8c1830fee_HRG-104.mp4",
    id: "HRG-104",
    name: "Compact Two-Bedroom",
    sqft: "592 ft²",
  },
  {
    src: "https://media.base44.com/videos/public/6a3d99160f311f943d2b9488/61b13364d_HRG-112-withCustomLuxuryOptions.mp4",
    id: "HRG-112",
    name: "Modern Pool Villa: Luxury Options",
    sqft: "1,475 ft²",
  },
];

export default function VideoShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
          Model Walkthroughs
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-3xl font-normal text-foreground"
        >
          Explore Models in <em className="not-italic font-bold">Motion</em>
        </motion.h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Take a 3D walkthrough of select models from our 24-model standard catalog.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            className="group rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-card border border-border"
          >
            <div className="relative aspect-video bg-brand-dark">
              <video
                src={v.src}
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-foreground text-lg">{v.name}</h3>
                <p className="text-sm text-muted-foreground">Model {v.id}</p>
              </div>
              <span className="text-sm font-semibold text-primary">{v.sqft}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
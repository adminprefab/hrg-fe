import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

export default function BuildKeyInfo({ specs, floorPlan }) {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <SectionLabel>Key Information</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
            The <em className="not-italic font-bold">Essentials</em>
          </AnimatedHeading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                {s.label}
              </div>
              <div className="font-semibold text-foreground leading-snug">{s.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {floorPlan && (
        <section id="floor-plan" className="scroll-mt-24 bg-secondary/30 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-card border border-border rounded-lg p-4 md:p-8">
              <img src={floorPlan.src} alt={floorPlan.label} className="w-full object-contain" />
            </div>
            <p className="text-xs text-muted-foreground mt-4 uppercase tracking-wide">{floorPlan.label}</p>
          </div>
        </section>
      )}
    </>
  );
}
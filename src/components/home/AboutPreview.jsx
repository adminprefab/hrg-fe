import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

const ABOUT_IMG = "https://media.base44.com/images/public/6a3d99160f311f943d2b9488/64cd68929_modular-building-under-construction-in-large-indus-2026-03-18-21-33-00-utc.jpg";

export default function AboutPreview() {
  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <img src={ABOUT_IMG} alt="HRG Prefab facility" className="w-full h-[480px] object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-8 rounded-lg shadow-xl hidden md:block">
            <p className="font-heading text-4xl font-bold">14</p>
            <p className="text-sm uppercase tracking-wide">Years Building</p>
          </div>
        </motion.div>

        <div>
          <SectionLabel>About HRG Prefab</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal leading-tight mb-6 text-balance">
            We build the <em className="not-italic font-bold">extra space</em> your property has been waiting for.
          </AnimatedHeading>
          <p className="text-foreground/70 leading-relaxed mb-4">
            Whether it's a backyard ADU, an in-law suite, or a second-story addition, our team
            handles design, engineering, permitting, and installation under one roof. Every unit
            is built in our facility to the same standard, then delivered and set on your
            foundation in days, not months.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            No two lots are the same, so no two HRG units are either. We tailor layout, finishes,
            and exterior to fit your property and your local code.
          </p>
        </div>
      </div>
    </section>
  );
}
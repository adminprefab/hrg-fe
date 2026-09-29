import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HERO_IMG = "/assets/hero.webp";

const STEPS = ["Property", "Size", "Configuration", "Services", "Budget", "Proceed"];

export default function PBHero() {
  return (
    <section className="relative bg-brand-dark text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="A finished HRG semi-prefabricated backyard studio with glass sliding doors"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/50 to-brand-dark/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-5"
        >
          HRG Prefab Project Builder
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.05] max-w-3xl text-balance"
        >
          Your building.{" "}
          <em className="font-serif italic">$100 a square foot.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-lg text-white/75 leading-relaxed max-w-2xl"
        >
          HRG prefabricated building materials are $100 per square foot. Add land development or
          site work and assembly only if you need them, and see every price in real time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="#build"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
          >
            Start with my property
            <ArrowRight className="w-4 h-4" />
          </a>
          <span className="text-sm text-white/60">About 2 minutes. No account required.</span>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.15em] text-white/50"
        >
          {STEPS.map((s, i) => (
            <span key={s}>
              <span className="text-primary font-bold">0{i + 1}</span> {s}
            </span>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
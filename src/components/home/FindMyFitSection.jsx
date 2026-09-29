import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CARD_IMG = "https://hrgprefab-builder.pplx.app/assets/hero.webp";

export default function FindMyFitSection() {
  return (
    <section className="bg-config-page py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bg-brand-cream text-foreground max-w-5xl mx-auto border border-border"
        >
          <div className="absolute inset-0">
            <img
              src={CARD_IMG}
              alt="A finished HRG semi-prefabricated backyard studio with glass sliding doors"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-brand-cream/70" />
          </div>

          <div className="relative px-8 md:px-14 py-12 md:py-16 text-center flex flex-col items-center">
            <h2 className="font-heading text-3xl md:text-4xl font-normal leading-[1.1] text-balance max-w-2xl">
              HRG Prefab Project Builder
            </h2>
            <p className="mt-4 text-base md:text-lg text-foreground/70 leading-relaxed max-w-xl">
              Add land development or site work and assembly only if you need them, and see every
              price in real time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/project-builder"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
              >
                Start with my property
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-sm text-foreground/60">About 2 minutes. No account required.</span>
            </div>
            <p className="mt-6 text-sm text-foreground/50">
              Prefer to talk? (909) 616-1182 · (909) 274-0272 · (917) 559-5056
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
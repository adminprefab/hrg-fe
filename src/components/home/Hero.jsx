import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HERO_IMG =
  "https://media.base44.com/images/public/6aa6b441ec9ba0e9a14504fa/71126283d_000.png";

export default function Hero() {
  return (
    <section className="relative -mt-[68px] bg-brand-dark text-white overflow-hidden min-h-[58vh] flex items-center">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Modern HRG prefab home glowing at twilight" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/45 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-14 md:pb-16 w-full">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-5"
          >
            HRG Prefab · Turnkey ADUs
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.05] text-balance"
          >
            America's turnkey solution for <em className="not-italic font-bold">modern prefab living.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl"
          >
            From permitting to lights on, <br className="hidden md:block" />
            built to meet your jurisdiction’s codes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/project-builder"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
            >
              Start With My Property
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
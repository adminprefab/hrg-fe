import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function PageHero({ breadcrumb, label, title, subtitle, image }) {
  return (
    <section className="relative bg-brand-dark text-white overflow-hidden">
      {image ? (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/40 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
          <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
            <polygon points="600,40 200,380 1000,380" fill="none" stroke="white" strokeWidth="1.5" />
            <polygon points="600,80 300,380 900,380" fill="none" stroke="white" strokeWidth="1" />
            <polygon points="600,120 400,380 800,380" fill="none" stroke="white" strokeWidth="0.8" />
          </svg>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-24 md:pb-32">
        {breadcrumb && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-white/50 mb-6"
          >
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">{breadcrumb}</span>
          </motion.nav>
        )}

        {label && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
          >
            {label}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal leading-tight max-w-3xl text-balance"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg text-white/80 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
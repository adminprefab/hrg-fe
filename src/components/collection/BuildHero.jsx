import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function BuildHero({ collection, model, meta, price, blurb, hasFloorPlan, fit = "contain" }) {
  return (
    <section className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-14 md:pb-20">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-white/50 mb-8 flex-wrap"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/collection" className="hover:text-primary transition-colors">Collection</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/collection/${collection.slug}`} className="hover:text-primary transition-colors">
            {collection.name}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80">{model.name}</span>
        </motion.nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
            >
              {collection.name}
            </motion.span>
            {model.id && (
              <div className="text-xs font-bold uppercase tracking-widest text-primary/80">{model.id}</div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-3xl md:text-5xl font-normal leading-tight text-balance"
            >
              {model.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {meta.map((m) => (
                <span
                  key={m}
                  className="text-xs font-semibold uppercase tracking-wide bg-white/10 text-white/80 px-3 py-1.5 rounded"
                >
                  {m}
                </span>
              ))}
            </motion.div>
            {price && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 font-heading text-2xl font-bold text-primary"
              >
                {price}
              </motion.p>
            )}
            {blurb && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-4 text-white/70 leading-relaxed max-w-lg"
              >
                {blurb}
              </motion.p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/see-what-fits"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
              >
                Get My Project Estimate
              </Link>
              {hasFloorPlan && (
                <a
                  href="#floor-plan"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  View Floor Plan
                </a>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 lg:mt-0"
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={model.photo || model.img}
                alt={model.name}
                className={
                  fit === "cover"
                    ? "w-full h-[420px] md:h-[520px] object-cover"
                    : "w-full h-[400px] md:h-[540px] object-contain"
                }
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
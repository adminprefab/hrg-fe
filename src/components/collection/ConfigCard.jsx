import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ConfigCard({ config, collectionSlug, index = 0 }) {
  const to = config.custom ? "/see-what-fits" : `/collection/${collectionSlug}/${config.slug}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group bg-card border border-border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
    >
      <Link
        to={to}
        className={`block overflow-hidden ${config.fit === "contain" ? "h-72 md:h-96 bg-card" : "h-52 bg-secondary/40"}`}
      >
        <img
          src={config.img}
          alt={config.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full ${config.fit === "contain" ? "object-contain" : config.fit === "top" ? "object-cover object-top" : "object-cover object-center"} transition-transform duration-500 group-hover:scale-105`}
        />
      </Link>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-heading text-xl font-bold text-foreground">{config.name}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {config.meta.map((m) => (
            <span
              key={m}
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-secondary px-2.5 py-1 rounded"
            >
              {m}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{config.blurb}</p>
        {config.price && (
          <p className="mt-3 font-heading font-bold text-primary">{config.price}</p>
        )}
        <Link
          to={to}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary hover:underline"
        >
          {config.custom ? "See What Fits My Property" : "Explore This Build"}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
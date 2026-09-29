import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

const BASE = "https://media.base44.com/images/public/6a3d99160f311f943d2b9488";

const photos = [
  {
    src: `${BASE}/64cd68929_modular-building-under-construction-in-large-indus-2026-03-18-21-33-00-utc.jpg`,
    label: "Built in a controlled factory",
  },
  {
    src: `${BASE}/d9f9cfb48_crane-lifting-prefabricated-modular-house-in-large-2026-03-25-10-03-24-utc.jpg`,
    label: "Delivered and set by crane",
  },
  {
    src: `${BASE}/484b8aa8a_prefabricated-container-houses-in-building-under-c-2026-03-25-00-29-35-utc.jpg`,
    label: "Prefab structures in production",
  },
];

const stats = [
  { stat: "120+", label: "Units Installed" },
  { stat: "3–5 Days", label: "Average On-Site Install" },
  { stat: "98%", label: "Permit Approval Rate" },
];

export default function ProjectsProof() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>Proof</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground text-balance">
            Real projects, real drawings, <em className="not-italic font-bold">real results</em>
          </AnimatedHeading>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-lg overflow-hidden border border-border"
            >
              <img src={p.src} alt={p.label} className="w-full aspect-[4/3] object-cover" />
              <figcaption className="px-4 py-3 text-sm text-foreground/60 bg-card">{p.label}</figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-heading text-3xl font-normal text-primary">{s.stat}</div>
              <div className="text-xs uppercase tracking-[0.12em] text-foreground/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/70 hover:text-primary transition-colors"
          >
            See Our Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

const projects = [
  {
    type: "Detached ADU",
    name: "Maple Ridge Backyard Studio",
    spec: "Two-bedroom, 640 sq ft",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    type: "Attached Addition",
    name: "Cedar Hollow Family Suite",
    spec: "One-bedroom addition, 410 sq ft",
    img: "https://media.base44.com/images/public/6a3d99160f311f943d2b9488/a9af3a27e_generated_image.png",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <SectionLabel>Featured Projects</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-balance">
              See what we've <em className="not-italic font-bold">built recently</em>
            </AnimatedHeading>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wide hover:gap-3 transition-all"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link to="/projects" className="group block rounded-lg overflow-hidden">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-1 block">
                      {p.type}
                    </span>
                    <h3 className="font-heading text-2xl font-bold">{p.name}</h3>
                    <p className="text-sm text-white/70">{p.spec}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
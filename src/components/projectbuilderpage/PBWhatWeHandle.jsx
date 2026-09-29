import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import { PRICING, money } from "@/lib/projectPricing";

const CARDS = [
  {
    tag: "The building",
    price: `${money(PRICING.materialsRate)}/SF`,
    title: "Prefabricated Materials",
    copy: "The prefabricated building materials for your permitted structure. Delivery is 22% of materials.",
    featured: true,
  },
  {
    tag: "Optional add-on",
    price: null,
    title: "Land Development",
    copy: "Feasibility, design, engineering and permitting. From property to permit.",
    featured: false,
  },
  {
    tag: "Optional add-on",
    price: null,
    title: "Site Work + Assembly",
    copy: "Site preparation, utilities, foundation and on-site assembly through inspection.",
    featured: false,
  },
];

export default function PBWhatWeHandle() {
  return (
    <section id="scopes" className="py-20 md:py-24 bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <SectionLabel>What HRG handles</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl md:text-4xl font-normal text-balance">
            The building at <em className="font-serif italic">$100 a square foot.</em>
          </AnimatedHeading>
          <p className="mt-4 text-foreground/60 leading-relaxed">
            Your prefabricated building is priced by the square foot. Land development and site
            work and assembly are optional add-ons, each shown with its own projected budget.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`bg-card rounded-lg border p-8 flex flex-col ${
                c.featured ? "border-primary" : "border-border"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50">
                {c.tag}
              </span>
              {c.price && (
                <span className="mt-4 font-heading text-4xl font-bold text-primary">{c.price}</span>
              )}
              <h3 className="mt-4 font-heading text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-sm text-foreground/60 leading-relaxed flex-1">{c.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
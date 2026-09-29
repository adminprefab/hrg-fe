import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROTOTYPES } from "@/lib/prototypes";
import PageHero from "@/components/shared/PageHero";
import CTASection from "@/components/shared/CTASection";

const rows = [
  { label: "Total Area", values: ["500 sq ft", "800 sq ft"] },
  { label: "Footprint", values: ["28'6\" × 18'4\"", "28'6\" × 28'4\""] },
  { label: "Bedrooms", values: ["1", "2"] },
  { label: "Bathrooms", values: ["1", "1"] },
  { label: "Living / Dining / Kitchen", values: ["20' × 13' · 260 sq ft", "32' × 12' · 384 sq ft"] },
  { label: "Bedroom(s)", values: ["12' × 12' · 144 sq ft", "12' × 13' · 156 sq ft each"] },
  { label: "Closets", values: ["8' × 5' · 40 sq ft", "10' × 6' · 60 sq ft each"] },
  {
    label: "Best For",
    values: [
      "Smaller property or a simpler project: guest suite, office or compact rental",
      "More living space: full-time living, family or a two-bedroom rental",
    ],
  },
];

export default function CompareModels() {
  return (
    <div className="bg-brand-cream min-h-screen">
      <PageHero
        breadcrumb="Compare"
        label="500 vs 800"
        title={<>Compare the 500 <em className="not-italic font-bold">&amp; 800</em></>}
        subtitle="The same drawings we build from, side by side. Pick the one that fits your property, or let us recommend."
        image="https://media.base44.com/images/public/6a3d99160f311f943d2b9488/d9f9cfb48_crane-lifting-prefabricated-modular-house-in-large-2026-03-25-10-03-24-utc.jpg"
      />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {PROTOTYPES.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <h2 className="font-heading text-2xl font-bold mb-3">{m.name}</h2>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <img
                  src={m.image}
                  alt={`${m.name}: floor plan and elevation`}
                  className="w-full aspect-[4/3] object-contain p-4"
                />
              </div>
              <Link
                to={`/see-what-fits?model=${m.id}`}
                className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-6 py-3.5 rounded-md font-semibold uppercase tracking-wide text-sm hover:bg-primary/90 transition-colors"
              >
                Check This Model for My Property
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                  <tr className="border-b-2 border-foreground/20">
                    <th className="text-left py-4 px-4 text-xs uppercase tracking-wide text-foreground/50 font-semibold">Spec</th>
                    {PROTOTYPES.map((m) => (
                      <th key={m.id} className="text-left py-4 px-4 font-heading text-lg font-bold">
                        {m.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-border">
                      <td className="py-4 px-4 text-xs uppercase tracking-wide text-foreground/50 font-semibold">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="py-4 px-4 text-foreground/80">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-xs text-foreground/40 mt-4">
            All specs from the architectural concept sheets. Exact pricing quoted after a site review.
          </p>
        </div>
      </section>

      <CTASection
        label="Still Deciding?"
        title={<>Not sure which one? <em className="not-italic font-bold">That's what we're for.</em></>}
      />
    </div>
  );
}
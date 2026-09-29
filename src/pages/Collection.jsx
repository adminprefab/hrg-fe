import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import PropertyFitCTA from "@/components/collection/PropertyFitCTA";

const categories = [
  {
    slug: "prefab-design-build",
    title: "Prefab Design & Build",
    desc: "Customizable prefab homes designed around the customer's property.",
    cta: "Explore Prefab Homes",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
  {
    slug: "apple-cabin",
    title: "Apple Cabin",
    desc: "Architectural compact living with multiple size configurations.",
    cta: "Explore Apple Cabin",
    image: "https://images.unsplash.com/photo-1709418440553-289bf9f1ef80?w=1200&q=80",
  },
  {
    slug: "expandable-container",
    title: "Expandable Container",
    desc: "Flexible expandable living spaces for residential and other uses.",
    cta: "Explore Expandable Homes",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
  },
  {
    slug: "outdoor-kitchen",
    title: "Outdoor Kitchen",
    desc: "Outdoor kitchen configurations for different spaces and lifestyles.",
    cta: "Explore Outdoor Kitchens",
    image: "https://images.unsplash.com/photo-1762117360868-d4e757073d45?w=1200&q=80",
  },
];

export default function Collection() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="Collection"
        label="Our Builds"
        title={<>What are you looking <em className="not-italic font-bold">to build?</em></>}
        subtitle="Start with the kind of project you have in mind. We'll guide you from there: configuration, property fit, and estimate."
        image="https://images.unsplash.com/photo-1448630360428-65456885c650?w=1600&q=80"
      />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-3 leading-tight">
                  {cat.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{cat.desc}</p>
                <Link
                  to={`/collection/${cat.slug}`}
                  className="mt-auto inline-flex w-fit items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
                >
                  {cat.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <PropertyFitCTA
        title="Not sure what fits your property?"
        copy="Tell us about your property, available space, and what you're looking to build. We'll help determine the best starting point."
      />
    </div>
  );
}
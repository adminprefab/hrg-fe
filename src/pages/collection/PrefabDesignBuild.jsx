import React from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import CTASection from "@/components/shared/CTASection";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import VideoShowcase from "@/components/shared/VideoShowcase";
import ConfigCard from "@/components/collection/ConfigCard";
import PropertyFitCTA from "@/components/collection/PropertyFitCTA";
import ExploreMoreDesigns from "@/components/collection/ExploreMoreDesigns";
import SecondaryModelGrid from "@/components/collection/SecondaryModelGrid";
import { prefabModels, prefabConfigs } from "@/lib/collectionData";

const advantages = [
  { stat: "15–20 Days", label: "Construction Speed", desc: "On-site assembly time" },
  { stat: "100+ Years", label: "Service Life", desc: "Engineered durability" },
  { stat: "≥ 45 dB", label: "Sound Insulation", desc: "Quiet, comfortable interiors" },
  { stat: "≥ 18°F (10°C)", label: "Thermal Insulation", desc: "Indoor/outdoor differential" },
  { stat: "≥ 4 Hours", label: "Fire Resistance", desc: "High fire-rating assemblies" },
  { stat: "≥ 8.5", label: "Seismic Rating", desc: "Earthquake-resistant frame" },
  { stat: "≥ 93 MPH", label: "Wind Resistance", desc: "(150 km/h) sustained winds" },
];

const finishes = [
  {
    name: "Standard",
    price: "$79",
    desc: "Builder-grade fixtures, LVT flooring, painted drywall, stock cabinetry and countertops.",
    popular: false,
  },
  {
    name: "Premium",
    price: "$99",
    desc: "Engineered hardwood, quartz countertops, designer lighting, upgraded cabinetry and tile.",
    popular: true,
  },
  {
    name: "Luxury",
    price: "$129",
    desc: "Natural stone, custom millwork, high-end appliances, smart-home integration.",
    popular: false,
  },
];

const primarySlugs = ["hrg-101", "hrg-103", "hrg-106", "hrg-111", "hrg-110"];
const secondaryModels = prefabModels.filter((m) => !primarySlugs.includes(m.slug));

export default function PrefabDesignBuild() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="Prefab Design & Build"
        label="True Prefab"
        title={<>Modern Prefab Homes <em className="not-italic font-bold">Built</em> to Last</>}
        subtitle="Start from a recommended configuration, then adapt it to your property. Fully customizable, engineered to US specifications for speed, durability, and architectural quality."
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
      />

      {/* Starting configurations */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <SectionLabel>Starting Configurations</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground mb-4">
            Choose Your <em className="not-italic font-bold">Starting Point</em>
          </AnimatedHeading>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Six recommended configurations based on how you live. Each one is a starting point:
            every HRG home adapts to your property and requirements.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prefabConfigs.map((config, i) => (
            <ConfigCard key={config.name} config={config} collectionSlug="prefab-design-build" index={i} />
          ))}
        </div>
      </section>

      <PropertyFitCTA
        title="Not sure which home fits your property?"
        copy="Tell us about your property, space requirements, and project goals. We'll recommend the right starting configuration."
      />

      {/* Secondary designs behind progressive disclosure */}
      <ExploreMoreDesigns note="Still comparing? All 24 HRG designs remain available, and every one is a customizable starting point.">
        <SecondaryModelGrid models={secondaryModels} collectionSlug="prefab-design-build" />
      </ExploreMoreDesigns>

      {/* Advantages */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <SectionLabel>Why HRG Prefab</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground mb-4">
            The Home Remodel Group <em className="not-italic font-bold">Advantages</em>
          </AnimatedHeading>
          <p className="text-muted-foreground max-w-2xl mx-auto">Built to North American standards. Engineered for durability, efficiency, and rapid assembly.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {advantages.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <div className="text-2xl font-bold text-primary font-heading mb-1">{a.stat}</div>
              <div className="font-semibold text-sm text-foreground uppercase tracking-wide mb-1">{a.label}</div>
              <div className="text-xs text-muted-foreground">{a.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Finish Levels */}
      <section className="bg-secondary/40 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Pricing</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
              Finish <em className="not-italic font-bold">Levels</em>
            </AnimatedHeading>
            <p className="text-muted-foreground mt-3">Three finish packages, pricing per square foot of conditioned floor area.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finishes.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-lg p-8 text-center relative ${f.popular ? "bg-primary text-primary-foreground shadow-xl scale-105" : "bg-card border border-border"}`}
              >
                {f.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className={`font-heading font-bold uppercase tracking-widest text-sm mb-3 ${f.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{f.name}</div>
                <div className={`text-5xl font-bold font-heading mb-1 ${f.popular ? "text-primary-foreground" : "text-primary"}`}>{f.price}</div>
                <div className={`text-sm mb-4 ${f.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>per ft²</div>
                <p className={`text-sm leading-relaxed font-semibold ${f.popular ? "text-primary-foreground" : "text-foreground"}`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6">Pricing illustrative. Excludes site preparation, foundation, utility connections, permits, and applicable taxes.</p>
        </div>
      </section>

      {/* Video Walkthroughs */}
      <VideoShowcase />

      <CTASection
        label="Get Started"
        title="Ready to build your dream home?"
        buttonText="Get My Project Estimate"
      />
    </div>
  );
}
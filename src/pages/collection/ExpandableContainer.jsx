import React from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import CTASection from "@/components/shared/CTASection";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import ImageCarousel from "@/components/shared/ImageCarousel";
import ClickableImage from "@/components/shared/ClickableImage";
import ConfigCard from "@/components/collection/ConfigCard";
import PropertyFitCTA from "@/components/collection/PropertyFitCTA";
import ExploreMoreDesigns from "@/components/collection/ExploreMoreDesigns";
import SecondaryModelGrid from "@/components/collection/SecondaryModelGrid";
import {
  expandableModels,
  expandableConfigs,
  expandableCatalogue,
  expandableRealProjects,
} from "@/lib/collectionData";

const highlights = [
  { stat: "6 Tons", label: "Structural Load", desc: "Same as a full-grown male elephant" },
  { stat: "15–20 Days", label: "Assembly Time", desc: "Rapid deployment on site" },
  { stat: "Unlimited", label: "Disassembly Cycles", desc: "Welded high-strength hinges at joints" },
  { stat: "100%", label: "Factory Built", desc: "Ships compressed, expands on site" },
];

const primarySlugs = ["standard-cabin", "deluxe-cabin", "container-home", "office-commercial", "cafe-restaurant"];
const secondaryModels = expandableModels.filter((m) => !primarySlugs.includes(m.slug));

export default function ExpandableContainer() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="Expandable Container Home"
        label="Container Living"
        title={<>Expandable Container <em className="not-italic font-bold">Home</em></>}
        subtitle="A flexible, modern living solution designed to maximize space, efficiency, and long-term value. Ships compressed, deploys in hours."
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
      />

      {/* Key Highlights */}
      <section className="max-w-7xl mx-auto px-6 py-20 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <div className="text-2xl font-bold text-primary font-heading mb-1">{h.stat}</div>
              <div className="font-semibold text-sm text-foreground uppercase tracking-wide mb-1">{h.label}</div>
              <div className="text-xs text-muted-foreground">{h.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Starting configurations */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <SectionLabel>Starting Configurations</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground mb-4">
            Choose Your <em className="not-italic font-bold">Starting Point</em>
          </AnimatedHeading>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Organized around how you'll use the space: from compact living to full family homes,
            offices, and commercial use. Each configuration is a starting point we adapt to your
            property.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expandableConfigs.map((config, i) => (
            <ConfigCard key={config.name} config={config} collectionSlug="expandable-container" index={i} />
          ))}
        </div>
      </section>

      <PropertyFitCTA
        title="Not sure which configuration fits your property?"
        copy="Tell us about your property, available space, and what you're looking to build. We'll help determine the best starting point."
      />

      {/* Secondary designs behind progressive disclosure */}
      <ExploreMoreDesigns note="Two-story variants and additional designs remain available.">
        <SecondaryModelGrid models={secondaryModels} collectionSlug="expandable-container" />

        <div className="mt-14">
          <div className="text-center mb-10">
            <SectionLabel>Real Projects</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
              Deployed <em className="not-italic font-bold">Worldwide</em>
            </AnimatedHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expandableRealProjects.map((p) => (
              <div key={p.name} className="rounded-lg overflow-hidden">
                <ClickableImage
                  src={p.img}
                  alt={p.name}
                  className="w-full h-56"
                  rounded="none"
                  label={`${p.name} · ${p.type}`}
                />
                <div className="bg-card border border-border p-4">
                  <div className="font-semibold text-foreground">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.type}</div>
                  <div className="text-xs text-primary mt-1">{p.color}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <ImageCarousel images={expandableCatalogue} />
        </div>
      </ExploreMoreDesigns>

      {/* How Expansion Works */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <SectionLabel>Technology</SectionLabel>
        <AnimatedHeading className="font-heading text-3xl font-normal text-foreground mb-6">
          How <em className="not-italic font-bold">Expansion</em> Works
        </AnimatedHeading>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Each unit ships in a compressed container format: roughly the footprint of a standard
          shipping container. On arrival, the side walls fold out using welded high-strength hinges
          at the joints, doubling or tripling the interior floor area within hours. No crane needed
          for smaller units. The structural frame rated at 6 tons ensures the expanded structure is
          rock-solid and weather-tight.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { step: "1. Deliver", desc: "Unit arrives on site in compressed shipping-container format via standard flatbed truck." },
            { step: "2. Position", desc: "Place on a prepared foundation or leveling jacks. No crane required for single-floor units." },
            { step: "3. Expand", desc: "Pull out the side walls: they fold open on high-strength hinges. Connect utilities and move in." },
          ].map((s) => (
            <div key={s.step} className="bg-card border border-border rounded-lg p-6">
              <div className="text-primary font-bold font-heading text-lg mb-2">{s.step}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        label="Get Started"
        title="Interested in an Expandable Container Home?"
        buttonText="Get My Project Estimate"
      />
    </div>
  );
}
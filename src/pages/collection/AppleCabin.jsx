import React from "react";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import ConfigCard from "@/components/collection/ConfigCard";
import PropertyFitCTA from "@/components/collection/PropertyFitCTA";
import { appleConfigs } from "@/lib/collectionData";

export default function AppleCabin() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="Apple Cabin"
        label="Apple Cabin Collection"
        title={<>One Architectural Concept. <em className="not-italic font-bold">Six Useful Sizes.</em></>}
        subtitle="Premium prefabricated prefab structures engineered for durability, energy efficiency, and rapid deployment. Ships fully assembled for plug-and-play on-site installation."
        image="https://images.unsplash.com/photo-1709418440553-289bf9f1ef80?w=1600&q=80"
      />

      {/* Starting configurations */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <SectionLabel>Starting Configurations</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground mb-4">
            Choose Your <em className="not-italic font-bold">Starting Size</em>
          </AnimatedHeading>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            One architectural concept, organized by size and living requirements. Each configuration
            is a starting point that we adapt to your site.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appleConfigs.map((config, i) => (
            <ConfigCard key={config.name} config={config} collectionSlug="apple-cabin" index={i} />
          ))}
        </div>
      </section>

      <PropertyFitCTA
        title="Need help choosing the right size?"
        copy="Tell us about your property and how you plan to live. We'll recommend the right starting size."
      />
    </div>
  );
}
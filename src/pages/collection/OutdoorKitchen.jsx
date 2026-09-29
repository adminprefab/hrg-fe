import React from "react";
import PageHero from "@/components/shared/PageHero";
import CTASection from "@/components/shared/CTASection";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import ImageCarousel from "@/components/shared/ImageCarousel";
import ConfigCard from "@/components/collection/ConfigCard";
import PropertyFitCTA from "@/components/collection/PropertyFitCTA";
import ExploreMoreDesigns from "@/components/collection/ExploreMoreDesigns";
import SecondaryModelGrid from "@/components/collection/SecondaryModelGrid";
import { kitchenModels, kitchenConfigs, kitchenCatalogue } from "@/lib/collectionData";

const countertops = [
  { name: "15mm Sintered Stone", desc: "Heat-resistant, scratch-proof, UV-stable. The most popular choice for outdoor use." },
  { name: "20mm Quartz Stone", desc: "Non-porous, low maintenance. Elegant appearance with superior hardness." },
  { name: "15mm 304 Stainless Steel", desc: "Maximum durability and hygiene. Industrial aesthetic, completely weatherproof." },
];

const doorPanels = [
  { name: "20mm Lacquer Glass", desc: "Smooth, high-gloss finish available in black, white, blue, and custom colors." },
  { name: "16mm 304 Stainless Steel", desc: "Brushed or polished. Resists corrosion, heat, and impact." },
  { name: "20mm Sintered Stone", desc: "Match the countertop for a seamless monolithic look." },
];

const appliances = [
  "Built-in Gas BBQ Grills (3–6 burners)", "Kamado Ceramic Grill", "Pizza Oven",
  "Flatbed Gas Griddle", "Beverage Refrigerator (single and double-door)",
  "Ice Maker", "Under-counter Drawer Refrigerator", "Stainless Sink with Faucet",
  "Spice Rack", "RO Water Filter", "Electric Motorized Curtains",
];

export default function OutdoorKitchen() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="Outdoor Kitchen"
        label="Outdoor Kitchen Cabinets"
        title={<>Premium Outdoor <em className="not-italic font-bold">Kitchens</em></>}
        subtitle="Factory-direct outdoor kitchen cabinet systems with sintered stone countertops, lacquer glass or stainless door panels, and CE-certified appliances."
        image="https://images.unsplash.com/photo-1762117360868-d4e757073d45?w=1600&q=80"
      />

      {/* Starting configurations */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <SectionLabel>Starting Configurations</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground mb-4">
            Choose Your <em className="not-italic font-bold">Starting Point</em>
          </AnimatedHeading>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Five understandable configurations, from a compact cooking setup to a full entertainment
            island. Each one is a starting point: every kitchen is sized and finished around your
            exact outdoor space.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchenConfigs.map((config, i) => (
            <ConfigCard key={config.name} config={config} collectionSlug="outdoor-kitchen" index={i} />
          ))}
        </div>
      </section>

      <PropertyFitCTA
        title="Not sure what fits your outdoor space?"
        copy="Tell us about your patio or outdoor area and how you like to entertain. We'll recommend the right starting configuration."
        buttonText="See What Fits My Space"
      />

      {/* Secondary designs behind progressive disclosure */}
      <ExploreMoreDesigns note="All 15 standard kitchen models and material options remain available.">
        <SecondaryModelGrid models={kitchenModels} collectionSlug="outdoor-kitchen" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Materials</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-bold text-foreground mb-8">
              Countertop <em className="not-italic font-bold">Options</em>
            </AnimatedHeading>
            <div className="space-y-4">
              {countertops.map((c, i) => (
                <div key={c.name} className="bg-card border border-border rounded-lg p-5">
                  <div className="font-semibold text-foreground mb-1">({i + 1}) {c.name}</div>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Finishes</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-bold text-foreground mb-8">
              Door Panel <em className="not-italic font-bold">Options</em>
            </AnimatedHeading>
            <div className="space-y-4">
              {doorPanels.map((d, i) => (
                <div key={d.name} className="bg-card border border-border rounded-lg p-5">
                  <div className="font-semibold text-foreground mb-1">({i + 1}) {d.name}</div>
                  <p className="text-sm text-muted-foreground">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <SectionLabel>CE Certified</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground mb-8">
            Available <em className="not-italic font-bold">Appliances</em>
          </AnimatedHeading>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
            {appliances.map((a) => (
              <div key={a} className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground">{a}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-6">All appliances are CE certified and support custom logo branding.</p>
        </div>

        <div className="mt-16">
          <ImageCarousel images={kitchenCatalogue} />
        </div>
      </ExploreMoreDesigns>

      <CTASection
        label="Get Started"
        title="Design your perfect outdoor kitchen."
        buttonText="Get My Project Estimate"
      />
    </div>
  );
}
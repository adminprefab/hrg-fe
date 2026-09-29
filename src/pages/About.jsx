import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Factory } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import CTASection from "@/components/shared/CTASection";

const STORY_IMG = "https://media.base44.com/images/public/6a3d99160f311f943d2b9488/484b8aa8a_prefabricated-container-houses-in-building-under-c-2026-03-25-00-29-35-utc.jpg";

const principles = [
  { icon: ShieldCheck, title: "Built to Code, Every Time", desc: "Engineering and permitting are handled in-house so every unit clears inspection the first time." },
  { icon: Clock, title: "Honest Timelines", desc: "We quote realistic schedules and communicate early if anything on-site changes the plan." },
  { icon: Factory, title: "Quality That Doesn't Vary", desc: "Factory conditions mean the same materials and process on unit one and unit one hundred." },
];

const stats = [
  { value: "120+", label: "Units Installed" },
  { value: "14", label: "Years Building" },
  { value: "98%", label: "On-Time Delivery" },
];

export default function About() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        label="About HRG Prefab"
        title={<>Built off-site. <em className="not-italic font-bold">Built to last.</em></>}
        subtitle="We started HRG Prefab to make adding real, livable space to a property faster and more predictable than traditional construction, without cutting corners on quality."
        image="https://media.base44.com/images/public/6a3d99160f311f943d2b9488/d9f9cfb48_crane-lifting-prefabricated-modular-house-in-large-2026-03-25-10-03-24-utc.jpg"
      />

      {/* Our Story */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal mb-6 text-balance">
              A <em className="not-italic font-bold">factory-first</em> approach to home additions
            </AnimatedHeading>
            <p className="text-foreground/70 leading-relaxed mb-4">
              HRG Prefab, a division of The Home Remodel Group, was founded by builders who were
              tired of seeing good projects stall out on weather delays, subcontractor scheduling,
              and on-site rework. We moved the build indoors.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Every HRG unit, whether it's a detached backyard ADU or an attached suite, is
              framed, wired, insulated, and finished in our climate-controlled facility under
              consistent quality control, then transported and set on your property once your
              site and foundation are ready.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              The result: fewer surprises, a tighter timeline, and a finished space that holds
              up the same way whether it was built in July or January.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg overflow-hidden shadow-2xl"
          >
            <img src={STORY_IMG} alt="HRG Prefab facility" className="w-full h-[500px] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>What We Stand For</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-balance">
              The principles behind <em className="not-italic font-bold">every build</em>
            </AnimatedHeading>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-5 mx-auto">
                  <p.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{p.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <SectionLabel>Our Team</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal mb-6 text-balance">
              Builders, designers, and project managers <em className="not-italic font-bold">under one roof</em>
            </AnimatedHeading>
            <p className="text-foreground/70 leading-relaxed">
              Our in-house team covers architectural design, structural engineering,
              manufacturing, and on-site installation, so you have one point of contact from
              first sketch to final walkthrough, not a chain of subcontractors.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-4">
              We work in close partnership with local jurisdictions to keep permitting moving
              and make sure every unit is fully compliant with your area's ADU and zoning
              requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-card rounded-lg p-10 border border-border"
              >
                <p className="font-heading text-5xl font-bold text-primary mb-2">{s.value}</p>
                <p className="text-sm uppercase tracking-[0.15em] text-foreground/50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        label="Work With Us"
        title={<>See if a prefab addition <em className="not-italic font-bold">fits your lot</em></>}
        buttonText="Get Your Free Estimate"
      />
    </>
  );
}
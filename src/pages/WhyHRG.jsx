import React from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import CTASection from "@/components/shared/CTASection";
import ClickableImage from "@/components/shared/ClickableImage";

const IMG = {
  hero: "https://media.base44.com/images/public/6aa6b441ec9ba0e9a14504fa/71126283d_000.png",
  p500: "https://media.base44.com/images/public/6aa6b441ec9ba0e9a14504fa/79d69cf51_ChatGPTImageSep15202611_38_06PM.png",
  p800: "https://media.base44.com/images/public/6aa6b441ec9ba0e9a14504fa/9c606ef6f_ChatGPTImageSep15202611_38_00PM.png",
  prefab: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  interior: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
  materials: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
};

const SUPPORT = [
  {
    title: "Complete Project Coordination",
    text: "A white-glove service connecting the pieces from initial planning through completion, with construction performed by appropriately licensed contractors under separate agreements.",
    image: IMG.interior,
  },
  {
    title: "Your Build, Our Materials",
    text: "Choose the materials, prefab packages, and coordination support you need. Bring your own team and handle the parts you want to manage.",
    image: IMG.materials,
  },
];

export default function WhyHRG() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="Why HRG"
        label="Why HRG"
        title={<>Modern living deserves a <em className="not-italic font-bold">simpler process.</em></>}
        subtitle="HRG began with a question: Why does building a permanent home still feel so complicated?"
        image={IMG.hero}
      />

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>Why HRG</SectionLabel>
            <AnimatedHeading className="font-heading text-2xl md:text-3xl font-normal text-foreground">
              Prefabricated materials. <em className="not-italic font-bold">A permanent home.</em>
            </AnimatedHeading>
            <p className="mt-6 text-foreground/70 leading-relaxed">
              Roughly one-third less cost and time than a comparable traditional build.
            </p>
            <p className="mt-4 text-foreground/70 leading-relaxed">
              We coordinate every step, from materials and on-site assembly to permits, inspections, and lights on.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <ClickableImage
              src={IMG.prefab}
              alt="Modern prefab home built by HRG"
              label="Prefabricated construction, modern tools"
              className="w-full h-80"
            />
          </motion.div>
        </div>
      </section>

      {/* Levels of support */}
      <section className="bg-secondary/30 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Flexible by design</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl md:text-4xl font-normal text-foreground">
              Your project. <em className="not-italic font-bold">Your level of support.</em>
            </AnimatedHeading>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {SUPPORT.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg overflow-hidden group"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{s.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prototypes to custom */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="text-center mb-14">
          <SectionLabel>Start Here</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl md:text-4xl font-normal text-foreground">
            From prototypes to <em className="not-italic font-bold">custom possibilities.</em>
          </AnimatedHeading>
          <p className="mt-5 text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            Start with a thoughtfully designed prototype or explore a custom solution. We coordinate vendors and
            project resources across the contiguous 48 states, with each project subject to local requirements and
            service availability. Financing options are available through lending partners, subject to approval.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ClickableImage src={IMG.p500} alt="500 SF prototype render" label="500 SF Prototype" className="w-full h-72" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ClickableImage src={IMG.p800} alt="800 SF prototype render" label="800 SF Prototype" className="w-full h-72" />
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
        >
          Our purpose is simple: help bring your vision for a permanent, modern home to life with clearer steps,
          greater flexibility, and personal attention.
        </motion.p>
      </section>

      <CTASection
        label="Next Step"
        title={<>Let’s Talk About Your <em className="not-italic font-bold">Project</em></>}
      />
    </div>
  );
}
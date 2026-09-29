import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import CTASection from "@/components/shared/CTASection";
import ProjectModal from "@/components/projects/ProjectModal";

const projects = [
  {
    label: "Detached ADU",
    title: "Compact Design. Premium Living.",
    subtitle: "Bedrooms: Studio / 1 Bath ~600 Sq Ft",
    img: "https://media.base44.com/images/public/6a3d99160f311f943d2b9488/a1addcb0b_2.png",
    description:
      "This thoughtfully designed studio ADU proves that smaller spaces can still feel open and luxurious. Clean architectural lines, oversized sliding glass doors, and premium finishes make it ideal for guests, rental income, or a private workspace.",
    tags: [
      { label: "Size", value: "~600 Sq Ft" },
      { label: "Bedrooms", value: "Studio / 1 Bath" },
      { label: "Use", value: "ADU • Rental • Home Office" },
      { label: "Style", value: "Modern" },
      { label: "Roof", value: "Shed" },
      { label: "Exterior", value: "Vertical Charcoal Siding" },
    ],
  },
  {
    label: "Detached ADU",
    title: "Contemporary Indoor-Outdoor Living",
    subtitle: "Bedrooms: 3 Bed / 2 Bath ~1,500 Sq Ft",
    img: "https://media.base44.com/images/public/6a3d99160f311f943d2b9488/f6d897bd5_3.png",
    description:
      "A spacious modern home centered around seamless indoor-outdoor living. Expansive glass doors, natural wood finishes, and a covered patio create the perfect space for entertaining while maximizing natural light.",
    tags: [
      { label: "Size", value: "~1,500 Sq Ft" },
      { label: "Bedrooms", value: "3 Bed / 2 Bath" },
      { label: "Use", value: "Primary Residence • Family Home" },
      { label: "Style", value: "Contemporary" },
      { label: "Roof", value: "Butterfly" },
      { label: "Exterior", value: "Cedar + Charcoal Accents" },
    ],
  },
  {
    label: "Detached ADU",
    title: "Minimalist California Design",
    subtitle: "Bedrooms: 2 Bed / 2 Bath ~1,000 Sq Ft",
    img: "https://media.base44.com/images/public/6a3d99160f311f943d2b9488/0e1bcffc5_4.png",
    description:
      "A sleek flat-roof design with oversized glass openings and warm wood accents. Perfect for homeowners seeking a modern backyard residence that complements today's Southern California lifestyle.",
    tags: [
      { label: "Size", value: "~1,000 Sq Ft" },
      { label: "Bedrooms", value: "2 Bed / 2 Bath" },
      { label: "Use", value: "ADU • Multigenerational Living • Rental" },
      { label: "Style", value: "Modern Contemporary" },
      { label: "Roof", value: "Flat" },
      { label: "Exterior", value: "Smooth Stucco + Wood Accent" },
    ],
  },
  {
    label: "Detached ADU",
    title: "Luxury Poolside Guest House",
    subtitle: "Bedrooms: 2 Bed / 2 Bath ~1,200 Sq Ft",
    img: "https://media.base44.com/images/public/6a3d99160f311f943d2b9488/b1c5c77db_5.png",
    description:
      "Designed to extend your outdoor living space, this modern pool house features expansive glass walls, shaded patios, and elegant architectural details. An ideal solution for entertaining, hosting guests, or creating a private retreat.",
    tags: [
      { label: "Size", value: "~1,200 Sq Ft" },
      { label: "Bedrooms", value: "2 Bed / 2 Bath" },
      { label: "Use", value: "Pool House • Guest House • ADU" },
      { label: "Style", value: "Modern" },
      { label: "Roof", value: "Flat" },
      { label: "Exterior", value: "Smooth Stucco + Natural Wood" },
    ],
  },
  {
    label: "Detached ADU",
    title: "Architectural Statement Piece",
    subtitle: "Bedrooms: Studio / 1 Bath ~750 Sq Ft",
    img: "https://media.base44.com/images/public/6a3d99160f311f943d2b9488/83033567a_7.png",
    description:
      "Floor-to-ceiling glass, clean modern lines, and premium materials create a truly distinctive living space. Ideal for a luxury guest suite, creative studio, or executive home office that feels connected to nature.",
    tags: [
      { label: "Size", value: "~750 Sq Ft" },
      { label: "Bedrooms", value: "Studio / 1 Bath" },
      { label: "Use", value: "Guest Suite • Creative Studio • Home Office" },
      { label: "Style", value: "Ultra Modern" },
      { label: "Roof", value: "Flat" },
    ],
  },
  {
    label: "Prefab Pool",
    title: "Prefab Pool",
    subtitle: "Prefab / Factory-Built ~480 Sq Ft",
    img: "https://media.base44.com/images/public/6a3d99160f311f943d2b9488/75e29ec8b_10.png",
    description:
      "A sleek, factory-built prefab pool engineered for precision and fast installation, featuring integrated entry steps, premium stone coping, and a clean architectural finish. A streamlined way to elevate any backyard with lasting quality and minimal disruption.",
    tags: [
      { label: "Size", value: "~12' × 40' (Approx. 480 Sq Ft)" },
      { label: "Type", value: "Prefab / Factory-Built" },
      { label: "Features", value: "Integrated Entry Steps • Premium Stone Coping" },
      { label: "Style", value: "Modern Architectural" },
      { label: "Finish", value: "Clean, Streamlined Design" },
      { label: "Installation", value: "Fast, Low-Disruption" },
    ],
  },
];

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PageHero
        breadcrumb="Projects"
        label="Featured Projects"
        title={<>Find ideas for your <em className="not-italic font-bold">own addition</em></>}
        subtitle="A look at recent ADUs and additions we've designed, built, and installed."
        image="https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=1600&q=80"
      />

      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.button
                key={p.title}
                onClick={() => setSelected(p)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
                className="group rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow text-left cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-heading text-xl font-bold mb-1">{p.title}</h3>
                    <p className="text-sm text-white/70">{p.subtitle}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        label="Your Project Next"
        title={<>Have a similar space <em className="not-italic font-bold">in mind?</em></>}
        buttonText="Get Your Free Estimate"
      />

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
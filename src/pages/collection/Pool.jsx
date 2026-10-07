import React from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import CTASection from "@/components/shared/CTASection";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import ImageCarousel from "@/components/shared/ImageCarousel";
import ClickableImage from "@/components/shared/ClickableImage";

const POOL_BASE = "https://media.base44.com/images/public/6a3d99160f311f943d2b9488";

const poolGalleryImages = [
  { src: `${POOL_BASE}/7433b4774_Poolcatalg-05.png`, label: "Villa Sky, Dubai Hills Estate" },
  { src: `${POOL_BASE}/cd6e406b0_Poolcatalg-07.png`, label: "Main & Kid Swimming Pool, Dubai" },
  { src: `${POOL_BASE}/d58ba8f5f_Poolcatalg-08.png`, label: "Al-Mana Hotel, Doha, Qatar" },
  { src: `${POOL_BASE}/345ae38cd_Poolcatalg-09.png`, label: "Resort Hotel, Jeddah, Saudi Arabia" },
  { src: `${POOL_BASE}/bc86afbb8_Poolcatalg-10.png`, label: "Acrylic Swimming Pool, Riyadh, Saudi Arabia" },
  { src: `${POOL_BASE}/7013b2df9_Poolcatalg-11.png`, label: "Water Pool Villa, Muscat, Oman" },
  { src: `${POOL_BASE}/de69be7e0_Poolcatalg-12.png`, label: "Home Acrylic Swimming Pool, Baghdad, Iraq" },
  { src: `${POOL_BASE}/fa44ed4fe_Poolcatalg-16.png`, label: "Curved Acrylic Window, Oregon, USA" },
  { src: `${POOL_BASE}/6360a9d6b_Poolcatalg-17.png`, label: "Swimming Pool on Yacht, Ancona, Italy" },
  { src: `${POOL_BASE}/7e53a5126_Poolcatalg-18.png`, label: "Demo Tube Cover, Bern, Switzerland" },
  { src: `${POOL_BASE}/e9cc6623a_Poolcatalg-29.png`, label: "Gujarat Science City Aquarium, India" },
  { src: `${POOL_BASE}/892380b8c_Poolcatalg-32.png`, label: "SKY Pool, Da Nang, Vietnam" },
  { src: `${POOL_BASE}/379ead134_Poolcatalg-34.png`, label: "Aqualab, Seria Energy Lab, Brunei" },
];

const projectsGCC = [
  { project: "BINGHATTI Apartments", usage: "Acrylic side panel for balcony swimming pool", thick: "60 mm", location: "Jumeirah Village Circle, Dubai" },
  { project: "Villa of UMM SEQUIM", usage: "Acrylic floor panel, side panel for pool", thick: "120 mm", location: "UMM SEQUIM, Dubai" },
  { project: "Villa in Mille Colline", usage: "Acrylic Floor Panel, Wall Panel", thick: "120 mm", location: "Mille Colline, Dubai" },
  { project: "Private Villa Al Barari", usage: "Acrylic side panel, floor panel", thick: "150 mm", location: "Al Barari, Dubai" },
  { project: "Al-Mana Hotel, Doha Qatar", usage: "Hanging acrylic pool", thick: "130 mm", location: "Doha, Qatar" },
  { project: "Resort Hotel, Jeddah Saudi", usage: "Acrylic Side Panel", thick: "150 mm", location: "Jeddah, Saudi Arabia" },
  { project: "Acrylic Swimming Pool", usage: "Acrylic Side Panel", thick: "120 mm", location: "Riyadh, Saudi Arabia" },
  { project: "Water Pool in Villa", usage: "Acrylic Floor", thick: "100 mm", location: "Muscat, Oman" },
];

const projectsEurope = [
  { project: "VAI Resort Swimming Pool", usage: "Acrylic side panel", thick: "60 mm", location: "Glendale, AZ, United States" },
  { project: "Swimming Pool for House (Oregon)", usage: "Acrylic curved Side Panel", thick: "100 mm", location: "Oregon, U.S." },
  { project: "Swimming Pool on YACHT", usage: "Acrylic side panel", thick: "130 mm", location: "Ancona, Italy" },
  { project: "Sky Roof Pool", usage: "Acrylic sky window", thick: "120 mm", location: "Copenhagen, Denmark" },
  { project: "Backyard SPO Swimming Pool", usage: "Acrylic side panel for SPO Pool", thick: "60 mm", location: "El Dorado Hills, CO, U.S." },
  { project: "Swimming Pool in Backyard (Kosovo)", usage: "Acrylic window", thick: "100 mm", location: "Suhareka, Kosovo" },
];

const projectsAsia = [
  { project: "Finolhu Island Resort Villas", usage: "Acrylic floor panel, side panel", thick: "60–110 mm", location: "Finolhu Baa Atoll, Maldives" },
  { project: "Nayyahuchi Underwater Resort", usage: "Acrylic Panels for Underwater Window", thick: "120 mm", location: "Nayyahuchi Island, Maldives" },
  { project: "Gujarat Science City Aquarium", usage: "Acrylic Panel, Tunnel, Cylinder", thick: "330 mm", location: "Gujarat, India" },
  { project: "SKY Pool, Da-Nang Vietnam", usage: "Acrylic side pool (4 sides)", thick: "250 mm", location: "Da-Nang, Vietnam" },
  { project: "Acrylic SKY Swimming Pool, Cambodia", usage: "Acrylic Side Panel, Floor Panel", thick: "130 mm", location: "Phnom Penh, Cambodia" },
  { project: "Lee Residence Swimming Pool, Philippines", usage: "Acrylic side panels and floor panel", thick: "110 mm", location: "Pampanga, Philippines" },
];

const products = [
  { name: "Acrylic Side Panel", desc: "Crystal-clear acrylic walls for pools, allowing underwater viewing from outside. Available in any dimension up to 320mm thickness." },
  { name: "Acrylic Floor Panel", desc: "Walk-on transparent pool floor. Allows light transmission and viewing from below. Standard and custom sizes." },
  { name: "Acrylic Wall Panel", desc: "Interior swimming pool wall lining. Smooth, non-porous surface resistant to chemicals and UV." },
  { name: "Acrylic Sky Window", desc: "Pool bottom as a ceiling, creating the dramatic 'sky pool' floating effect. Structural-grade panels with steel framing system." },
  { name: "Acrylic Tunnel", desc: "Walk-through aquarium tunnels. Curved extrusion, available up to 3.5m diameter." },
  { name: "Acrylic Cylinder & Aquarium", desc: "Custom shapes for aquariums, hotel lobbies, and commercial spaces. Up to 72,000 liters capacity." },
];

// Project list: a table where there is room for five columns, one card per project on phones,
// where the table would otherwise be squeezed into a sideways scroll.
function ProjectList({ projects, productLabel }) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-brand-dark text-white">
              <th className="text-left p-4 font-semibold">Project</th>
              <th className="text-left p-4 font-semibold">{productLabel}</th>
              <th className="text-left p-4 font-semibold">Max Thickness</th>
              <th className="text-left p-4 font-semibold">Location</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-secondary/20"}>
                <td className="p-4 font-semibold text-foreground">{p.project}</td>
                <td className="p-4 text-muted-foreground">{p.usage}</td>
                <td className="p-4 text-muted-foreground">{p.thick}</td>
                <td className="p-4 text-muted-foreground">{p.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">
        {projects.map((p, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground leading-snug">{p.project}</h4>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-foreground/50">{p.location}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {p.usage} · {p.thick}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Pool() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="Pools"
        label="Acrylic Pools"
        title={<>Premium Acrylic for Pool & <em className="not-italic font-bold">Aquarium</em></>}
        subtitle="Transparent acrylic pool walls, floors and sky windows, engineered to specification and added to your HRG project."
        image="https://images.unsplash.com/photo-1603085429201-64dadaec4061?w=1600&q=80"
      />

      {/* Slideable Catalogue Gallery */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <SectionLabel>Acrylic Pools</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
            Pool & Aquarium <em className="not-italic font-bold">Gallery</em>
          </AnimatedHeading>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Swipe through our catalogue of acrylic pool and aquarium projects. Click any image to view it full screen.</p>
        </div>
        <ImageCarousel images={poolGalleryImages} />
      </section>

      {/* Product Types */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <SectionLabel>What We Supply</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
            Acrylic Pool <em className="not-italic font-bold">Products</em>
          </AnimatedHeading>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Factory-produced acrylic panels engineered to specification: any size, any shape, any thickness up to 330mm.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="w-2 h-8 bg-primary rounded mb-4"></div>
              <h3 className="font-heading font-bold text-foreground mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Gallery — GCC */}
      <section className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>GCC / Middle East / West Asia</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
              Featured <em className="not-italic font-bold">Projects</em>
            </AnimatedHeading>
          </div>

          {/* Dubai Highlight */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <ClickableImage src={`${POOL_BASE}/7433b4774_Poolcatalg-05.png`} alt="Villa Sky transparent pool, Dubai Hills Estate" className="w-full h-72" label="Villa Sky, Dubai Hills Estate" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center"
            >
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Dubai, UAE</div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Villa Sky Transparent Pool</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">A pool cantilevered out over the terrace, with an acrylic floor and walls you can see straight through. Floor panels of 5.95 m × 2.75 m were lifted into place by crane, with acrylic wall and window panels around them.</p>
              <div className="flex gap-4 text-sm">
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="font-bold text-primary">320 mm</div>
                  <div className="text-xs text-muted-foreground">Panel Thickness</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="font-bold text-primary">2023</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* GCC Projects Table */}
          <ProjectList projects={projectsGCC} productLabel="Usage" />
        </div>
      </section>

      {/* Europe / America */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <SectionLabel>Europe / America / Africa</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
            International <em className="not-italic font-bold">Projects</em>
          </AnimatedHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <ClickableImage src={`${POOL_BASE}/fa44ed4fe_Poolcatalg-16.png`} alt="Curved acrylic pool window, Oregon" className="w-full h-64 mb-4" label="Curved Acrylic Window, Oregon USA" />
            <h3 className="font-heading font-bold text-foreground mb-1">Curved Acrylic Window, Oregon USA</h3>
            <p className="text-sm text-muted-foreground">A curved acrylic side panel, 42 in tall by 9 ft long, set into the wall of a backyard pool so the water can be seen from the garden.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <ClickableImage src={`${POOL_BASE}/6360a9d6b_Poolcatalg-17.png`} alt="Acrylic pool on a yacht, Italy" className="w-full h-64 mb-4" label="Swimming Pool on a Yacht, Italy" />
            <h3 className="font-heading font-bold text-foreground mb-1">Swimming Pool on a Yacht, Italy</h3>
            <p className="text-sm text-muted-foreground">An acrylic side panel, 4.7 m × 1.85 m and 130 mm thick with a black painted edge, forming the clear wall of an on-deck pool.</p>
          </motion.div>
        </div>

        <ProjectList projects={projectsEurope} productLabel="Product" />
      </section>

      {/* Southeast Asia */}
      <section className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Southeast Asia / South Asia / East Asia</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
              Asia <em className="not-italic font-bold">Projects</em>
            </AnimatedHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <ClickableImage src={`${POOL_BASE}/892380b8c_Poolcatalg-32.png`} alt="Acrylic sky pool, Da Nang" className="w-full h-64 mb-4" label="Sky Pool, Da Nang Vietnam" />
              <h3 className="font-heading font-bold text-foreground mb-1">Sky Pool, Da Nang Vietnam</h3>
              <p className="text-sm text-muted-foreground">A pool with acrylic on all four sides: 11.51 m × 3.61 m, with 200 mm walls and a 250 mm floor, so swimmers can be seen from below and every side.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <ClickableImage src={`${POOL_BASE}/e9cc6623a_Poolcatalg-29.png`} alt="Gujarat Science City" className="w-full h-64 mb-4" label="Gujarat Science City Aquarium, India" />
              <h3 className="font-heading font-bold text-foreground mb-1">Gujarat Science City Aquarium, India</h3>
              <p className="text-sm text-muted-foreground">Acrylic Panel, Acrylic Tunnel, Acrylic Cylinder for Aquarium. Thickness 330 mm. One of the largest acrylic aquarium projects in South Asia.</p>
            </motion.div>
          </div>

          <ProjectList projects={projectsAsia} productLabel="Product" />
        </div>
      </section>

      <CTASection label="Get Started" title="Ready to add a premium acrylic pool to your project?" buttonText="Request a Free Estimate" />
    </div>
  );
}
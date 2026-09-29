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
  { src: `${POOL_BASE}/73f42fe3b_Poolcatalg-40.png`, label: "Grandview Acrylic · Premium Acrylic for Pool & Aqua" },
  { src: `${POOL_BASE}/ea3b2dcc6_Poolcatalg-01.png`, label: "Project Cases · Acrylic Pools & Aquariums" },
  { src: `${POOL_BASE}/374c5f451_Poolcatalg-02.png`, label: "GCC / Middle East / West Asia Projects" },
  { src: `${POOL_BASE}/c62a23ced_Poolcatalg-03.png`, label: "BINGHATTI Apartment Balcony Pools, Dubai" },
  { src: `${POOL_BASE}/794d3d888_Poolcatalg-04.png`, label: "Villa of UMM SEQUIM, Dubai" },
  { src: `${POOL_BASE}/7433b4774_Poolcatalg-05.png`, label: "Villa Sky, Dubai Hills Estate" },
  { src: `${POOL_BASE}/6dbd34715_Poolcatalg-06.png`, label: "Luxury Private Villa, Al Barari, Dubai" },
  { src: `${POOL_BASE}/cd6e406b0_Poolcatalg-07.png`, label: "Main & Kid Swimming Pool, Dubai" },
  { src: `${POOL_BASE}/d58ba8f5f_Poolcatalg-08.png`, label: "Al-Mana Hotel, Doha, Qatar" },
  { src: `${POOL_BASE}/345ae38cd_Poolcatalg-09.png`, label: "Resort Hotel, Jeddah, Saudi Arabia" },
  { src: `${POOL_BASE}/bc86afbb8_Poolcatalg-10.png`, label: "Acrylic Swimming Pool, Riyadh, Saudi Arabia" },
  { src: `${POOL_BASE}/7013b2df9_Poolcatalg-11.png`, label: "Water Pool Villa, Muscat, Oman" },
  { src: `${POOL_BASE}/de69be7e0_Poolcatalg-12.png`, label: "Home Acrylic Swimming Pool, Baghdad, Iraq" },
  { src: `${POOL_BASE}/58fa19430_Poolcatalg-13.png`, label: "Georgian National University SEU, Tbilisi" },
  { src: `${POOL_BASE}/6e4fab1dd_Poolcatalg-14.png`, label: "Europe / America / Africa Projects" },
  { src: `${POOL_BASE}/c263637ca_Poolcatalg-15.png`, label: "VAI Resort, Glendale, AZ, USA" },
  { src: `${POOL_BASE}/fa44ed4fe_Poolcatalg-16.png`, label: "Curved Acrylic Window, Oregon, USA" },
  { src: `${POOL_BASE}/6360a9d6b_Poolcatalg-17.png`, label: "Swimming Pool on Yacht, Ancona, Italy" },
  { src: `${POOL_BASE}/7e53a5126_Poolcatalg-18.png`, label: "Demo Tube Cover, Bern, Switzerland" },
  { src: `${POOL_BASE}/8a4526173_Poolcatalg-19.png`, label: "Outdoor Stainless Steel Pool, Sweden" },
  { src: `${POOL_BASE}/926630b28_Poolcatalg-20.png`, label: "Backyard Pool, Suhareke, Kosovo" },
  { src: `${POOL_BASE}/d3b01f212_Poolcatalg-21.png`, label: "Rooftop Pool, Mexico City, Mexico" },
  { src: `${POOL_BASE}/ec5f3f9b9_Poolcatalg-22.png`, label: "Sky Roof Pool, Copenhagen, Denmark" },
  { src: `${POOL_BASE}/15f9f0feb_Poolcatalg-23.png`, label: "Backyard SPA Pool, El Dorado Hills, CA, USA" },
  { src: `${POOL_BASE}/53fd6b24d_Poolcatalg-24.png`, label: "Rooftop Pool, South Sudan" },
  { src: `${POOL_BASE}/74ca05041_Poolcatalg-25.png`, label: "House Pool, Tirana, Albania" },
  { src: `${POOL_BASE}/7a0ee9c6f_Poolcatalg-26.png`, label: "Southeast / South / East Asia Projects" },
  { src: `${POOL_BASE}/55eae5455_Poolcatalg-27.png`, label: "Finolhu Resort Villas, Maldives" },
  { src: `${POOL_BASE}/ec5eed820_Poolcatalg-28.png`, label: "Meyyafushi Underwater Resort, Maldives" },
  { src: `${POOL_BASE}/e9cc6623a_Poolcatalg-29.png`, label: "Gujarat Science City Aquarium, India" },
  { src: `${POOL_BASE}/28a908bd3_Poolcatalg-30.png`, label: "Luxury Villa, Semarang, Indonesia" },
  { src: `${POOL_BASE}/c1370c0d7_Poolcatalg-31.png`, label: "Lee Residence, Pampanga, Philippines" },
  { src: `${POOL_BASE}/892380b8c_Poolcatalg-32.png`, label: "SKY Pool, Da Nang, Vietnam" },
  { src: `${POOL_BASE}/aa1d338f9_Poolcatalg-33.png`, label: "Acrylic SKY Pool, Phnom Penh, Cambodia" },
  { src: `${POOL_BASE}/379ead134_Poolcatalg-34.png`, label: "Aqualab, Seria Energy Lab, Brunei" },
  { src: `${POOL_BASE}/201dfb054_Poolcatalg-35.png`, label: "Hotel & Resort, Ji'an, Jiangxi, China" },
  { src: `${POOL_BASE}/12c9ea29e_Poolcatalg-36.png`, label: "Homestay Pool, Zhejiang, China" },
  { src: `${POOL_BASE}/00517d481_Poolcatalg-37.png`, label: "Sanya Haitang Bay Sea House Villa, China" },
  { src: `${POOL_BASE}/47bb6d8d9_Poolcatalg-38.png`, label: "Diving Pool, Maya Water Park, Wuhan, China" },
  { src: `${POOL_BASE}/8cdf1b094_Poolcatalg-39.png`, label: "Rooftop Pool, Heilongjiang, China" },
];

const projectsGCC = [
  { project: "BINGHATTI Apartments", usage: "Acrylic side panel for balcony swimming pool", thick: "60 mm", amount: "US$1.2 million", location: "Jumeirah Village Circle, Dubai" },
  { project: "Villa of UMM SEQUIM", usage: "Acrylic floor panel, side panel for pool", thick: "120 mm", amount: "US$69 K", location: "UMM SEQUIM, Dubai" },
  { project: "Villa in Mille Colline", usage: "Acrylic Floor Panel, Wall Panel", thick: "120 mm", amount: "US$260 K", location: "Mille Colline, Dubai" },
  { project: "Private Villa Al Barari", usage: "Acrylic side panel, floor panel", thick: "150 mm", amount: "US$66 K", location: "Al Barari, Dubai" },
  { project: "Al-Mana Hotel, Doha Qatar", usage: "Hanging acrylic pool", thick: "130 mm", amount: "US$120 K", location: "Doha, Qatar" },
  { project: "Resort Hotel, Jeddah Saudi", usage: "Acrylic Side Panel", thick: "150 mm", amount: "US$200 K", location: "Jeddah, Saudi Arabia" },
  { project: "Acrylic Swimming Pool", usage: "Acrylic Side Panel", thick: "120 mm", amount: "US$10 K", location: "Riyadh, Saudi Arabia" },
  { project: "Water Pool in Villa", usage: "Acrylic Floor", thick: "100 mm", amount: "US$60 K", location: "Muscat, Oman" },
];

const projectsEurope = [
  { project: "VAI Resort Swimming Pool", usage: "Acrylic side panel", thick: "60 mm", amount: "US$70 K", location: "Glendale, AZ, United States" },
  { project: "Swimming Pool for House (Oregon)", usage: "Acrylic curved Side Panel", thick: "100 mm", amount: "US$46 K", location: "Oregon, U.S." },
  { project: "Swimming Pool on YACHT", usage: "Acrylic side panel", thick: "130 mm", amount: "US$16 K", location: "Ancona, Italy" },
  { project: "Sky Roof Pool", usage: "Acrylic sky window", thick: "120 mm", amount: "US$76 K", location: "Copenhagen, Denmark" },
  { project: "Backyard SPO Swimming Pool", usage: "Acrylic side panel for SPO Pool", thick: "60 mm", amount: "US$7 K", location: "El Dorado Hills, CO, U.S." },
  { project: "Swimming Pool in Backyard (Kosovo)", usage: "Acrylic window", thick: "100 mm", amount: "US$66 K", location: "Suhareka, Kosovo" },
];

const projectsAsia = [
  { project: "Finolhu Island Resort Villas", usage: "Acrylic floor panel, side panel", thick: "60–110 mm", amount: "US$175 K", location: "Finolhu Baa Atoll, Maldives" },
  { project: "Nayyahuchi Underwater Resort", usage: "Acrylic Panels for Underwater Window", thick: "120 mm", amount: "US$70 K", location: "Nayyahuchi Island, Maldives" },
  { project: "Gujarat Science City Aquarium", usage: "Acrylic Panel, Tunnel, Cylinder", thick: "330 mm", amount: "US$1+ million", location: "Gujarat, India" },
  { project: "SKY Pool, Da-Nang Vietnam", usage: "Acrylic side pool (4 sides)", thick: "250 mm", amount: "US$300 K", location: "Da-Nang, Vietnam" },
  { project: "Acrylic SKY Swimming Pool, Cambodia", usage: "Acrylic Side Panel, Floor Panel", thick: "130 mm", amount: "US$360 K", location: "Phnom Penh, Cambodia" },
  { project: "Lee Residence Swimming Pool, Philippines", usage: "Acrylic side panels and floor panel", thick: "110 mm", amount: "US$63 K", location: "Pampanga, Philippines" },
];

const products = [
  { name: "Acrylic Side Panel", desc: "Crystal-clear acrylic walls for pools, allowing underwater viewing from outside. Available in any dimension up to 320mm thickness." },
  { name: "Acrylic Floor Panel", desc: "Walk-on transparent pool floor. Allows light transmission and viewing from below. Standard and custom sizes." },
  { name: "Acrylic Wall Panel", desc: "Interior swimming pool wall lining. Smooth, non-porous surface resistant to chemicals and UV." },
  { name: "Acrylic Sky Window", desc: "Pool bottom as a ceiling, creating the dramatic 'sky pool' floating effect. Structural-grade panels with steel framing system." },
  { name: "Acrylic Tunnel", desc: "Walk-through aquarium tunnels. Curved extrusion, available up to 3.5m diameter." },
  { name: "Acrylic Cylinder & Aquarium", desc: "Custom shapes for aquariums, hotel lobbies, and commercial spaces. Up to 72,000 liters capacity." },
];

export default function Pool() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="Pools"
        label="Grandview Acrylic"
        title={<>Premium Acrylic for Pool & <em className="not-italic font-bold">Aquarium</em></>}
        subtitle="Your acrylic panels solution provider and factory. Serving GCC, Europe, America, Africa, Southeast Asia, South Asia, and East Asia."
        image="https://images.unsplash.com/photo-1603085429201-64dadaec4061?w=1600&q=80"
      />

      {/* Slideable Catalogue Gallery */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <SectionLabel>Grandview Acrylic</SectionLabel>
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
              <ClickableImage src={`${POOL_BASE}/c62a23ced_Poolcatalg-03.png`} alt="Balcony Pool Dubai" className="w-full h-72" label="BINGHATTI Apartment Balcony Pools, Dubai" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center"
            >
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Dubai, UAE</div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">BINGHATTI Apartment Balcony Pools</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">Grandview Acrylic provided acrylic panels for the transparent swimming pool walls on the balconies of several apartment buildings: BINGHATTI ONYX, BINGHATTI OLIVER, BINGHATTI ORCHID, BINGHATTI Gardenia, and more.</p>
              <div className="flex gap-4 text-sm">
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="font-bold text-primary">60 mm</div>
                  <div className="text-xs text-muted-foreground">Panel Thickness</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="font-bold text-primary">US$1.2M</div>
                  <div className="text-xs text-muted-foreground">Project Value</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="font-bold text-primary">Ongoing</div>
                  <div className="text-xs text-muted-foreground">Status</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* GCC Projects Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-dark text-white">
                  <th className="text-left p-4 font-semibold">Project</th>
                  <th className="text-left p-4 font-semibold">Usage</th>
                  <th className="text-left p-4 font-semibold">Max Thickness</th>
                  <th className="text-left p-4 font-semibold">Approx. Amount</th>
                  <th className="text-left p-4 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {projectsGCC.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-secondary/20"}>
                    <td className="p-4 font-semibold text-foreground">{p.project}</td>
                    <td className="p-4 text-muted-foreground">{p.usage}</td>
                    <td className="p-4 text-muted-foreground">{p.thick}</td>
                    <td className="p-4 font-bold text-primary">{p.amount}</td>
                    <td className="p-4 text-muted-foreground">{p.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            <ClickableImage src={`${POOL_BASE}/c263637ca_Poolcatalg-15.png`} alt="VAI Resort USA" className="w-full h-64 mb-4" label="VAI Resort, Glendale AZ USA" />
            <h3 className="font-heading font-bold text-foreground mb-1">VAI Resort, Glendale AZ USA</h3>
            <p className="text-sm text-muted-foreground">The transparent pool window is made of acrylic panel and stainless steel frames. It is 43 meters long and 1.27 meters high, a performance stage so customers can enjoy the performance while swimming.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <ClickableImage src={`${POOL_BASE}/ec5f3f9b9_Poolcatalg-22.png`} alt="Sky Roof Copenhagen" className="w-full h-64 mb-4" label="Sky Roof Pool, Copenhagen Denmark" />
            <h3 className="font-heading font-bold text-foreground mb-1">Sky Roof Pool, Copenhagen Denmark</h3>
            <p className="text-sm text-muted-foreground">Acrylic sky window panel, 8.72 m × W 4 m, Thickness 120 mm. The pool floor serves as a transparent ceiling element, creating a dramatic infinity effect over the city.</p>
          </motion.div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-dark text-white">
                <th className="text-left p-4 font-semibold">Project</th>
                <th className="text-left p-4 font-semibold">Product</th>
                <th className="text-left p-4 font-semibold">Max Thickness</th>
                <th className="text-left p-4 font-semibold">Approx. Amount</th>
                <th className="text-left p-4 font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              {projectsEurope.map((p, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-secondary/20"}>
                  <td className="p-4 font-semibold text-foreground">{p.project}</td>
                  <td className="p-4 text-muted-foreground">{p.usage}</td>
                  <td className="p-4 text-muted-foreground">{p.thick}</td>
                  <td className="p-4 font-bold text-primary">{p.amount}</td>
                  <td className="p-4 text-muted-foreground">{p.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              <ClickableImage src={`${POOL_BASE}/55eae5455_Poolcatalg-27.png`} alt="Maldives Pool" className="w-full h-64 mb-4" label="Finolhu Island Resort Villas, Maldives" />
              <h3 className="font-heading font-bold text-foreground mb-1">Finolhu Island Resort Villas, Maldives</h3>
              <p className="text-sm text-muted-foreground">Grandview Acrylic supplied acrylic panels for 7 villas with transparent swimming pool wall and floor. Acrylic Floor Panels for 7 Villas, each villa 3 panels, total 21 panels, 4640 × 1200 mm × 80 mm.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <ClickableImage src={`${POOL_BASE}/e9cc6623a_Poolcatalg-29.png`} alt="Gujarat Science City" className="w-full h-64 mb-4" label="Gujarat Science City Aquarium, India" />
              <h3 className="font-heading font-bold text-foreground mb-1">Gujarat Science City Aquarium, India</h3>
              <p className="text-sm text-muted-foreground">Acrylic Panel, Acrylic Tunnel, Acrylic Cylinder for Aquarium. Thickness 330 mm. Project value exceeding US$1 million, one of the largest acrylic aquarium projects in South Asia.</p>
            </motion.div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-dark text-white">
                  <th className="text-left p-4 font-semibold">Project</th>
                  <th className="text-left p-4 font-semibold">Product</th>
                  <th className="text-left p-4 font-semibold">Max Thickness</th>
                  <th className="text-left p-4 font-semibold">Approx. Amount</th>
                  <th className="text-left p-4 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {projectsAsia.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-secondary/20"}>
                    <td className="p-4 font-semibold text-foreground">{p.project}</td>
                    <td className="p-4 text-muted-foreground">{p.usage}</td>
                    <td className="p-4 text-muted-foreground">{p.thick}</td>
                    <td className="p-4 font-bold text-primary">{p.amount}</td>
                    <td className="p-4 text-muted-foreground">{p.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTASection label="Get Started" title="Ready to add a premium acrylic pool to your project?" buttonText="Request a Free Estimate" />
    </div>
  );
}
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus, ChevronRight } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import MobileProductCard from "@/components/shared/MobileProductCard";
import ImageLightbox from "@/components/shared/ImageLightbox";

const BASE = "https://media.base44.com/images/public/6a3d99160f311f943d2b9488";
const PRODUCTPHOTOS = "https://media.base44.com/images/public/6aa6b441ec9ba0e9a14504fa";
const photo = (file) => `${PRODUCTPHOTOS}/${file}`;

const HERO_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80";

const models = [
  {
    id: "HRG-101",
    name: "Studio Cabin",
    tag: "Most Compact",
    sqft: "258 ft²",
    beds: "1 Bed",
    baths: "1 Bath",
    price: "From $89K",
    timeline: "10–14 weeks",
    areaMetric: "(24 m²)",
    dims: `10'-10" × 23'-0"`,
    dimsMetric: "3.3 m × 7.0 m",
    img: photo("5efe4f57e_ChatGPTImageSep29202603_53_17PM1.png"),
    bestFor: "Guest suite, home office, or rental income on a small lot.",
    desc: "The smallest footprint in our line. A turnkey studio that drops into tight backyards without dominating them.",
  },
  {
    id: "HRG-104",
    name: "Compact Two-Bedroom",
    tag: "Most Popular",
    sqft: "592 ft²",
    beds: "2 Beds",
    baths: "1 Bath",
    price: "From $149K",
    timeline: "12–16 weeks",
    areaMetric: "(55 m²)",
    dims: null,
    dimsMetric: null,
    img: photo("9a3d18dab_ChatGPTImageSep29202605_40_26PM1.png"),
    bestFor: "Families, multigenerational living, or a high-demand rental.",
    desc: "The model more clients choose than any other. Two real bedrooms in a layout that still fits most yards.",
  },
  {
    id: "HRG-106",
    name: "Modern Two-Bedroom",
    tag: "Best Value",
    sqft: "829 ft²",
    beds: "2 Beds",
    baths: "1 Bath",
    price: "From $189K",
    timeline: "14–18 weeks",
    areaMetric: "(77 m²)",
    dims: `29'-4" × 35'-9"`,
    dimsMetric: "8.9 m × 10.9 m",
    img: photo("f0c372083_ChatGPTImageSep29202603_53_21PM1.png"),
    bestFor: "Max livable space per dollar, full-time residence or long-term rental.",
    desc: "Our largest single-floor best seller. More square footage, open living, and the strongest resale value we offer.",
  },
];

const proofStats = [
  { stat: "120+", label: "Units Installed" },
  { stat: "3–5 Days", label: "Average On-Site Install" },
  { stat: "98%", label: "Permit Approval Rate" },
  { stat: "4.9/5", label: "Customer Satisfaction" },
];

const process = [
  { num: "01", title: "Consult & Design", desc: "We walk your lot, talk goals and budget, and design a unit that fits." },
  { num: "02", title: "Permit & Engineer", desc: "We finalize engineering and handle permitting with your city or county." },
  { num: "03", title: "Build Off-Site", desc: "Your unit is built in our facility while your site is prepped in parallel." },
  { num: "04", title: "Deliver & Set", desc: "We deliver, set, and connect the unit, then walk you through final inspection." },
];

const testimonials = [
  {
    quote:
      "The Studio Cabin went into a corner of our yard we weren't using. It was set and finished in days, and now it pays for itself as a rental.",
    name: "Daniel R.",
    location: "Pasadena, CA",
    model: "Studio Cabin",
  },
  {
    quote:
      "We looked at three builders before choosing HRG. The Compact Two-Bedroom was exactly the size we needed, and the timeline was honest start to finish.",
    name: "Maria & Tom L.",
    location: "Glendale, CA",
    model: "Compact Two-Bedroom",
  },
  {
    quote:
      "The Modern Two-Bedroom felt like a real home, not a backyard box. Permitting was handled, install was clean, and we moved in ahead of schedule.",
    name: "Priya S.",
    location: "Northridge, CA",
    model: "Modern Two-Bedroom",
  },
];

const faqs = [
  {
    q: "How long does a best-seller model take to install?",
    a: "Once your foundation and utilities are ready, on-site assembly typically takes three to five days. The full project, from signed design to final inspection, runs 10 to 18 weeks depending on the model and your local permitting timeline.",
  },
  {
    q: "Do you handle permitting for these models?",
    a: "Yes. We prepare the design documentation, engineering, and permit submission with your city or county as part of your project, and we manage inspections through final close-out.",
  },
  {
    q: "What site requirements should I check first?",
    a: "You'll need a level pad with utility access (power, water, sewer or septic) and clearance for delivery and crane set. During your consultation we review setbacks, access routes, and any HOA rules that apply.",
  },
  {
    q: "Can I customize a best-seller model?",
    a: "Yes. Every model can be tailored with siding and roofline options, interior finish packages, and layout tweaks. The three best sellers are popular precisely because they work well as-is, but they're not locked in.",
  },
  {
    q: "Is financing available?",
    a: "We work with lending partners who specialize in ADU and addition financing. We're happy to make an introduction during your consultation so you can review options before committing.",
  },
  {
    q: "Are the starting prices fixed?",
    a: "No. Starting prices cover the unit and standard finishes. Site prep, foundation, utility connections, permits, and taxes are quoted separately based on your lot. Your final estimate reflects your specific site and finish selections.",
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-heading text-lg font-semibold pr-4 group-hover:text-primary transition-colors">
          {item.q}
        </span>
        {open ? <Minus className="w-5 h-5 text-primary shrink-0" /> : <Plus className="w-5 h-5 text-primary shrink-0" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-foreground/60 leading-relaxed">{item.a}</p>
      </motion.div>
    </div>
  );
}

export default function BestSellers() {
  const [viewerIndex, setViewerIndex] = useState(null);
  const lightboxImages = models.map((m) => ({
    src: m.img,
    alt: `${m.id} ${m.name}`,
    label: `${m.id} · ${m.name} · ${m.sqft}${m.areaMetric ? ` ${m.areaMetric}` : ""}`,
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Prefab ADU" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/45 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-24 md:pb-32">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">Best Sellers</span>
          </nav>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4"
          >
            Best Sellers
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-3xl text-balance"
          >
            Our Best-Selling <em className="not-italic font-bold">Models</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-lg text-white/75 max-w-2xl leading-relaxed"
          >
            The three models our clients install most often. Proven layouts, honest timelines, and
            the fastest path from backyard to move-in.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
            >
              Get a free estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:bg-white/10 transition-colors"
            >
              Contact us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BEST-SELLER GRID */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          {/* Mobile: big, readable 9:16 style product cards */}
          <div className="md:hidden space-y-6">
            {models.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <MobileProductCard
                  image={m.img}
                  imageAlt={m.name}
                  onImageClick={() => setViewerIndex(i)}
                  title={m.id}
                  subtitle={m.name}
                  area={m.sqft}
                  areaMetric={m.areaMetric}
                  beds={m.beds}
                  baths={m.baths}
                  dimensions={m.dims}
                  dimensionsMetric={m.dimsMetric}
                  price={`${m.price} · ${m.timeline}`}
                  ctaLabel="Get a quote for this model"
                  ctaTo="/get-a-quote"
                />
              </motion.div>
            ))}
          </div>

          {/* Desktop: original card grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {models.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-card rounded-lg overflow-hidden border border-border flex flex-col hover:shadow-lg hover:border-primary/40 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setViewerIndex(i)}
                  className="relative block w-full aspect-[4/3] overflow-hidden bg-muted cursor-zoom-in"
                  aria-label={`View ${m.name} larger`}
                >
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md">
                    {m.tag}
                  </span>
                </button>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-xl font-bold mb-1">{m.name}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-5">{m.desc}</p>
                  <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm border-y border-border py-4 mb-5">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-foreground/40">Size</dt>
                      <dd className="font-semibold">{m.sqft}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-foreground/40">Beds / Baths</dt>
                      <dd className="font-semibold">{m.beds} / {m.baths}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-foreground/40">Starting Price</dt>
                      <dd className="font-semibold text-primary">{m.price}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-foreground/40">Timeline</dt>
                      <dd className="font-semibold">{m.timeline}</dd>
                    </div>
                  </dl>
                  <Link
                    to="/get-a-quote"
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold uppercase text-sm tracking-wide hover:bg-primary/90 transition-colors"
                  >
                    Get a quote for this model
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THESE THREE SELL */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <SectionLabel>Why These Three Sell</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-balance">
              The same three reasons, <em className="not-italic font-bold">every time</em>
            </AnimatedHeading>
            <p className="mt-4 text-foreground/60 leading-relaxed">
              They're not our only models, but they're the ones clients keep coming back to. Here's the
              track record behind them.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {proofStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-8 text-center"
              >
                <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">{s.stat}</div>
                <div className="text-sm uppercase tracking-[0.12em] text-foreground/50">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Compare</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-balance">
              Side by side, <em className="not-italic font-bold">spec for spec</em>
            </AnimatedHeading>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-foreground/20">
                  <th className="text-left py-4 px-4 text-sm uppercase tracking-wide text-foreground/50 font-semibold">Spec</th>
                  {models.map((m) => (
                    <th key={m.id} className="text-left py-4 px-4 font-heading text-lg font-bold">
                      {m.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Square Footage", key: "sqft" },
                  { label: "Bedrooms", key: "beds" },
                  { label: "Bathrooms", key: "baths" },
                  { label: "Starting Price", key: "price" },
                  { label: "Build Timeline", key: "timeline" },
                  { label: "Best For", key: "bestFor" },
                ].map((row) => (
                  <tr key={row.key} className="border-b border-border">
                    <td className="py-4 px-4 text-sm uppercase tracking-wide text-foreground/50 font-semibold">{row.label}</td>
                    {models.map((m) => (
                      <td key={m.id} className="py-4 px-4 text-foreground/80">
                        {row.key === "price" ? <span className="font-semibold text-primary">{m[row.key]}</span> : m[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-balance">
              From first call to <em className="not-italic font-bold">move-in</em>
            </AnimatedHeading>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-heading text-5xl font-bold text-primary/20">{s.num}</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>From Our Clients</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-balance">
              Built for them, <em className="not-italic font-bold">set on time</em>
            </AnimatedHeading>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-card rounded-lg p-8 border border-border flex flex-col"
              >
                <blockquote className="text-foreground/80 leading-relaxed mb-6 flex-1">
                  "{t.quote}"
                </blockquote>
                <figcaption className="border-t border-border pt-4">
                  <div className="font-heading font-semibold">{t.name}</div>
                  <div className="text-sm text-foreground/50">{t.location}</div>
                  <div className="mt-2 inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-md">
                    {t.model}
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Frequently Asked</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-balance">
              Questions before you <em className="not-italic font-bold">decide</em>
            </AnimatedHeading>
          </div>
          <div className="border-t border-border">
            {faqs.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-3xl font-normal mb-6 text-balance"
          >
            Ready to find your fit?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:bg-primary-foreground/90 transition-colors"
            >
              Get a free estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {viewerIndex !== null && (
          <ImageLightbox
            key={viewerIndex}
            images={lightboxImages}
            startIndex={viewerIndex}
            onClose={() => setViewerIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
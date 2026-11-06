import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Building2, FileText, HardHat, Factory, Truck, ShieldCheck, Palette, Plus, Minus } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import CTASection from "@/components/shared/CTASection";

const services = [
  { icon: Home, title: "Detached ADUs", desc: "Standalone backyard units for rental income, guests, a home office, or multigenerational living. Available in studio, one-, and two-bedroom layouts." },
  { icon: Building2, title: "Attached Additions", desc: "Room and suite additions engineered to tie cleanly into your existing structure, roofline, and utilities." },
  { icon: FileText, title: "Design & Permitting", desc: "In-house architectural design tailored to your lot, plus full handling of permit submission and approval with your local jurisdiction." },
  { icon: HardHat, title: "Site Prep & Foundation", desc: "Grading, excavation, foundation work, and utility hookups coordinated in parallel with off-site manufacturing." },
  { icon: Factory, title: "Off-Site Manufacturing", desc: "Prefabricated panels and components are manufactured off site, then delivered for assembly by the homeowner-hired general contractor." },
  { icon: Truck, title: "Rapid Installation", desc: "Delivery and assembly are coordinated around site access, foundation readiness and the schedule agreed with your contractor." },
  { icon: ShieldCheck, title: "Code & Inspection Support", desc: "We coordinate documentation and inspection requirements within the agreed scope. Your contractor and local authority handle construction inspections and final approval." },
  { icon: Palette, title: "Custom Finishes", desc: "Exterior siding and roofline options, plus interior finish packages to match the look of your main house." },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Your schedule depends on the design, permitting, site work, manufacturing, delivery and assembly scope. HRG reviews these steps with you and your contractor after the property review.",
  },
  {
    q: "Do I need a permit for an ADU?",
    a: "Yes. ADUs and additions require permits in nearly every jurisdiction. Our team handles design documentation and permit submission as part of your project, and we stay current on local zoning rules for ADUs specifically.",
  },
  {
    q: "What's already done before the unit arrives on-site?",
    a: "The prefabricated panels and components in your materials package are manufactured off site. Your written scope identifies what arrives with the package and what your general contractor completes on site, including foundation, utility and assembly work.",
  },
  {
    q: "Can a prefab addition match my home's existing style?",
    a: "Yes. We offer a range of siding, roofing, and interior finish options, and for attached additions we design the roofline and exterior specifically to tie into your existing home.",
  },
  {
    q: "Do you offer financing?",
    a: "We work with several lending partners who specialize in ADU and home addition financing. We're happy to make an introduction during your consultation.",
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

export default function Services() {
  return (
    <>
      <PageHero
        breadcrumb="Services"
        label="Our Services"
        title={<>Everything it takes to add space, in <em className="not-italic font-bold">one scope</em> of work</>}
        subtitle="We coordinate design, engineering, permitting, materials and delivery within your agreed scope. Your homeowner-hired general contractor handles site construction and assembly."
        image="https://images.unsplash.com/photo-1608303588026-884930af2559?w=1600&q=80"
      />

      {/* Services Grid */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                className="bg-card rounded-lg p-6 border border-border hover:border-primary/40 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
              </motion.div>
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
              Common questions about <em className="not-italic font-bold">prefab additions</em>
            </AnimatedHeading>
          </div>
          <div className="border-t border-border">
            {faqs.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        label="Next Step"
        title={<>Not sure which service <em className="not-italic font-bold">fits your project?</em></>}
        buttonText="Get Your Free Estimate"
      />
    </>
  );
}
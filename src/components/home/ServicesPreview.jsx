import React from "react";
import { motion } from "framer-motion";
import { Home, Building2, FileText, HardHat, Factory, Truck, ShieldCheck, Palette } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

const services = [
  { icon: Home, title: "Detached ADUs", desc: "Standalone backyard units for rental income, guests, or multigenerational living." },
  { icon: Building2, title: "Attached Additions", desc: "Seamless room and suite additions that extend your existing home's footprint." },
  { icon: FileText, title: "Design & Permitting", desc: "In-house architectural design and full permit handling with your local jurisdiction." },
  { icon: HardHat, title: "Site Prep & Foundation", desc: "Grading, utility hookups, and foundation work coordinated ahead of delivery day." },
  { icon: Factory, title: "Off-Site Manufacturing", desc: "Units are framed, wired, and finished in a climate-controlled facility for consistent quality." },
  { icon: Truck, title: "Rapid Installation", desc: "Crane-set or trailer delivery and final assembly typically completed within days on-site." },
  { icon: ShieldCheck, title: "Code & Inspection Support", desc: "We manage inspections and close-out so your unit is fully legal and finance-ready." },
  { icon: Palette, title: "Custom Finishes", desc: "Exterior siding, interior finish packages, and layout options to match your home." },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Our Services</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal max-w-2xl mx-auto leading-tight text-balance">
            Built for how you actually want to <em className="not-italic font-bold">add space</em>
          </AnimatedHeading>
          <p className="mt-4 text-foreground/60 max-w-xl mx-auto">
            From a standalone backyard unit to an attached addition, we cover the full scope, from
            design through final inspection.
          </p>
        </div>

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
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
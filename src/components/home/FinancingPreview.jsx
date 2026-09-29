import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

const options = [
  {
    name: "ADU Construction Loan",
    desc: "Purpose-built financing for prefab and ADU projects, funding your build in stages.",
  },
  {
    name: "Home Equity Line of Credit",
    desc: "Borrow against the equity you already have in your home, on flexible terms.",
  },
  {
    name: "Cash-Out Refinance",
    desc: "Refinance your current mortgage and use the difference to fund your ADU.",
  },
];

export default function FinancingPreview() {
  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>Financing</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground text-balance">
            Build now. <em className="not-italic font-bold">Pay over time.</em>
          </AnimatedHeading>
          <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
            We work with lending partners who specialize in ADU financing, and we'll introduce you during your consultation.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {options.map((o, i) => (
            <motion.div
              key={o.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-heading text-lg font-semibold mb-2">{o.name}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{o.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/financing"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/70 hover:text-primary transition-colors"
          >
            Explore Financing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

const faqs = [
  {
    q: "What's the difference between the 500 and 800 SF plans?",
    a: "The 500 SF plan is a one-bed, one-bath layout for compact lots and simpler projects. The 800 SF plan adds a second bedroom and a larger open living area for full-time living, family or a two-bedroom rental.",
  },
  {
    q: "Can the plans be customized?",
    a: "Yes. Both prototypes are proven starting points, not fixed products. After reviewing your goals and site, we tailor the layout, finishes and options to your property and budget.",
  },
  {
    q: "Do you handle permits?",
    a: "Yes. We prepare the engineering and permit documents, submit them with your city or county, and manage inspections through final close-out.",
  },
  {
    q: "How long does a project take?",
    a: "Your unit is built in a factory while your site is prepared in parallel, so on-site installation typically takes days, not months. The overall timeline depends on permitting and site conditions.",
  },
  {
    q: "What will my project cost?",
    a: "Exact pricing depends on your site, finishes and local requirements, so we quote after a site review. Share your budget range in the form and we'll match the right plan to it.",
  },
  {
    q: "Is financing available?",
    a: "Yes. We work with lending partners who specialize in ADU and addition financing, and we can introduce you during your consultation.",
  },
];

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-heading text-base md:text-lg font-semibold pr-4 group-hover:text-primary transition-colors">
          {item.q}
        </span>
        {open ? <Minus className="w-5 h-5 text-primary shrink-0" /> : <Plus className="w-5 h-5 text-primary shrink-0" />}
      </button>
      <div className={open ? "block" : "hidden"}>
        <p className="pb-5 text-foreground/60 leading-relaxed text-sm md:text-base">{item.a}</p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>FAQ</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground text-balance">
            Questions, <em className="not-italic font-bold">answered</em>
          </AnimatedHeading>
        </div>
        <div className="border-t border-border bg-card rounded-lg px-6">
          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
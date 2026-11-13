import React from "react";
import { Link } from "react-router-dom";
import { faqs } from "@/lib/faqData";

export default function FaqSection({ full = false }) {
  return (
    <section className="py-20 bg-brand-cream" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-3xl font-semibold mb-8">Questions, answered</h2>
        <div className="border-t border-border">
          {(full ? faqs : faqs.slice(0, 5)).map((item) => (
            <details key={item.q} className="border-b border-border py-5">
              <summary className="font-heading text-lg font-semibold cursor-pointer">{item.q}</summary>
              <p className="pt-4 text-foreground/70 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 flex flex-wrap gap-6">
          {!full && <Link className="text-primary underline" to="/faq">All prefab ADU questions</Link>}
          <Link className="text-primary underline" to="/guides">Plan costs and scope</Link>
          <Link className="text-primary underline" to="/collection">Explore floor plans</Link>
          <Link className="text-primary underline" to="/see-what-fits">Check my property</Link>
        </p>
      </div>
    </section>
  );
}

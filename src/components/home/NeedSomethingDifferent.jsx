import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NeedSomethingDifferent() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">Need something different?</h2>
        <p className="mt-3 text-sm md:text-base text-foreground/60 leading-relaxed">
          Every property is different. We can customize after reviewing your goals and site.
        </p>
        <Link
          to="/collection"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-primary transition-colors underline underline-offset-4 decoration-foreground/20"
        >
          Explore More Designs
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
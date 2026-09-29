import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PrototypeCard({ model, recommended = false }) {
  return (
    <article
      className={cn(
        "relative bg-card rounded-lg border flex flex-col overflow-hidden",
        recommended ? "border-2 border-primary shadow-xl" : "border-border shadow-sm"
      )}
    >
      {recommended && (
        <span className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md">
          Recommended: More Living Space
        </span>
      )}
      <div className="bg-white border-b border-border">
        <img
          src={model.image}
          alt={`${model.name}: 3D concept layout`}
          className="w-full aspect-[4/3] object-contain p-4"
        />
        <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/40 text-center pb-3">
          3D Concept Layout
        </p>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-heading text-2xl md:text-3xl font-bold">{model.name}</h3>
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">{model.tagline}</span>
        </div>
        <dl className="grid grid-cols-3 gap-2 mt-5 py-4 border-y border-border text-center">
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-foreground/40">Total Area</dt>
            <dd className="font-semibold mt-1 text-sm md:text-base">{model.sqft}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-foreground/40">Layout</dt>
            <dd className="font-semibold mt-1 text-sm md:text-base">{model.beds} / {model.baths}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-foreground/40">Footprint</dt>
            <dd className="font-semibold mt-1 text-sm md:text-base">{model.footprint}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-foreground/60 leading-relaxed">
          <span className="font-semibold text-foreground/80">Best for: </span>
          {model.bestFor}
        </p>
        <ul className="mt-4 space-y-2.5">
          {model.included.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-foreground/70 leading-snug">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-foreground/40">Exact pricing quoted after a site review.</p>
        <Link
          to={`/see-what-fits?model=${model.id}`}
          className="mt-5 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-md font-semibold uppercase tracking-wide text-sm hover:bg-primary/90 transition-colors"
        >
          Check This Model for My Property
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
import React from "react";
import { Check } from "lucide-react";
import { money } from "@/lib/projectPricing";

// "Included", a verified upgrade ("+$4.50 per sq ft · about +$2,907 for your home"), or
// "Pricing to be confirmed". Per-unit and whole-home amounts are always both named.
export function priceLabel(option, sf) {
  if (option.included) return { short: "Included", long: "Included in your price" };
  if (!option.verified || !(option.perSf || option.flat)) {
    return { short: "Pricing to be confirmed", long: "Pricing to be confirmed. HRG confirms it in your project review." };
  }
  if (option.flat) return { short: `+${money(option.flat)}`, long: `+${money(option.flat)} for your home` };
  const total = option.perSf * sf;
  const rate = Number.isInteger(option.perSf) ? option.perSf : option.perSf.toFixed(2);
  return {
    short: `+$${rate} per sq ft`,
    long: `+$${rate} per sq ft · about +${money(total)} for your ${sf.toLocaleString("en-US")} sq ft`,
  };
}

// One finish: big photo, name, one line, price status, and two clear actions. The selected
// state shows a check and the word "Selected", not just a color.
export default function FinishCard({ option, sf, selected, onSelect, onDetails }) {
  const price = priceLabel(option, sf);
  return (
    <article
      className={`flex flex-col rounded-lg overflow-hidden bg-card border-2 transition-colors ${
        selected ? "border-primary" : "border-border"
      }`}
    >
      <button
        type="button"
        onClick={onDetails}
        className="relative block aspect-[4/3] bg-secondary/50 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View details for ${option.name}`}
      >
        <img src={option.img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
        {selected && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1">
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            Selected
          </span>
        )}
      </button>
      <div className="flex-1 flex flex-col p-4 md:p-5">
        <h3 className="font-heading text-lg font-bold leading-snug">{option.name}</h3>
        <p className="mt-1 text-sm text-foreground/65 leading-relaxed">{option.desc}</p>
        <p className={`mt-3 text-sm font-semibold ${option.included ? "text-primary" : "text-foreground/70"}`}>
          {price.short}
        </p>
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
          <button
            type="button"
            aria-pressed={selected}
            onClick={onSelect}
            className={`flex-1 min-h-11 inline-flex items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors ${
              selected
                ? "bg-primary text-primary-foreground"
                : "border border-foreground/25 text-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {selected && <Check className="w-4 h-4" aria-hidden="true" />}
            {selected ? "Selected" : "Select"}
          </button>
          <button
            type="button"
            onClick={onDetails}
            className="min-h-11 px-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}

import React from "react";
import { Check } from "lucide-react";
import { money } from "@/lib/projectPricing";

// What an option adds at this size: "Included", or "+$4,200".
const addLabel = (amount) => (amount ? `+${money(amount)}` : "Included");

// One category of photo swatches. `selected` is a key (single choice) or an array of keys
// (multiple choice, for add-ons). `costOf(option)` prices an option at the current size.
export default function SwatchGroup({ label, options, selected, onPick, costOf }) {
  const isOn = (key) => (Array.isArray(selected) ? selected.includes(key) : selected === key);
  return (
    <section className="py-8 border-t border-border first:border-t-0">
      <h2 className="font-heading text-xl md:text-2xl font-bold">{label}</h2>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {options.map((o) => {
          const on = isOn(o.key);
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(o.key)}
              className={`group relative text-left rounded-lg overflow-hidden border-2 bg-card transition-colors ${
                on ? "border-primary" : "border-transparent hover:border-primary/40"
              }`}
            >
              <div className="aspect-[4/3] bg-secondary/50 overflow-hidden">
                <img
                  src={o.img}
                  alt={o.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {on && (
                <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </span>
              )}
              <div className="px-3 py-2.5">
                <div className="text-sm font-semibold leading-tight">{o.name}</div>
                <div className={`mt-0.5 text-xs font-semibold ${on ? "text-primary" : "text-foreground/50"}`}>
                  {addLabel(costOf(o))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

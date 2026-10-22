import React from "react";
import { ArrowRight } from "lucide-react";
import { money } from "@/lib/projectPricing";

export const rangeText = (range) => `${money(range.low)} – ${money(range.high)}`;

// The live price range with a short breakdown and the way on to the property and contact
// steps. Desktop shows it as a sticky card; phones get the compact bar (PriceBar).
export default function PriceSummary({ estimate, onContinue }) {
  const rows = [
    ["Home + delivery", estimate.mats + estimate.del],
    ["Your finishes", estimate.finishLines.filter((l) => l.group !== "addon").reduce((s, l) => s + l.amount, 0)],
    ["Add-ons", estimate.finishLines.filter((l) => l.group === "addon").reduce((s, l) => s + l.amount, 0)],
    ["Site work + assembly", estimate.p3],
    ["Design + permits", estimate.p1],
  ];
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">Your price range</div>
      <div className="mt-1 font-heading text-3xl font-bold text-primary leading-tight">{rangeText(estimate.range)}</div>
      <dl className="mt-5 space-y-2 text-sm">
        {rows.map(([label, amount]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-foreground/60">{label}</dt>
            <dd className="font-semibold">{money(amount)}</dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={onContinue}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-md font-semibold uppercase text-sm tracking-wide hover:bg-primary/90 transition-colors"
      >
        Check my property
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="mt-3 text-xs text-foreground/50 leading-relaxed">
        Your lot, plans and permits set the final number.
      </p>
    </div>
  );
}

export function PriceBar({ estimate, onContinue }) {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50">Your price range</div>
        <div className="font-heading text-lg font-bold text-primary truncate">{rangeText(estimate.range)}</div>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="shrink-0 bg-primary text-primary-foreground px-5 py-3 rounded-md font-semibold uppercase text-xs tracking-wide"
      >
        Continue
      </button>
    </div>
  );
}

import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { COORDINATED_LOOKS } from "@/lib/finishPricing";

// "Start with a coordinated look": three palettes that fill every category at once.
// Closed by default so it never pushes the catalogue down; "Help me choose" opens it.
export default function CoordinatedLooks({ open, onToggle, applied, onApply }) {
  return (
    <section id="looks" className="rounded-lg border border-border bg-card scroll-mt-28">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full min-h-14 flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span>
          <span className="block font-heading text-lg font-bold">Start with a coordinated look</span>
          <span className="block text-sm text-foreground/60">Fill every choice at once, then change anything.</span>
        </span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <div className="grid gap-4 sm:grid-cols-3 px-5 pb-5">
          {COORDINATED_LOOKS.map((look) => {
            const on = applied === look.key;
            return (
              <div key={look.key} className={`rounded-md overflow-hidden border-2 ${on ? "border-primary" : "border-border"}`}>
                <img src={look.img} alt="" loading="lazy" className="w-full aspect-[3/2] object-cover" />
                <div className="p-4">
                  <h3 className="font-heading font-bold">{look.name}</h3>
                  <p className="text-sm text-foreground/60">{look.desc}</p>
                  <button
                    type="button"
                    onClick={() => onApply(look)}
                    aria-pressed={on}
                    className={`mt-3 w-full min-h-11 inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold ${
                      on ? "bg-primary text-primary-foreground" : "border border-foreground/25 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {on && <Check className="w-4 h-4" aria-hidden="true" />}
                    {on ? "Applied" : "Use this look"}
                  </button>
                </div>
              </div>
            );
          })}
          <p className="sm:col-span-3 text-sm text-foreground/60">
            Rather talk it through? Call{" "}
            <a href="tel:+19092740272" className="font-semibold text-primary hover:underline">
              909.274.0272
            </a>{" "}
            and we'll help you choose.
          </p>
        </div>
      )}
    </section>
  );
}

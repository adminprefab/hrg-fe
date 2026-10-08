import React from "react";
import { PRICING, materialsCost, deliveryCost, money } from "@/lib/projectPricing";
import LandDevQuestions, { SiteSlopeQuestion } from "./LandDevQuestions";

const SCOPES = [
  {
    key: "materials",
    num: "02",
    name: "Prefabricated Materials + Delivery",
    tagline: "Materials for your project",
    copy: "HRG coordinates the prefabricated building materials required to construct the permitted structure through an on-site conventional building and assembly process.",
    items: [
      `Materials · SF × ${money(PRICING.materialsRate)}`,
      `Delivery · ${Math.round(PRICING.deliveryPct * 100)}% of materials cost`,
    ],
    note: null,
    cost: (sf) => money(materialsCost(sf) + deliveryCost(sf)),
    extra: null,
    addLabel: "+ Add Materials + Delivery",
    removeLabel: "Remove Materials + Delivery",
  },
  {
    key: "site_work",
    num: "03",
    name: "Site Work + Assembly",
    tagline: "Prepare the property. Build the structure.",
    copy: "Depending on the property and approved plans, this scope may include site preparation, utilities, foundation, material receiving, on-site assembly, construction coordination and applicable inspections.",
    items: [
      "Site preparation",
      "Utilities",
      "Foundation",
      "Material receiving",
      "On-site assembly",
      "Construction coordination",
      "Applicable inspections",
    ],
    note: `Working rate ${money(PRICING.siteWorkLowRate)}-${money(PRICING.siteWorkHighRate)}/SF`,
    // Includes the slope allowance and the no-plumbing credit, so both answers move it.
    cost: (sf, estimate) => money(estimate.p3),
    extra: (form, setField) => <SiteSlopeQuestion answers={form} setField={setField} />,
    addLabel: "+ Add Site Work + Assembly",
    removeLabel: "Remove Site Work + Assembly",
  },
];

export default function ScopeCards({ form, setField, sf, estimate }) {
  return (
    <div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance">
        Build your project.
      </h2>
      <p className="mt-3 text-foreground/60 leading-relaxed">
        Tell us what you already have, then choose your scopes · your budget updates as you build.
      </p>

      <div className="mt-8 space-y-4">
        <div
          className={`rounded-lg border p-6 md:p-8 transition-colors ${
            estimate.p1 > 0 ? "border-primary" : "border-border"
          }`}
        >
          <span className="font-heading text-3xl font-bold text-primary/30 leading-none">01</span>
          <h3 className="mt-2 mb-4 font-heading text-xl font-bold uppercase tracking-wide">
            Land Development
          </h3>
          <LandDevQuestions answers={form} setField={setField} estimate={estimate} />
        </div>
        {SCOPES.map((s) => {
          const added = form[s.key];
          return (
            <div
              key={s.key}
              className={`rounded-lg border p-6 md:p-8 transition-colors ${
                added ? "border-primary" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-heading text-3xl font-bold text-primary/30 leading-none">
                    {s.num}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-bold uppercase tracking-wide">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-foreground/50">
                    {s.tagline}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-xs font-bold uppercase tracking-wide text-foreground/50">
                    Expected cost
                  </span>
                  <span className="block mt-1 font-heading text-2xl font-bold text-primary">
                    {s.cost(sf, estimate)}
                  </span>
                  {s.note && <span className="block mt-1 text-xs text-foreground/40">{s.note}</span>}
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground/60 leading-relaxed">{s.copy}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                {s.items.map((item) => (
                  <li key={item} className="text-xs font-semibold text-foreground/60">
                    · {item}
                  </li>
                ))}
              </ul>
              {s.extra && <div className="mt-6">{s.extra(form, setField)}</div>}
              <button
                type="button"
                onClick={() => setField(s.key, !added)}
                className={`mt-6 w-full px-6 py-3.5 rounded-md font-semibold text-sm uppercase tracking-wide transition-colors ${
                  added
                    ? "border border-primary text-primary hover:bg-primary/5"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {added ? s.removeLabel : s.addLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
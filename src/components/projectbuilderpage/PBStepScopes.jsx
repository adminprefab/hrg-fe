import React from "react";
import {
  PRICING,
  landDevelopmentCost,
  materialsCost,
  deliveryCost,
  siteWorkCost,
  money,
} from "@/lib/projectPricing";
import StepHeading from "./StepHeading";

const TAGS_LAND = [
  "Feasibility",
  "Architectural design",
  "Engineering",
  "Permit preparation",
  "Permit coordination",
];

const TAGS_SITE = [
  "Site preparation",
  "Utilities",
  "Foundation",
  "Material receiving",
  "On-site assembly",
  "Construction coordination",
  "Applicable inspections",
];

function Tag({ children }) {
  return (
    <span className="px-3.5 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground/70">
      {children}
    </span>
  );
}

function AddOnButton({ added, onToggle, addLabel }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`shrink-0 px-6 py-3.5 rounded-md text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
        added
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-primary text-primary hover:bg-primary/5"
      }`}
    >
      {added ? "Added · Remove" : addLabel}
    </button>
  );
}

export default function PBStepScopes({ data, setField, sf }) {
  const hasSf = sf >= PRICING.sfMin;
  const perSf = PRICING.materialsRate + PRICING.materialsRate * PRICING.deliveryPct;

  return (
    <div>
      <StepHeading num="04" title="Your building, plus any add-ons." />
      <p className="mt-3 text-foreground/60 leading-relaxed max-w-xl">
        Building materials are included at $100 per square foot. Add land development or site work
        and assembly to include their projected budgets in your total. You can add or remove
        anything at any time.
      </p>

      <div className="mt-8 space-y-5">
        {/* The building · prefabricated materials */}
        <div
          className={`rounded-lg border p-6 md:p-8 ${
            data.materials ? "border-primary" : "border-border"
          }`}
        >
          <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
            The building · Prefabricated materials
          </span>
          <span className="block mt-3 font-heading text-3xl font-bold text-primary">
            ${PRICING.materialsRate}/SF
          </span>
          <h4 className="mt-4 font-heading text-xl font-bold">Materials for your building</h4>
          <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
            HRG coordinates the prefabricated building materials required to construct the permitted
            structure through an on-site conventional building and assembly process.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-md bg-secondary px-5 py-4">
              <span className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">
                Materials
              </span>
              <span className="block mt-1 font-heading text-xl font-bold">
                {hasSf ? money(materialsCost(sf)) : "—"}
              </span>
            </div>
            <div className="rounded-md bg-secondary px-5 py-4">
              <span className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">
                Delivery
              </span>
              <span className="block mt-1 font-heading text-xl font-bold">
                {hasSf ? money(deliveryCost(sf)) : "—"}
              </span>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
                Materials + delivery
              </span>
              <span className="block mt-1 font-heading text-2xl font-bold">
                {hasSf ? money(materialsCost(sf) + deliveryCost(sf)) : `${money(perSf)}/SF`}
              </span>
              {hasSf && (
                <span className="block mt-0.5 text-xs text-foreground/50">
                  {sf} SF × {money(perSf)}/SF
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setField("materials", !data.materials)}
              className={`shrink-0 px-6 py-3.5 rounded-md text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
                data.materials
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-primary text-primary hover:bg-primary/5"
              }`}
            >
              {data.materials ? "Included · Remove" : "+ Add materials"}
            </button>
          </div>
        </div>

        {/* Land development · optional add-on */}
        <div
          className={`rounded-lg border bg-secondary/50 p-6 md:p-8 ${
            data.land_dev ? "border-primary" : "border-border"
          }`}
        >
          <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
            Optional add-on · Land Development
          </span>
          <h4 className="mt-3 font-heading text-2xl font-bold">From property to permit</h4>
          <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
            We establish what can be built and coordinate the professional work required to move
            the project toward approval.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {TAGS_LAND.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
                Projected budget
              </span>
              <span className="block mt-1 font-heading text-3xl font-bold">
                {money(landDevelopmentCost())}
              </span>
              <span className="block mt-0.5 text-xs text-foreground/50">
                Minimum {money(PRICING.landDevMin)}
              </span>
            </div>
            <AddOnButton
              added={data.land_dev}
              onToggle={() => setField("land_dev", !data.land_dev)}
              addLabel="+ Add Land Development"
            />
          </div>
        </div>

        {/* Site work + assembly · optional add-on */}
        <div
          className={`rounded-lg border bg-secondary/50 p-6 md:p-8 ${
            data.site_work ? "border-primary" : "border-border"
          }`}
        >
          <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
            Optional add-on · Site Work + Assembly
          </span>
          <h4 className="mt-3 font-heading text-2xl font-bold">
            Prepare the property. Build the structure.
          </h4>
          <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
            Depending on the property and approved plans, this scope may include:
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {TAGS_SITE.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
                Projected budget
              </span>
              <span className="block mt-1 font-heading text-3xl font-bold">
                {hasSf ? money(siteWorkCost(sf)) : money(PRICING.siteWorkMin)}
              </span>
              <span className="block mt-0.5 text-xs text-foreground/50">
                Project minimum applies ({money(PRICING.siteWorkMin)})
              </span>
            </div>
            <AddOnButton
              added={data.site_work}
              onToggle={() => setField("site_work", !data.site_work)}
              addLabel="+ Add Site Work + Assembly"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { PRICING, money } from "@/lib/projectPricing";

function SummaryRow({ label, value, muted = false }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm font-semibold text-foreground/60">{label}</span>
      <span className={`text-sm font-semibold text-right ${muted ? "text-foreground/40 italic" : ""}`}>
        {value}
      </span>
    </div>
  );
}

function ActionBtn({ added, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="shrink-0 text-[10px] font-bold uppercase tracking-[0.15em] text-primary hover:underline"
    >
      {added ? "Remove" : "+ Add"}
    </button>
  );
}

function ScopeBlock({ title, sub, value, added, onToggle }) {
  if (added) {
    return (
      <div className="rounded-lg border border-primary px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-sm font-bold">{title}</span>
          <span className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-bold">{value}</span>
            <ActionBtn added onToggle={onToggle} />
          </span>
        </div>
        <p className="mt-1 text-xs text-foreground/50">{sub}</p>
      </div>
    );
  }
  return (
    <div className="py-2.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold">{title}</span>
        <span className="flex items-center gap-3">
          <span className="text-sm font-bold">{value}</span>
          <ActionBtn onToggle={onToggle} />
        </span>
      </div>
      <p className="mt-0.5 text-xs text-foreground/50">{sub}</p>
    </div>
  );
}

export default function PBProjectCard({ data, setField, estimate, sf }) {
  const hasSf = sf >= PRICING.sfMin;
  const address = [data.street, data.city, data.zip].filter(Boolean).join(", ");
  const matsTotal = estimate.mats + estimate.del;
  const perSf = PRICING.materialsRate + PRICING.materialsRate * PRICING.deliveryPct;
  const included = [
    data.land_dev && "land development",
    data.materials && "building materials",
    data.site_work && "site work + assembly",
  ].filter(Boolean);
  const helper = included.length
    ? `Includes ${included.join(", ")}`
    : "Add building materials or services to build your budget";

  return (
    <div className="rounded-xl bg-card border border-border/70 shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full border border-primary/40 bg-primary/5 text-primary text-sm font-bold flex items-center justify-center shrink-0">
          05
        </span>
        <h2 className="font-heading text-xl font-bold">Your project</h2>
      </div>

      {/* Summary */}
      <div className="mt-5 border-t border-border">
        <SummaryRow label="Property" value={address || "Add your address"} muted={!address} />
        <SummaryRow label="Project size" value={hasSf ? `${sf} SF` : "—"} />
        <SummaryRow label="Plumbing" value={data.plumbing || "—"} />
      </div>

      {/* Scopes */}
      <div className="mt-5 space-y-2.5">
        <ScopeBlock
          added={data.materials}
          onToggle={() => setField("materials", !data.materials)}
          title={`Building materials ${money(PRICING.materialsRate)}/SF`}
          sub={
            hasSf
              ? `${money(estimate.mats)} materials + ${money(estimate.del)} delivery`
              : `${money(perSf)} materials + delivery per SF`
          }
          value={hasSf ? money(matsTotal) : `${money(perSf)}/SF`}
        />
        <ScopeBlock
          added={data.land_dev}
          onToggle={() => setField("land_dev", !data.land_dev)}
          title="Land Development"
          sub="Optional add-on"
          value={money(estimate.p1)}
        />
        <ScopeBlock
          added={data.site_work}
          onToggle={() => setField("site_work", !data.site_work)}
          title="Site Work + Assembly"
          sub="Optional add-on"
          value={hasSf ? money(estimate.p3) : money(PRICING.siteWorkMin)}
        />
      </div>

      {/* Adjustment */}
      <div className="mt-3 pt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground/60">Adjustment / Credit</span>
        <span className="text-sm font-bold">{money(estimate.adjustment)}</span>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-5 border-t-2 border-foreground">
        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          Expected Project Budget
        </span>
        <span className="block mt-2 font-heading text-4xl md:text-5xl font-bold">
          {money(estimate.total)}
        </span>
        <p className="mt-1.5 text-xs text-foreground/50">{helper}</p>
        <a
          href="#proceed"
          className="mt-5 block w-full px-6 py-3.5 rounded-md bg-primary text-primary-foreground text-center text-sm font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors"
        >
          Proceed with my project
        </a>
        <p className="mt-3 text-center text-[11px] text-foreground/50 leading-relaxed">
          No obligation. Your budget stays with your project review.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mt-5 pt-5 border-t border-border">
        <span className="block text-xs font-bold uppercase tracking-[0.15em] text-foreground/70">
          Expected Project Budget
        </span>
        <p className="mt-2 text-[11px] leading-relaxed text-foreground/50">
          Your Expected Project Budget is calculated using the property and project information
          provided and is designed to establish a realistic planning budget before your project
          review.
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-foreground/50">
          Final scope and pricing are subject to property and site conditions, approved plans,
          engineering, jurisdictional requirements, utility requirements, material specifications
          and final contractor review.
        </p>
      </div>
    </div>
  );
}
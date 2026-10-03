import React from "react";
import { money } from "@/lib/projectPricing";
import { BALLPARK_NOTE, LandDevSubLines } from "./LandDevQuestions";

function Row({ label, value, action }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-border">
      <span className="text-sm font-semibold text-foreground/80">{label}</span>
      <span className="flex items-center gap-3">
        {action}
        <span className="font-heading text-lg font-bold text-right break-words">{value}</span>
      </span>
    </div>
  );
}

function ScopeToggle({ added, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md transition-colors ${
        added ? "border border-primary text-primary" : "bg-primary text-primary-foreground"
      }`}
    >
      {added ? "Remove" : "+ Add"}
    </button>
  );
}

export default function BudgetPanel({ form, setField, estimate }) {
  const sf = Number(form.sf) || 0;

  return (
    <div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance">
        Your project.
      </h2>
      <p className="mt-3 text-foreground/60 leading-relaxed">
        Add or remove any scope without restarting · your budget updates in real time.
      </p>

      <div className="mt-8">
        <Row label="Property" value={form.property_address} />
        <Row label="Project Size" value={`${sf} SF`} />
        {estimate.p1 > 0 && (
          <>
            <Row label="Land Development" value={money(estimate.p1)} />
            <LandDevSubLines estimate={estimate} />
          </>
        )}
        <Row
          label="Materials"
          value={form.materials ? money(estimate.mats) : "Not included"}
          action={<ScopeToggle added={form.materials} onToggle={() => setField("materials", !form.materials)} />}
        />
        <Row label="Delivery" value={form.materials ? money(estimate.del) : "—"} />
        <Row
          label="Site Work + Assembly"
          value={form.site_work ? money(estimate.p3) : "Not included"}
          action={<ScopeToggle added={form.site_work} onToggle={() => setField("site_work", !form.site_work)} />}
        />
        {estimate.adjustment !== 0 && (
          <Row label="No-Plumbing Credit" value={money(estimate.adjustment)} />
        )}
      </div>

      <div className="mt-8 pt-6 border-t-2 border-foreground/20 flex items-baseline justify-between gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
          Expected Project Budget
        </span>
        <span className="font-heading text-4xl font-bold text-primary text-right">
          {money(estimate.total)}
        </span>
      </div>

      <p className="mt-2 text-xs font-semibold text-foreground/60">{BALLPARK_NOTE}</p>

      <p className="mt-6 text-xs text-foreground/50 leading-relaxed">
        Your Expected Project Budget is calculated using the property and project information
        provided and is designed to establish a realistic planning budget before your project
        review. Final scope and pricing are subject to property and site conditions, approved
        plans, engineering, jurisdictional requirements, utility requirements, material
        specifications and final contractor review.
      </p>
    </div>
  );
}
import React, { useState } from "react";
import { valueComparison, buildProject, money } from "@/lib/projectPricing";

function DataRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-2">
      <span className="text-sm text-foreground/60">{label}</span>
      <span className="text-sm font-bold text-right">{value}</span>
    </div>
  );
}

// Shown whenever the customer enters less than 250 SF.
// All numbers are the customer's actual calculated figures, never generic claims.
export default function ValuePrompt({ sf, onApply }) {
  const options = valueComparison(sf);
  const [selected, setSelected] = useState(options.length ? options[0].size : null);
  if (!options.length) return null;

  const opt = options.find((o) => o.size === selected) || options[0];
  const currentBudget = buildProject({ sf }).total;

  return (
    <div className="rounded-xl bg-card border border-border/70 shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 md:p-10">
      <span className="block text-xs font-bold uppercase tracking-[0.25em] text-primary">
        More space. Better value.
      </span>
      <h3 className="mt-4 font-heading text-2xl md:text-3xl font-bold text-balance">
        You're already investing in the fixed costs of building.
      </h3>
      <p className="mt-4 text-foreground/60 leading-relaxed">
        Smaller projects carry many of the same fixed development and construction costs as larger
        projects. Adding square footage lets those fixed costs work across a larger finished space,
        giving you significantly more usable space for a comparatively smaller increase in your
        overall budget.
      </p>

      <p className="mt-8 font-heading text-xl font-bold">See what more space costs.</p>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-lg border-2 border-primary p-4 text-center">
          <span className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">
            Current size
          </span>
          <span className="block mt-2 font-heading text-2xl font-bold">{sf} SF</span>
          <span className="block mt-1 text-sm font-bold">{money(currentBudget)}</span>
        </div>
        {options.map((o) => (
          <button
            key={o.size}
            type="button"
            onClick={() => setSelected(o.size)}
            className={`rounded-lg border p-4 text-center transition-colors ${
              selected === o.size
                ? "border-2 border-primary"
                : "border-border hover:border-primary/40"
            }`}
          >
            <span className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">
              +{o.addSF} SF
            </span>
            <span className="block mt-2 font-heading text-2xl font-bold">{o.size} SF</span>
            <span className="block mt-1 text-sm font-bold">{money(o.budget)}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-baseline justify-end gap-x-2">
        <span className="text-sm font-bold">Add {opt.addSF} SF of usable space</span>
        <span className="text-sm font-bold text-primary">
          {sf} → {opt.size} SF
        </span>
      </div>
      <div className="mt-4 border-t border-border" />
      <p className="mt-3 text-xs text-foreground/50">
        Shown for a complete project with all three scopes, where the fixed costs of building apply.
      </p>

      <div className="mt-4">
        <DataRow
          label="Approximate change to your Expected Project Budget"
          value={`+${money(opt.addInvestment)}`}
        />
        <DataRow
          label="Effective cost per square foot"
          value={`${money(opt.effectiveCurrent)} → ${money(opt.effectiveNew)}`}
        />
        <DataRow
          label="Cost of each additional square foot"
          value={`${money(opt.costPerAddedSF)}/SF`}
        />
      </div>

      <button
        type="button"
        onClick={() => onApply(opt.size)}
        className="mt-6 w-full px-6 py-4 rounded-md bg-primary text-primary-foreground font-bold uppercase tracking-wide text-sm hover:bg-primary/90 transition-colors"
      >
        Update my project to {opt.size} SF
      </button>
    </div>
  );
}
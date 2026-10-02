import React from "react";
import { PRICING, buildProject, clampSfInput, money } from "@/lib/projectPricing";
import ValuePrompt from "./ValuePrompt";

export default function SizeStep({ form, setField }) {
  const sf = Number(form.sf) || 0;
  const estimate = buildProject({ sf }); // complete project (all three scopes)

  const handleType = (e) => setField("sf", clampSfInput(e.target.value));

  return (
    <div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance">
        How much space do you want?
      </h2>
      <p className="mt-3 text-foreground/60 leading-relaxed">
        Pricing updates in real time as square footage changes.
      </p>

      <div className="mt-10 flex items-end gap-3 max-w-md">
        <input
          value={form.sf}
          onChange={handleType}
          inputMode="numeric"
          placeholder="250"
          className="w-44 text-5xl font-heading font-bold bg-transparent border-0 border-b-2 border-primary focus:outline-none py-1 placeholder:text-foreground/20"
        />
        <span className="text-sm font-bold uppercase tracking-[0.15em] text-foreground/50 pb-3">
          SQ. FT.
        </span>
      </div>
      {form.sf !== "" && sf < PRICING.sfMin && (
        <p className="mt-3 text-sm font-semibold text-primary">
          Minimum {PRICING.sfMin} SF · enter {PRICING.sfMin} or more to see your estimate.
        </p>
      )}

      <input
        type="range"
        min={PRICING.sfMin}
        max={PRICING.sfMax}
        step={10}
        value={Math.max(sf, PRICING.sfMin)}
        onChange={(e) => setField("sf", String(e.target.value))}
        className={`mt-6 w-full max-w-md accent-primary transition-opacity ${sf >= PRICING.sfMin ? "" : "opacity-40"}`}
      />

      {sf >= PRICING.sfMin && (
        <div className="mt-8">
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
            Complete project estimate
          </span>
          <span className="block mt-1 font-heading text-4xl font-bold text-primary">
            {money(estimate.total)}
          </span>
        </div>
      )}

      {sf >= PRICING.sfMin && sf < PRICING.smallProjectTriggerSF && (
        <ValuePrompt sf={sf} onApply={(size) => setField("sf", String(size))} />
      )}
    </div>
  );
}
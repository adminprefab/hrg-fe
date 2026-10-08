import React, { useRef, useState } from "react";
import { PRICING, buildProject, clampSfInput, money } from "@/lib/projectPricing";
import ValuePrompt from "./ValuePrompt";

export default function SizeStep({ form, setField }) {
  const sf = Number(form.sf) || 0;
  const estimate = buildProject({ sf }); // complete project (all three scopes)

  // "3,000+" mode: the slider stops at 3,000, so larger sizes are typed in.
  const [large, setLarge] = useState(sf > PRICING.sfMax);
  const inputRef = useRef(null);
  const chooseLarge = () => {
    setLarge(true);
    if (sf <= PRICING.sfMax) setField("sf", "");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleType = (e) => setField("sf", clampSfInput(e.target.value, large));

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
          ref={inputRef}
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

{large && (
        <p className="mt-3 text-sm font-semibold text-primary">
          Type your square footage (up to {PRICING.sfLargeMax.toLocaleString("en-US")} SF). Projects over{" "}
          {PRICING.sfMax.toLocaleString("en-US")} SF are confirmed individually during your project review.
        </p>
      )}

      {!large && (
      <input
        type="range"
        min={PRICING.sfMin}
        max={PRICING.sfMax}
        step={10}
        value={Math.max(sf, PRICING.sfMin)}
        onChange={(e) => setField("sf", String(e.target.value))}
        className={`mt-6 w-full max-w-md accent-primary transition-opacity ${sf >= PRICING.sfMin ? "" : "opacity-40"}`}
      />
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={chooseLarge}
          className={`px-5 py-3 rounded-md border font-heading font-bold transition-colors ${
            large
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card hover:border-primary/50"
          }`}
        >
          {PRICING.sfMax.toLocaleString("en-US")}+
        </button>
        {large && (
          <button
            type="button"
            onClick={() => { setLarge(false); setField("sf", String(PRICING.sfMax)); }}
            className="px-5 py-3 rounded-md border border-border bg-card font-heading font-bold hover:border-primary/50 transition-colors"
          >
            Back to the slider
          </button>
        )}
      </div>

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
        <ValuePrompt sf={sf} answers={form} onApply={(size) => setField("sf", String(size))} />
      )}
    </div>
  );
}
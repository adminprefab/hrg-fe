import React from "react";
import { PRICING } from "@/lib/projectPricing";
import StepHeading from "./StepHeading";

const QUICK_SIZES = [100, 400, 800, 1200, 1600, 2000, 2500, 3000];

export default function PBStepSize({ data, setField }) {
  const sf = Number(data.sf) || 0;

  return (
    <div>
      <StepHeading num="02" title="How much space do you want?" />
      <p className="mt-3 text-foreground/60 leading-relaxed">
        Your budget updates in real time as your square footage changes.
      </p>

      {/* Large value display */}
      <div className="mt-8 flex items-end gap-4 max-w-md">
        <input
          value={data.sf}
          onChange={(e) => setField("sf", e.target.value.replace(/\D/g, "").slice(0, 4))}
          inputMode="numeric"
          placeholder="0"
          className="w-48 text-6xl md:text-7xl font-heading font-bold bg-transparent border-0 border-b-2 border-primary focus:outline-none py-1 text-foreground/30 placeholder:text-foreground/25"
        />
        <span className="text-sm font-bold uppercase tracking-[0.15em] text-foreground/50 pb-4">
          SQ. FT.
        </span>
      </div>

      {/* Slider */}
      <div className="mt-8 max-w-md">
        <input
          type="range"
          min={PRICING.sfMin}
          max={PRICING.sfMax}
          step={10}
          value={Math.max(sf, PRICING.sfMin)}
          onChange={(e) => setField("sf", e.target.value)}
          className="w-full h-2 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-border
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:-mt-2.5
            [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-border
            [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-primary"
        />
        <div className="flex justify-between mt-3 text-xs font-semibold text-foreground/40">
          <span>100</span>
          <span>400</span>
          <span>800</span>
          <span>1,200</span>
          <span>1,600</span>
          <span>2,000</span>
          <span>2,500</span>
          <span>3,000</span>
        </div>
      </div>

      {/* Quick picks */}
      <div className="mt-8 flex flex-wrap gap-3">
        {QUICK_SIZES.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setField("sf", String(size))}
            className={`px-5 py-3 rounded-md border font-heading font-bold transition-colors ${
              sf === size
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            {size.toLocaleString("en-US")}
          </button>
        ))}
      </div>
    </div>
  );
}
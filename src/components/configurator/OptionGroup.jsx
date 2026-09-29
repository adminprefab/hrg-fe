import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OptionGroup({ options, value, onChange }) {
  return (
    <div className="space-y-2.5">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-md border text-sm font-medium transition-all",
              selected
                ? "border-config-blue bg-config-blue/5 text-foreground"
                : "border-config-field bg-card text-foreground/80 hover:border-config-blue/40"
            )}
          >
            <span
              className={cn(
                "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                selected ? "border-config-blue bg-config-blue" : "border-foreground/25"
              )}
            >
              {selected && <Check className="w-3.5 h-3.5 text-white" />}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}
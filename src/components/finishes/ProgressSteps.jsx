import React from "react";
import { Check } from "lucide-react";
import { CATALOGUE_STEPS } from "@/lib/builderSteps";

// Where Finishes sits in the Project Builder. Phones get one line and a bar; wider
// screens get the full row of steps.
export default function ProgressSteps({ current = "Finishes" }) {
  const index = CATALOGUE_STEPS.indexOf(current);
  return (
    <nav aria-label="Project Builder progress">
      <div className="md:hidden">
        <div className="flex justify-between text-xs text-foreground/60 mb-2">
          <span className="font-semibold uppercase tracking-wide">
            Step {index + 1} of {CATALOGUE_STEPS.length} · {current}
          </span>
          <span>Next: {CATALOGUE_STEPS[index + 1]}</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${((index + 1) / CATALOGUE_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <ol className="hidden md:flex flex-wrap items-center gap-2 text-xs">
        {CATALOGUE_STEPS.map((step, i) => {
          const done = i < index;
          const here = i === index;
          return (
            <li key={step} className="flex items-center gap-2 shrink-0" aria-current={here ? "step" : undefined} title={step}>
              <span
                className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-semibold border ${
                  here
                    ? "bg-primary border-primary text-primary-foreground"
                    : done
                      ? "border-primary text-primary"
                      : "border-border text-foreground/50"
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" aria-label="Done" /> : i + 1}
              </span>
              {/* Only the current step is named until there is room for all of them. */}
              <span className={here ? "font-semibold text-foreground" : "hidden xl:inline text-foreground/55"}>{step}</span>
              {!here && <span className="sr-only xl:hidden">{step}</span>}
              {i < CATALOGUE_STEPS.length - 1 && <span className="w-4 lg:w-6 h-px bg-border shrink-0" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

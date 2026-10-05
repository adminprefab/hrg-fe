import React from "react";
import { money } from "@/lib/projectPricing";

// The three questions that price Land Development. Shared by both builders so the
// wording and the amounts can never drift apart.
const QUESTIONS = [
  { name: "has_drawings", line: "drawings", text: "Do you already have architectural drawings or plans?", options: ["Yes", "No"] },
  { name: "has_permits", line: "permits", text: "Do you already have your building permits?", options: ["Yes", "No"] },
  { name: "lot_slope", line: "site", text: "Is your lot flat or sloped?", options: ["Flat", "Sloped", "Not sure"] },
];

export default function LandDevQuestions({ answers, setField, estimate }) {
  return (
    <div>
      <h4 className="font-heading text-2xl font-bold">From property to permit</h4>
      <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
        Answer three quick questions. Anything you already have comes off your budget.
      </p>

      <div className="mt-6 space-y-6">
        {QUESTIONS.map((q) => {
          const line = estimate.landDev.find((l) => l.key === q.line);
          return (
            <div key={q.name}>
              <p className="text-sm font-semibold text-foreground/80">{q.text}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {q.options.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setField(q.name, v)}
                    className={`px-5 py-2.5 rounded-md border font-heading text-base font-bold transition-colors ${
                      answers[q.name] === v
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-foreground/50">
                {line.amount > 0 ? `${line.label}: ${money(line.amount)}` : "$0 · you have this"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-5 border-t border-border">
        <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
          Land Development
        </span>
        <span className="block mt-1 font-heading text-3xl font-bold">
          {money(estimate.landDev.reduce((sum, l) => sum + l.amount, 0))}
        </span>
      </div>
    </div>
  );
}

// The items that apply, for budget and summary lists. Empty when nothing applies.
export function LandDevSubLines({ estimate }) {
  const lines = estimate.landDev.filter((l) => l.amount > 0);
  if (lines.length === 0) return null;
  return (
    <div className="pl-4 pb-1">
      {lines.map((l) => (
        <div key={l.key} className="flex justify-between text-xs text-foreground/50 py-0.5">
          <span>{l.label}</span>
          <span>{money(l.amount)}</span>
        </div>
      ))}
    </div>
  );
}

export const BALLPARK_NOTE =
  "Conservative ballpark, not a firm price. Final pricing is confirmed during your project review.";

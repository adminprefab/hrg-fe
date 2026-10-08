import React from "react";
import { PRICING, money } from "@/lib/projectPricing";

// The questions that price Land Development and the Site Work slope allowance. Shared by
// both builders so the wording and the amounts can never drift apart.
const LAND_DEV_QUESTIONS = [
  { name: "has_drawings", line: "drawings", text: "Do you already have architectural drawings or plans?", options: ["Yes", "No"] },
  { name: "has_permits", line: "permits", text: "Do you already have your building permits?", options: ["Yes", "No"] },
];

function Question({ text, name, options, answers, setField, note }) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground/80">{text}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {options.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setField(name, v)}
            className={`px-5 py-2.5 rounded-md border font-heading text-base font-bold transition-colors ${
              answers[name] === v
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-foreground/50">{note}</p>
    </div>
  );
}

export default function LandDevQuestions({ answers, setField, estimate }) {
  return (
    <div>
      <h4 className="font-heading text-2xl font-bold">From property to permit</h4>
      <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
        Answer two quick questions. Anything you already have comes off your budget. Priced by
        the size of your building.
      </p>

      <div className="mt-6 space-y-6">
        {LAND_DEV_QUESTIONS.map((q) => {
          const line = estimate.landDev.find((l) => l.key === q.line);
          return (
            <Question
              key={q.name}
              {...q}
              answers={answers}
              setField={setField}
              note={line.amount > 0 ? `${line.label}: ${money(line.amount)}` : "$0 · you have this"}
            />
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

// The lot question, asked on the Site Work card: a slope changes the site work, and
// approved plans do not make it go away.
export function SiteSlopeQuestion({ answers, setField }) {
  return (
    <Question
      text="Is your lot flat or sloped?"
      name="lot_slope"
      options={["Flat", "Sloped", "Not sure"]}
      answers={answers}
      setField={setField}
      note={
        answers.lot_slope === "Flat"
          ? "$0 · no slope allowance"
          : `Site + slope allowance: ${money(PRICING.siteSlopeAllowance)}`
      }
    />
  );
}

function SubLines({ lines }) {
  if (lines.length === 0) return null;
  return (
    <div className="pl-4 pb-1">
      {lines.map((l) => (
        <div key={l.label} className="flex justify-between text-xs text-foreground/50 py-0.5">
          <span>{l.label}</span>
          <span>{money(l.amount)}</span>
        </div>
      ))}
    </div>
  );
}

// The Land Development items that apply, for budget and summary lists.
export function LandDevSubLines({ estimate }) {
  return <SubLines lines={estimate.landDev.filter((l) => l.amount > 0)} />;
}

// What Site Work + Assembly is made of, when there is more to it than the base scope.
export function SiteWorkSubLines({ estimate }) {
  const { base, slope, credit } = estimate.siteWork;
  if (!slope && !credit) return null;
  return (
    <SubLines
      lines={[
        { label: "Site work + assembly", amount: base },
        slope && { label: "Site + slope allowance", amount: slope },
        credit && { label: "No-plumbing credit", amount: credit },
      ].filter(Boolean)}
    />
  );
}

export const BALLPARK_NOTE =
  "Conservative ballpark, not a firm price. Final pricing is confirmed during your project review.";

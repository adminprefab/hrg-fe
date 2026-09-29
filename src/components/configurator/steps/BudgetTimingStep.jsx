import React from "react";
import OptionGroup from "@/components/configurator/OptionGroup";
import Question from "@/components/configurator/Question";

const BUDGETS = [
  "Under $100,000",
  "$100,000–$149,999",
  "$150,000–$249,999",
  "$250,000–$399,999",
  "$400,000+",
  "I need help establishing a budget",
];

const FUNDING = [
  "Cash / available funds",
  "Financing already arranged",
  "I need financing options",
  "Still deciding",
];

const TIMING = [
  "As soon as possible",
  "Within 3 months",
  "In 3–6 months",
  "More than 6 months from now",
  "Just researching",
];

export default function BudgetTimingStep({ form, setField }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
      <div>
        <Question hint="Include planning, permits, site work, and construction. Exclude the purchase of the property.">
          What total project budget are you considering?
        </Question>
        <OptionGroup options={BUDGETS} value={form.budget} onChange={(v) => setField("budget", v)} />
      </div>
      <div className="space-y-8">
        <div>
          <Question>How do you expect to fund the project?</Question>
          <OptionGroup options={FUNDING} value={form.funding} onChange={(v) => setField("funding", v)} />
        </div>
        <div>
          <Question>When would you like to begin planning and permitting?</Question>
          <OptionGroup options={TIMING} value={form.timing} onChange={(v) => setField("timing", v)} />
        </div>
      </div>
    </div>
  );
}
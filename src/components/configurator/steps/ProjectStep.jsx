import React from "react";
import OptionGroup from "@/components/configurator/OptionGroup";
import Question from "@/components/configurator/Question";
import Field, { configInputClass } from "@/components/configurator/Field";
import { SIZE_500, SIZE_800 } from "@/lib/leadQualification";

const PLANS = [
  "Backyard ADU",
  "Standalone home",
  "Multiple homes / investment project",
  "Something else",
];

const SIZES = [SIZE_500, SIZE_800, "Custom size", "Help me decide"];

export default function ProjectStep({ form, setField, handleChange }) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Question>What are you planning?</Question>
          <OptionGroup options={PLANS} value={form.project_type} onChange={(v) => setField("project_type", v)} />
        </div>
        <div>
          <Question>What size are you considering?</Question>
          <OptionGroup options={SIZES} value={form.size_choice} onChange={(v) => setField("size_choice", v)} />
        </div>
      </div>

      {form.size_choice === "Custom size" && (
        <div className="mt-6 max-w-md">
          <Field label="Approximate square footage">
            <input
              name="custom_sqft"
              value={form.custom_sqft}
              onChange={handleChange}
              placeholder="e.g. 1,400 SF"
              className={configInputClass}
            />
          </Field>
        </div>
      )}

      {form.project_type === "Multiple homes / investment project" && (
        <div className="mt-6 max-w-md">
          <Field label="How many homes?">
            <input
              name="num_homes"
              type="number"
              min="1"
              value={form.num_homes}
              onChange={handleChange}
              placeholder="e.g. 4"
              className={configInputClass}
            />
          </Field>
        </div>
      )}
    </div>
  );
}
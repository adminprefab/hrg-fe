import React from "react";
import { UploadCloud, X } from "lucide-react";
import OptionGroup from "@/components/configurator/OptionGroup";
import Question from "@/components/configurator/Question";
import { configInputClass } from "@/components/configurator/Field";

const SEWER = ["City sewer", "Septic system", "Neither / new connection needed", "Not sure"];

const UTILITIES = ["Both available", "Water only", "Electricity only", "Neither", "Not sure"];

const SEPTIC = ["Existing system, if capacity allows", "New system needed", "Not sure"];

const CITY = ["Yes", "Not yet", "My architect or contractor has"];

const PLANS = [
  "No plans yet",
  "Sketches or inspiration images",
  "Plans in progress",
  "Completed plans, not yet approved",
  "Approved plans",
];

export default function UtilitiesPlanningStep({ form, setField, handleChange, hasProperty }) {
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setField("plans_file", f);
  };

  return (
    <div className="space-y-10">
      {hasProperty && (
        <div>
          <Question hint="Not sure? We can review this together.">Let's check your utilities.</Question>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Question>Does the property use sewer or septic?</Question>
              <OptionGroup options={SEWER} value={form.sewer_type} onChange={(v) => setField("sewer_type", v)} />
            </div>
            <div className="space-y-8">
              <div>
                <Question>Are water and electricity already available on the property?</Question>
                <OptionGroup
                  options={UTILITIES}
                  value={form.utilities_available}
                  onChange={(v) => setField("utilities_available", v)}
                />
              </div>
              {form.sewer_type === "Septic system" && (
                <div>
                  <Question>Will the new space connect to an existing septic system or need a new one?</Question>
                  <OptionGroup
                    options={SEPTIC}
                    value={form.septic_connection}
                    onChange={(v) => setField("septic_connection", v)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Question>Have you spoken with the city or county about your project?</Question>
          <OptionGroup options={CITY} value={form.city_contact} onChange={(v) => setField("city_contact", v)} />
          {form.city_contact === "Yes" && (
            <div className="mt-5">
              <Question hint="Optional">What feedback did they share?</Question>
              <textarea
                name="city_feedback"
                rows={3}
                value={form.city_feedback}
                onChange={handleChange}
                className={configInputClass}
              />
            </div>
          )}
        </div>
        <div>
          <Question>Do you have any plans or drawings?</Question>
          <OptionGroup options={PLANS} value={form.plans_status} onChange={(v) => setField("plans_status", v)} />
          <div className="mt-5">
            <Question hint="Optional">Upload any plans, drawings, or city feedback.</Question>
            {form.plans_file ? (
              <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-md border border-config-field bg-config-blue/5 text-sm">
                <span className="truncate text-foreground/80">{form.plans_file.name}</span>
                <button
                  type="button"
                  onClick={() => setField("plans_file", null)}
                  className="shrink-0"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4 text-foreground/50" />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-3 px-4 py-3.5 rounded-md border border-dashed border-config-field bg-card text-sm text-foreground/60 cursor-pointer hover:border-config-blue/40 transition-colors">
                <UploadCloud className="w-5 h-5 text-foreground/40" />
                <span>Attach a file</span>
                <input type="file" accept="image/*,.pdf" className="hidden" onChange={onFile} />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
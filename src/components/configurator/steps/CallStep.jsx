import React from "react";
import Question from "@/components/configurator/Question";
import Field, { configInputClass } from "@/components/configurator/Field";

export default function CallStep({ form, handleChange }) {
  return (
    <div className="space-y-8">
      <div>
        <Question>Who should we contact?</Question>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name">
            <input name="full_name" value={form.full_name} onChange={handleChange} required className={configInputClass} />
          </Field>
          <Field label="Mobile number">
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} required className={configInputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Email address">
              <input name="email" type="email" value={form.email} onChange={handleChange} required className={configInputClass} />
            </Field>
          </div>
        </div>
      </div>

      <div>
        <Question hint="Optional">Anything we should know before the call?</Question>
        <textarea
          name="notes"
          rows={4}
          value={form.notes}
          onChange={handleChange}
          placeholder="Existing plans or permits, access concerns, special requirements, or your biggest question."
          className={configInputClass}
        />
      </div>

      <p className="text-xs text-foreground/50">
        We'll review your answers and contact you to discuss the right next step.
      </p>
    </div>
  );
}
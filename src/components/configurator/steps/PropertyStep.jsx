import React from "react";
import OptionGroup from "@/components/configurator/OptionGroup";
import Question from "@/components/configurator/Question";
import Field, { configInputClass } from "@/components/configurator/Field";
import AddressStep from "@/components/seewhatfits/AddressStep";

const CONNECTIONS = [
  "I own it",
  "I'm under contract to purchase it",
  "I'm helping the owner",
  "I'm still looking for a property",
];

const SITE_STATUS = [
  "Existing home with space to build",
  "Vacant land",
  "Structure to replace",
  "Not sure",
];

export default function PropertyStep({ form, setField, handleChange }) {
  const hasProperty =
    !!form.property_connection && form.property_connection !== "I'm still looking for a property";

  return (
    <div className="space-y-8">
      <div>
        <Question>What's your connection to the property?</Question>
        <OptionGroup
          options={CONNECTIONS}
          value={form.property_connection}
          onChange={(v) => setField("property_connection", v)}
        />
      </div>

      {form.property_connection && (
        <div className="max-w-xl">
          <Question>Where will the project be located?</Question>
          {hasProperty ? (
            <AddressStep form={form} handleChange={handleChange} />
          ) : (
            <Field label="City and state">
              <input
                name="city_state"
                value={form.city_state}
                onChange={handleChange}
                placeholder="e.g. Tampa, FL"
                className={configInputClass}
              />
            </Field>
          )}
        </div>
      )}

      {hasProperty && (
        <div>
          <Question>What's currently on the site?</Question>
          <OptionGroup options={SITE_STATUS} value={form.site_status} onChange={(v) => setField("site_status", v)} />
        </div>
      )}
    </div>
  );
}
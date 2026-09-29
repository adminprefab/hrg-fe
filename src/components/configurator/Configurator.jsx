import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { categorizeLead, mapSize, SIZE_500, SIZE_800 } from "@/lib/leadQualification";
import ProjectStep from "@/components/configurator/steps/ProjectStep";
import PropertyStep from "@/components/configurator/steps/PropertyStep";
import BudgetTimingStep from "@/components/configurator/steps/BudgetTimingStep";
import UtilitiesPlanningStep from "@/components/configurator/steps/UtilitiesPlanningStep";
import CallStep from "@/components/configurator/steps/CallStep";
import Outcome from "@/components/configurator/outcomes/Outcome";

const TOTAL_STEPS = 5;

const STEP_TITLES = [
  "Your Project",
  "Your Property",
  "Utilities & Planning",
  "Budget & Timing",
  "Your Project Call",
];

const TIMELINE_MAP = {
  "As soon as possible": "ASAP",
  "Within 3 months": "1-3 months",
  "In 3–6 months": "3-6 months",
  "More than 6 months from now": "6+ months",
  "Just researching": "Just exploring",
};

const CATEGORY_LABELS = {
  ready_prospect: "Ready prospect",
  needs_review: "Needs review",
  early_research: "Early research",
  budget_mismatch: "Budget mismatch",
};

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [outcome, setOutcome] = useState("");
  const [leadId, setLeadId] = useState(null);

  const [config, setConfig] = useState(() => {
    // Carry a selected 500/800 SF model in from the prototype CTAs (?model=...).
    const urlParams = new URLSearchParams(window.location.search);
    const modelParam = (urlParams.get("model") || "").toLowerCase();
    return {
      project_type: "",
      size_choice: modelParam.includes("500") ? SIZE_500 : modelParam.includes("800") ? SIZE_800 : "",
      custom_sqft: "",
      num_homes: "",
      property_connection: "",
      property_address: "",
      zip_code: "",
      city_state: "",
      site_status: "",
      sewer_type: "",
      utilities_available: "",
      septic_connection: "",
      city_contact: "",
      city_feedback: "",
      plans_status: "",
      plans_file: null,
      budget: "",
      funding: "",
      timing: "",
      full_name: "",
      phone: "",
      email: "",
      notes: "",
    };
  });

  const setField = (name, value) => setConfig((c) => ({ ...c, [name]: value }));
  const handleChange = (e) => setField(e.target.name, e.target.value);

  const hasProperty =
    !!config.property_connection && config.property_connection !== "I'm still looking for a property";

  const canContinue = () => {
    switch (step) {
      case 1:
        return (
          !!config.project_type &&
          !!config.size_choice &&
          (config.size_choice !== "Custom size" || config.custom_sqft.trim() !== "") &&
          (config.project_type !== "Multiple homes / investment project" || Number(config.num_homes) >= 1)
        );
      case 2:
        return (
          !!config.property_connection &&
          (hasProperty
            ? config.property_address.trim() !== "" && !!config.site_status
            : config.city_state.trim() !== "")
        );
      case 3:
        return (
          !!config.city_contact &&
          !!config.plans_status &&
          (!hasProperty ||
            (!!config.sewer_type &&
              !!config.utilities_available &&
              (config.sewer_type !== "Septic system" || !!config.septic_connection)))
        );
      case 4:
        return !!config.budget && !!config.funding && !!config.timing;
      case 5:
        return (
          config.full_name.trim() !== "" &&
          config.phone.trim() !== "" &&
          /.+@.+\..+/.test(config.email)
        );
      default:
        return true;
    }
  };

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const category = categorizeLead(config);
      const size = mapSize(config.size_choice);
      let plans_file_url = "";
      if (config.plans_file) {
        try {
          const up = await base44.integrations.Core.UploadPublicFile({ file: config.plans_file });
          plans_file_url = up?.file_url || "";
        } catch (uploadErr) {
          // a failed upload shouldn't block the lead
        }
      }
      const res = await base44.entities.Lead.create({
        full_name: config.full_name,
        phone: config.phone,
        email: config.email,
        project_type: config.project_type,
        size_choice: size,
        custom_sqft: config.custom_sqft,
        num_homes:
          config.project_type === "Multiple homes / investment project" ? Number(config.num_homes) || 0 : undefined,
        property_connection: config.property_connection,
        property_address: config.property_address,
        zip_code: config.zip_code,
        city_state: config.city_state,
        site_status: config.site_status,
        sewer_type: config.sewer_type,
        utilities_available: config.utilities_available,
        septic_connection: config.septic_connection,
        city_contact: config.city_contact,
        city_feedback: config.city_feedback,
        plans_status: config.plans_status,
        plans_file_url: plans_file_url || undefined,
        budget: config.budget,
        funding: config.funding,
        timeline: TIMELINE_MAP[config.timing] || "",
        special_requests: config.notes,
        model_selection:
          size === "500 SF" ? "500 SF Prototype" : size === "800 SF" ? "800 SF Prototype" : "Not Sure",
        lead_category: CATEGORY_LABELS[category],
      });
      setLeadId(res?.id || null);
      setOutcome(category);
    } catch (err) {
      setError("Something went wrong sending your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pct = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="py-6 md:py-8">
      <div className="max-w-2xl mx-auto px-6 text-center mb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground">
          Find the right fit for <em className="not-italic font-bold">your property.</em>
        </h2>
        <p className="mt-4 text-foreground/60 max-w-xl mx-auto leading-relaxed">
          Tell us what you're planning. We'll use your answers to discuss your options, budget, and next steps on a
          focused project call.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {outcome ? (
          <div className="bg-card rounded-lg border border-config-field px-6 md:px-10 py-10 md:py-14">
            <Outcome category={outcome} leadId={leadId} sizeChoice={mapSize(config.size_choice)} />
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-config-field px-6 md:px-10 py-8 md:py-10">
            {/* Progress */}
            <div>
              <div className="flex justify-between text-xs text-foreground/60 mb-2">
                <span className="font-semibold">
                  Step {step} of {TOTAL_STEPS}: {STEP_TITLES[step - 1]}
                </span>
                <span>{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-config-field overflow-hidden">
                <div
                  className="h-full bg-config-blue rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Step content */}
            <div className="mt-8">
              {step === 1 && <ProjectStep form={config} setField={setField} handleChange={handleChange} />}
              {step === 2 && <PropertyStep form={config} setField={setField} handleChange={handleChange} />}
              {step === 3 && (
                <UtilitiesPlanningStep
                  form={config}
                  setField={setField}
                  handleChange={handleChange}
                  hasProperty={hasProperty}
                />
              )}
              {step === 4 && <BudgetTimingStep form={config} setField={setField} />}
              {step === 5 && <CallStep form={config} handleChange={handleChange} />}
            </div>

            {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

            {/* Footer */}
            <div className="mt-10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 rounded-md bg-config-field text-foreground font-semibold text-sm hover:bg-config-muted transition-colors"
                >
                  Back
                </button>
              ) : (
                <span />
              )}
              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  disabled={!canContinue()}
                  onClick={() => setStep(step + 1)}
                  className="px-8 py-3 rounded-md bg-config-navy text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canContinue() || loading}
                  onClick={submit}
                  className="px-8 py-3 rounded-md bg-config-navy text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-40"
                >
                  {loading ? "Sending..." : "Request My Project Call"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
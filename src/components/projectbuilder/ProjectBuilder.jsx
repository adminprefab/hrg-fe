import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { createLead, landDevFields, leadDetails, sendLeadEmail, uploadNote } from "@/lib/leadEmail";
import { PRICING, buildProject, money } from "@/lib/projectPricing";
import { presetLeadFields } from "@/lib/buildPreset";
import { BUILDER_STEPS, CATALOGUE_STEPS } from "@/lib/builderSteps";
import AddressLookup from "./AddressLookup";
import SizeStep from "./SizeStep";
import ScopeCards from "./ScopeCards";
import BudgetPanel from "./BudgetPanel";
import ProceedStep from "./ProceedStep";

const STEP_TITLES = BUILDER_STEPS;
const TOTAL_STEPS = STEP_TITLES.length;

// `preset` is a model the visitor picked elsewhere (see buildPreset.js): its size starts the
// size step, and its finishes and add-ons are priced in. With a preset the budget shows as a range.
export default function ProjectBuilder({ preset = null }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    property_address: "",
    city: "",
    zip_code: "",
    jurisdiction: "",
    sf: preset ? String(preset.sf) : "",
    original_sf: null,
    plumbing: "",
    has_drawings: "",
    has_permits: "",
    lot_slope: "",
    materials: true,
    site_work: true,
    full_name: "",
    email: "",
    phone: "",
    timeline: "",
    city_contact: "",
    sewer_type: "",
    utility_info: "",
    plans_file: null,
  });

  // A build from the Finishes step has already done "Your Model" and "Finishes" (CATALOGUE_STEPS).
  const stepOffset = preset?.finishes ? CATALOGUE_STEPS.length - BUILDER_STEPS.length : 0;

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const sf = Number(form.sf) || 0;
  const estimate = buildProject({
    sf,
    plumbing: form.plumbing || "Yes",
    landDevAnswers: form,
    materials: form.materials,
    siteWork: form.site_work,
    finishes: preset?.finishes,
    addOns: preset?.addOns,
  });
  const budgetText = preset
    ? `${money(estimate.range.low)} – ${money(estimate.range.high)}`
    : money(estimate.total);

  const anyScope = estimate.p1 > 0 || form.materials || form.site_work;
  const contactValid =
    form.full_name.trim() !== "" &&
    /.+@.+\..+/.test(form.email) &&
    form.phone.replace(/\D/g, "").length >= 10;

  const canContinue = () => {
    switch (step) {
      case 1:
        return form.property_address.trim() !== "";
      case 2:
        return sf >= PRICING.sfMin && sf <= PRICING.sfLargeMax;
      case 3:
        return form.plumbing !== "";
      case 4:
        return anyScope;
      default:
        return true;
    }
  };

  const advance = () => {
    // Record the original SF the customer entered, for the value-prompt funnel metric.
    if (step === 2 && !form.original_sf) setField("original_sf", sf);
    setStep(step + 1);
  };

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      let plans_file_url = "";
      if (form.plans_file) {
        try {
          const up = await base44.integrations.Core.UploadPublicFile({
            file: form.plans_file,
          });
          plans_file_url = up?.file_url || "";
        } catch (uploadErr) {
          // a failed upload shouldn't block the lead
        }
      }
      const landDev = landDevFields(form, estimate);
      const build = presetLeadFields(preset, estimate, sf);
      await createLead({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        property_address: form.property_address,
        city: form.city || undefined,
        zip_code: form.zip_code || undefined,
        jurisdiction: form.jurisdiction || undefined,
        original_sf: form.original_sf || sf,
        final_sf: sf,
        plumbing: form.plumbing,
        scope_materials: form.materials,
        scope_site_work: form.site_work,
        p1_estimate: estimate.p1,
        materials_estimate: estimate.mats,
        delivery_estimate: estimate.del,
        p3_estimate: estimate.p3,
        adjustment_amount: estimate.adjustment,
        expected_budget: estimate.total,
        ...landDev.entity,
        city_contact: form.city_contact || undefined,
        sewer_type: form.sewer_type || undefined,
        utility_info: form.utility_info || undefined,
        timeline: form.timeline || undefined,
        plans_file_url: plans_file_url || undefined,
        lead_flow: preset ? "Build Yours" : "Project Builder",
      }, landDev.entityNew, build.entity);

      await sendLeadEmail({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        property_address:
          [form.property_address, form.city, form.zip_code].filter(Boolean).join(", ") || "-",
        final_sf: sf,
        plumbing: form.plumbing || "-",
        scope_materials: form.materials ? "Yes" : "No",
        scope_site_work: form.site_work ? "Yes" : "No",
        expected_budget: budgetText,
        timeline: form.timeline || "-",
        ...landDev.email,
        plans_file_url: uploadNote(!!form.plans_file, plans_file_url),
        jurisdiction: form.jurisdiction || "-",
        city_contact: form.city_contact || "-",
        sewer_type: form.sewer_type || "-",
        utility_info: form.utility_info || "-",
        lead_flow: preset ? "Build Yours" : "Project Builder",
        details: leadDetails({
          flow: preset ? "Build Yours (/collection/prefab-design-build/…/build → /see-what-fits)" : "Project Builder (/see-what-fits)",
          build: build.lines,
          jurisdiction: form.jurisdiction,
          cityContact: form.city_contact,
          sewerType: form.sewer_type,
          utilityInfo: form.utility_info,
          originalSf: form.original_sf,
          finalSf: sf,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong sending your project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-6 md:py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-lg border border-border px-6 md:px-10 py-12 md:py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h2 className="mt-6 font-heading text-3xl md:text-4xl font-bold">
              Your project is in.
            </h2>
            <p className="mt-4 text-foreground/60 leading-relaxed max-w-md mx-auto">
              We're reviewing your {sf} SF project. A member of our team will
              reach out to schedule your project review.
            </p>
            <div className="mt-8 border-t border-b border-border py-5">
              <span className="block text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
                Your Expected Project Budget
              </span>
              <span className="block mt-1 font-heading text-3xl md:text-4xl font-bold text-primary">
                {budgetText}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div id="builder" className="max-w-3xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="bg-card rounded-lg border border-border px-6 md:px-10 py-8 md:py-10">
          {preset && (
            <div className="mb-6 flex items-center gap-4 rounded-md border border-border p-3">
              <img src={preset.img} alt={preset.name} className="w-16 h-12 rounded object-cover bg-white shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold truncate">{preset.name}</div>
                <div className="text-xs text-foreground/60">
                  {sf ? `${sf.toLocaleString("en-US")} SF` : ""}
                  {preset.finishes ? " · your finishes" : ""}
                </div>
              </div>
              {preset.editTo && (
                <Link
                  to={`${preset.editTo}${form.plumbing === "No" ? "&plumbing=No" : ""}`}
                  className="text-xs font-semibold uppercase tracking-wide text-primary hover:underline shrink-0">
                  Edit finishes
                </Link>
              )}
            </div>
          )}

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs text-foreground/60 mb-2">
              <span className="font-semibold uppercase tracking-wide">
                Step {step + stepOffset} of {TOTAL_STEPS + stepOffset} · {STEP_TITLES[step - 1]}
              </span>
              <span>{Math.round(((step + stepOffset) / (TOTAL_STEPS + stepOffset)) * 100)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((step + stepOffset) / (TOTAL_STEPS + stepOffset)) * 100}%` }}
              />
            </div>
          </div>

          {/* Live budget once a size is set */}
          {step >= 3 && (
            <div className="mt-6 flex items-baseline justify-between gap-4 border-y border-border py-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
                Expected Project Budget
              </span>
              <span className="font-heading text-xl md:text-2xl font-bold text-primary text-right">
                {budgetText}
              </span>
            </div>
          )}

          {/* Step content */}
          <div className="mt-8">
            {step === 1 && <AddressLookup form={form} setField={setField} />}
            {step === 2 && <SizeStep form={form} setField={setField} />}
            {step === 3 && (
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance">
                  Will your project include plumbing?
                </h2>
                <p className="mt-3 text-foreground/60 leading-relaxed">
                  Most backyard projects include at least a half bath · plumbing
                  affects utilities, permitting and site work.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 max-w-xs">
                  {["Yes", "No"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setField("plumbing", v)}
                      className={`py-5 rounded-md border font-heading text-xl font-bold transition-colors ${
                        form.plumbing === v
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {form.plumbing === "No" && (
                  <p className="mt-6 text-sm font-semibold text-primary">
                    {`No plumbing takes ${money(-estimate.siteWork.credit)} off Site Work + Assembly${
                      sf >= PRICING.sfMin ? `, now ${money(estimate.p3)}` : ""
                    }.`}
                  </p>
                )}
              </div>
            )}
            {step === 4 && (
              <ScopeCards form={form} setField={setField} sf={sf} estimate={estimate} />
            )}
            {step === 5 && (
              <BudgetPanel
                form={form}
                setField={setField}
                estimate={estimate}
                budgetText={budgetText}
              />
            )}
            {step === 6 && (
              <ProceedStep
                form={form}
                setField={setField}
                estimate={estimate}
                sf={sf}
                preset={preset}
                budgetText={budgetText}
                onSubmit={submit}
                loading={loading}
                error={error}
                disabled={!contactValid}
              />
            )}
          </div>

          {/* Footer nav */}
          {step < 6 && (
            <div className="mt-10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3.5 rounded-md border border-border font-semibold text-sm hover:bg-secondary transition-colors"
                >
                  Back
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                disabled={!canContinue()}
                onClick={advance}
                className="px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-40"
              >
                {step === 5 ? "Proceed with my project" : "Continue"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

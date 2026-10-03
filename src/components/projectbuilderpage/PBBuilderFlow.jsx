import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { createLead, landDevFields, leadDetails, sendLeadEmail, uploadNote } from "@/lib/leadEmail";
import { PRICING, buildProject, money } from "@/lib/projectPricing";
import StepHeading from "./StepHeading";
import PBStepProperty from "./PBStepProperty";
import PBStepSize from "./PBStepSize";
import PBStepScopes from "./PBStepScopes";
import PBStepProceed from "./PBStepProceed";
import PBProjectCard from "./PBProjectCard";
import ValuePrompt from "@/components/projectbuilder/ValuePrompt";

const CARD =
  "rounded-xl bg-card border border-border/70 shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-6 md:p-10";

export default function PBBuilderFlow() {
  const [data, setData] = useState({
    street: "",
    city: "",
    zip: "",
    jurisdiction: "",
    sf: "",
    original_sf: null,
    plumbing: "",
    materials: true,
    has_drawings: "",
    has_permits: "",
    lot_slope: "",
    site_work: false,
    full_name: "",
    email: "",
    phone: "",
    timeline: "",
    city_contact: "",
    sewer_type: "",
    utility_info: "",
    plans_file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const setField = (name, value) =>
    setData((d) => {
      const next = { ...d, [name]: value };
      // Record the original SF the customer entered, for the value-prompt funnel metric.
      if (
        name === "sf" &&
        d.original_sf == null &&
        Number(value) >= PRICING.sfMin
      ) {
        next.original_sf = Number(value);
      }
      return next;
    });

  const sf = Number(data.sf) || 0;
  const estimate = buildProject({
    sf,
    plumbing: data.plumbing || "Yes",
    landDevAnswers: data,
    materials: data.materials,
    siteWork: data.site_work,
  });
  const showValuePrompt =
    sf >= PRICING.sfMin && sf < PRICING.smallProjectTriggerSF;

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      let plans_file_url = "";
      if (data.plans_file) {
        try {
          const up = await base44.integrations.Core.UploadPublicFile({
            file: data.plans_file,
          });
          plans_file_url = up?.file_url || "";
        } catch (uploadErr) {
          // a failed upload shouldn't block the lead
        }
      }
      const landDev = landDevFields(data, estimate);
      await createLead({
        full_name: data.full_name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        property_address: data.street,
        city: data.city || undefined,
        zip_code: data.zip || undefined,
        jurisdiction: data.jurisdiction || undefined,
        original_sf: data.original_sf || sf,
        final_sf: sf,
        plumbing: data.plumbing || undefined,
        scope_materials: data.materials,
        scope_site_work: data.site_work,
        p1_estimate: estimate.p1,
        materials_estimate: estimate.mats,
        delivery_estimate: estimate.del,
        p3_estimate: estimate.p3,
        adjustment_amount: estimate.adjustment,
        expected_budget: estimate.total,
        ...landDev.entity,
        city_contact: data.city_contact || undefined,
        sewer_type: data.sewer_type || undefined,
        utility_info: data.utility_info || undefined,
        timeline: data.timeline || undefined,
        plans_file_url: plans_file_url || undefined,
        lead_flow: "Project Builder Page",
      }, landDev.entityNew);
      await sendLeadEmail({
        full_name: data.full_name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        property_address:
          [data.street, data.city, data.zip].filter(Boolean).join(", ") || "-",
        final_sf: sf,
        plumbing: data.plumbing || "-",
        scope_materials: data.materials ? "Yes" : "No",
        scope_site_work: data.site_work ? "Yes" : "No",
        expected_budget: money(estimate.total),
        timeline: data.timeline || "-",
        ...landDev.email,
        plans_file_url: uploadNote(!!data.plans_file, plans_file_url),
        jurisdiction: data.jurisdiction || "-",
        city_contact: data.city_contact || "-",
        sewer_type: data.sewer_type || "-",
        utility_info: data.utility_info || "-",
        lead_flow: "Project Builder Page",
        details: leadDetails({
          flow: "Project Builder Page (home page)",
          jurisdiction: data.jurisdiction,
          cityContact: data.city_contact,
          sewerType: data.sewer_type,
          utilityInfo: data.utility_info,
          originalSf: data.original_sf,
          finalSf: sf,
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        document
          .getElementById("proceed")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    } catch (err) {
      setError("Something went wrong sending your project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="build" className="py-20 md:py-24 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
        <div className="min-w-0">
          <StepHeading
            num="Project builder"
            title={
              <span>
                Let's build <em className="font-serif italic">your project.</em>
              </span>
            }
          />

          <div className="mt-10 space-y-8">
            {/* 01 · Property */}
            <div className={CARD}>
              <PBStepProperty data={data} setField={setField} />
            </div>

            {/* 02 · Size */}
            <div className="pt-2">
              <PBStepSize data={data} setField={setField} />
            </div>

            {/* More space. Better value. */}
            {showValuePrompt && !submitted && (
              <ValuePrompt
                sf={sf}
                onApply={(size) => setField("sf", String(size))}
              />
            )}

            {/* 03 · Plumbing */}
            {!submitted && (
              <div className={CARD}>
                <StepHeading
                  num="03"
                  title="Will your project include plumbing?"
                />
                <p className="mt-3 text-foreground/60 leading-relaxed">
                  A bathroom, kitchenette or any fixture that needs water and
                  sewer or septic.
                </p>
                <div className="mt-6 flex gap-4 max-w-sm">
                  {["Yes", "No"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setField("plumbing", v)}
                      className={`flex-1 py-4 rounded-md border font-heading text-xl font-bold uppercase tracking-wide transition-colors ${
                        data.plumbing === v
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-secondary text-foreground hover:border-primary/50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {data.plumbing === "No" && sf >= PRICING.sfMin && (
                  <p className="mt-6 text-sm font-semibold text-primary">
                    {data.site_work
                      ? `Your Expected Project Budget includes a ${money(PRICING.noPlumbingAdjustment)} no-plumbing credit on Site Work + Assembly.`
                      : `Add Site Work + Assembly to apply the ${money(PRICING.noPlumbingAdjustment)} no-plumbing credit.`}
                  </p>
                )}
              </div>
            )}

            {/* 04 · Scopes */}
            {!submitted && (
              <div className={CARD}>
                <PBStepScopes data={data} setField={setField} sf={sf} estimate={estimate} />
              </div>
            )}

            {/* 05 · Your project (mobile / tablet) */}
            {!submitted && (
              <div className="lg:hidden">
                <PBProjectCard
                  data={data}
                  setField={setField}
                  estimate={estimate}
                  sf={sf}
                />
              </div>
            )}

            {/* 06 · Proceed */}
            <div id="proceed" className="scroll-mt-32">
              <PBStepProceed
                data={data}
                setField={setField}
                sf={sf}
                estimate={estimate}
                onSubmit={submit}
                loading={loading}
                error={error}
                submitted={submitted}
              />
            </div>
          </div>
        </div>

        {/* Sticky project card (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            {!submitted && (
              <PBProjectCard
                data={data}
                setField={setField}
                estimate={estimate}
                sf={sf}
              />
            )}
          </div>
        </aside>
      </div>

      {/* Sticky live budget bar (mobile) */}
      {sf >= PRICING.sfMin && !submitted && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border shadow-lg lg:hidden">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
              Expected Project Budget
            </span>
            <span className="flex items-center gap-5">
              <span className="font-heading text-xl md:text-2xl font-bold text-primary">
                {money(estimate.total)}
              </span>
              <a
                href="#proceed"
                className="text-xs font-bold uppercase tracking-wide text-primary hover:underline"
              >
                View
              </a>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

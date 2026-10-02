import React, { useState } from "react";
import { money } from "@/lib/projectPricing";
import StepHeading from "./StepHeading";

const TIMELINES = [
  { label: "As soon as possible", value: "ASAP" },
  { label: "1-3 months", value: "1-3 months" },
  { label: "3-6 months", value: "3-6 months" },
  { label: "6-12 months", value: "6-12 months" },
  { label: "12+ months", value: "12+ months" },
  { label: "Still planning", value: "Just exploring" },
];

const SEWER_OPTIONS = [
  { label: "Sewer", value: "City sewer" },
  { label: "Septic", value: "Septic system" },
  { label: "Not sure", value: "Not sure" },
];

function Text({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-foreground/80 mb-2">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-md border border-border bg-card focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40"
      />
    </label>
  );
}

function Choice({ label, name, value, options, onSelect }) {
  return (
    <div>
      <span className="block text-sm font-semibold text-foreground/80 mb-2">{label}</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onSelect(name, o.value)}
            className={`px-4 py-3.5 rounded-md border text-sm font-semibold transition-colors ${
              value === o.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/50"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 py-3.5 px-5 ${
        strong ? "bg-secondary/60" : ""
      }`}
    >
      <span className="text-xs font-bold uppercase tracking-wide text-foreground/50 shrink-0">
        {label}
      </span>
      <span className="text-right text-sm font-semibold break-words">{value}</span>
    </div>
  );
}

export default function PBStepProceed({ data, setField, sf, estimate, onSubmit, loading, error, submitted }) {
  const address = [data.street, data.city, data.zip].filter(Boolean).join(", ");
  const [contactError, setContactError] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 md:p-12 text-center">
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-balance">
          Your project is <em className="font-serif italic">in review.</em>
        </h3>
        <p className="mt-4 text-foreground/60 leading-relaxed max-w-md mx-auto">
          We've received your project and Expected Project Budget. An HRG project manager will reach
          out to schedule your project review.
        </p>
        <div className="mt-8 border-t border-b border-border py-5">
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
            Expected Project Budget
          </span>
          <span className="block mt-1 font-heading text-4xl font-bold text-primary">
            {money(estimate.total)}
          </span>
        </div>
      </div>
    );
  }

  const contactValid =
    data.full_name.trim() !== "" &&
    /.+@.+\..+/.test(data.email) &&
    data.phone.replace(/\D/g, "").length >= 10;

  const handleSubmit = () => {
    if (!contactValid) {
      setContactError(true);
      document.getElementById("proceed")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setContactError(false);
    onSubmit();
  };

  return (
    <div>
      <StepHeading num="06" title="Proceed with your project" />
      <p className="mt-3 text-foreground/60 leading-relaxed">
        Here's the project you built. Add a few details and we'll schedule your project review.
      </p>
      <a
        href="#build"
        className="mt-3 inline-block text-xs font-bold uppercase tracking-wide text-primary hover:underline"
      >
        Edit my project
      </a>

      <div className="mt-6 rounded-lg border border-border divide-y divide-border overflow-hidden">
        <SummaryRow label="Property" value={address || "—"} />
        <SummaryRow label="Square Footage" value={`${sf} SF`} />
        <SummaryRow label="Bathroom / Plumbing" value={data.plumbing || "—"} />
        {data.materials && (
          <SummaryRow
            label="Materials + Delivery"
            value={`${money(estimate.mats)} + ${money(estimate.del)}`}
          />
        )}
        {data.land_dev && <SummaryRow label="Land Development" value={money(estimate.p1)} />}
        {data.site_work && <SummaryRow label="Site Work + Assembly" value={money(estimate.p3)} />}
        {estimate.adjustment !== 0 && (
          <SummaryRow label="No-Plumbing Adjustment" value={money(estimate.adjustment)} />
        )}
        <SummaryRow
          label="Expected Project Budget"
          strong
          value={<span className="font-heading text-xl font-bold text-primary">{money(estimate.total)}</span>}
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Text
          label="Name"
          value={data.full_name}
          onChange={(e) => setField("full_name", e.target.value)}
          placeholder="Your name"
        />
        <Text
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="you@email.com"
        />
        <Text
          label="Phone"
          type="tel"
          value={data.phone}
          onChange={(e) => setField("phone", e.target.value)}
          placeholder="(555) 000-0000"
        />
        <Choice label="Desired timeline" name="timeline" value={data.timeline} options={TIMELINES} onSelect={setField} />
        <Choice
          label="Do you have existing plans or drawings?"
          name="has_plans"
          value={data.has_plans}
          options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]}
          onSelect={setField}
        />
        <Choice
          label="Have you spoken with the city?"
          name="city_contact"
          value={data.city_contact}
          options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "Not yet" }]}
          onSelect={setField}
        />
        <Choice
          label="Is the property on sewer or septic?"
          name="sewer_type"
          value={data.sewer_type}
          options={SEWER_OPTIONS}
          onSelect={setField}
        />
      </div>

      <label className="block mt-6">
        <span className="block text-sm font-semibold text-foreground/80 mb-2">
          Known utility information · optional
        </span>
        <textarea
          value={data.utility_info}
          onChange={(e) => setField("utility_info", e.target.value)}
          rows={3}
          placeholder="Water, power, gas or sewer access on site, and anything else we should know."
          className="w-full px-4 py-3.5 rounded-md border border-border bg-card focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40"
        />
      </label>

      <label className="block mt-6">
        <span className="block text-sm font-semibold text-foreground/80 mb-2">
          Upload plans or documents
        </span>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.csv,.txt,.md"
          onChange={(e) => setField("plans_file", e.target.files?.[0] || null)}
          className="text-sm text-foreground/60 file:mr-3 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:px-4 file:py-2.5 file:font-semibold"
        />
        <span className="block mt-1.5 text-xs text-foreground/50">
          Optional. Survey, drawings, photos, PDFs.
        </span>
      </label>

      {contactError && !contactValid && (
        <p className="mt-6 text-sm font-semibold text-destructive">
          Please add your name, email and a 10-digit phone number so we can schedule your project review.
        </p>
      )}
      {error && <p className="mt-6 text-sm font-semibold text-destructive">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 w-full px-8 py-4 rounded-md bg-primary text-primary-foreground font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {loading ? "Scheduling..." : "Schedule project review"}
      </button>
    </div>
  );
}
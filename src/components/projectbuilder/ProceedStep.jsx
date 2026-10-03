import React from "react";
import { money } from "@/lib/projectPricing";
import { PLAN_FILE_TYPES } from "@/lib/leadEmail";
import { BALLPARK_NOTE, LandDevSubLines } from "@/components/projectbuilder/LandDevQuestions";

const TIMELINES = ["ASAP", "1-3 months", "3-6 months", "6+ months", "Just exploring"];
const SEWER_OPTIONS = ["City sewer", "Septic system", "Neither / new connection needed", "Not sure"];

function Text({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-foreground/80 mb-2">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40"
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
            key={o}
            type="button"
            onClick={() => onSelect(name, o)}
            className={`px-4 py-3.5 rounded-md border text-sm font-semibold transition-colors ${
              value === o
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/50"
            }`}
          >
            {o}
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

export default function ProceedStep({ form, setField, estimate, sf, onSubmit, loading, error, disabled }) {
  return (
    <div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance">
        Proceed with your project.
      </h2>
      <p className="mt-3 text-foreground/60 leading-relaxed">
        Here's what we have so far · just a few details left to schedule your project review.
      </p>

      {/* Clean summary first */}
      <div className="mt-8 rounded-lg border border-border divide-y divide-border overflow-hidden">
        <SummaryRow label="Property" value={form.property_address} />
        <SummaryRow label="Square Footage" value={`${sf} SF`} />
        <SummaryRow label="Bathroom / Plumbing" value={form.plumbing} />
        {estimate.p1 > 0 && (
          <>
            <SummaryRow label="Land Development" value={money(estimate.p1)} />
            <LandDevSubLines estimate={estimate} />
          </>
        )}
        {form.materials && (
          <SummaryRow
            label="Materials + Delivery"
            value={`${money(estimate.mats)} + ${money(estimate.del)}`}
          />
        )}
        {form.site_work && <SummaryRow label="Site Work + Assembly" value={money(estimate.p3)} />}
        {estimate.adjustment !== 0 && (
          <SummaryRow label="No-Plumbing Adjustment" value={money(estimate.adjustment)} />
        )}
        <SummaryRow
          label="Expected Project Budget"
          strong
          value={<span className="font-heading text-xl font-bold text-primary">{money(estimate.total)}</span>}
        />
      </div>
      <p className="mt-2 text-xs font-semibold text-foreground/60">{BALLPARK_NOTE}</p>

      {/* Contact details */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Text
          label="Name"
          value={form.full_name}
          onChange={(e) => setField("full_name", e.target.value)}
          placeholder="Your name"
        />
        <Text
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="you@email.com"
        />
        <Text
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
          placeholder="(555) 000-0000"
        />
        <Choice label="Desired timeline" name="timeline" value={form.timeline} options={TIMELINES} onSelect={setField} />
        <Choice
          label="Have you spoken with the city?"
          name="city_contact"
          value={form.city_contact}
          options={["Yes", "Not yet"]}
          onSelect={setField}
        />
        <Choice label="Sewer or septic" name="sewer_type" value={form.sewer_type} options={SEWER_OPTIONS} onSelect={setField} />
      </div>

      <label className="block mt-6">
        <span className="block text-sm font-semibold text-foreground/80 mb-2">
          Known utility information
        </span>
        <textarea
          value={form.utility_info}
          onChange={(e) => setField("utility_info", e.target.value)}
          rows={3}
          placeholder="Water, power, gas or sewer access on site, and anything else we should know."
          className="w-full px-4 py-3.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40"
        />
      </label>

      <label className="block mt-6">
        <span className="block text-sm font-semibold text-foreground/80 mb-2">
          Plans or documents (optional)
        </span>
        <input
          type="file"
          accept={PLAN_FILE_TYPES}
          onChange={(e) => setField("plans_file", e.target.files?.[0] || null)}
          className="text-sm text-foreground/60 file:mr-3 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:px-4 file:py-2.5 file:font-semibold"
        />
      </label>

      {error && <p className="mt-6 text-sm font-semibold text-destructive">{error}</p>}

      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled || loading}
        className="mt-8 w-full px-8 py-4 rounded-md bg-primary text-primary-foreground font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-40"
      >
        {loading ? "Scheduling..." : "Schedule Project Review"}
      </button>
      {disabled && (
        <p className="mt-3 text-xs text-foreground/50 text-center">
          Add your name, email and a 10-digit phone number to schedule your review.
        </p>
      )}
    </div>
  );
}
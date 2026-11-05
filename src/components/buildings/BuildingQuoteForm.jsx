import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { money } from "@/lib/projectPricing";
import { createLead, sendLeadEmail } from "@/lib/leadEmail";
import { BUILDINGS } from "@/lib/buildingCatalogue";

const inputClass =
  "w-full min-h-11 px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-primary mb-2";

// Four contact fields plus the building picked on a card (or chosen here).
// Saves a CRM lead first, then emails sales@, so a failed email never loses the request.
export default function BuildingQuoteForm({ selectedId, onSelect }) {
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", zip_code: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const b = BUILDINGS.find((x) => x.id === selectedId);
  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const label = b ? `${b.name} · ${b.sf} SF${b.code ? ` (${b.code})` : ""}` : "Not selected";
    const lines = [
      "Form: Building Collection (/buildings)",
      `Building: ${label}`,
      b ? `Building package: ${money(b.price.pkg)} (building + delivery)` : null,
      b ? `Est. installed: ${money(b.price.low)} – ${money(b.price.high)}` : null,
      b ? `Plumbing: ${b.plumbing ? "Yes" : "No"}` : null,
    ].filter(Boolean);
    try {
      await createLead(
        {
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          zip_code: form.zip_code.trim() || undefined,
          project_type: b && b.group !== "backyard" ? "Detached ADU" : "Something else",
          message: lines.join("\n"),
          lead_flow: "Building Collection",
        },
        {
          model_selection: `Building: ${label}`,
          final_sf: b?.sf,
          estimate_low: b?.price.low,
          estimate_high: b?.price.high,
        },
      );
      await sendLeadEmail({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        property_address: form.zip_code ? `ZIP ${form.zip_code.trim()}` : "-",
        final_sf: b ? b.sf : "-",
        plumbing: b ? (b.plumbing ? "Yes" : "No") : "-",
        scope_land_dev: "-",
        scope_materials: "-",
        scope_site_work: "-",
        expected_budget: b ? `${money(b.price.low)} – ${money(b.price.high)} installed` : "-",
        timeline: "-",
        has_plans: "-",
        plans_file_url: "No file uploaded",
        jurisdiction: "-",
        city_contact: "-",
        sewer_type: "-",
        utility_info: `Building quote: ${label}`,
        lead_flow: "Building Collection",
        details: lines.join("\n"),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong sending your request. Please try again, or call us at 909.274.0272.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <CheckCircle className="mx-auto w-12 h-12 text-primary" />
        <h3 className="mt-4 font-heading text-2xl font-bold">Thanks, we've got it.</h3>
        <p className="mt-2 text-foreground/65">We'll confirm the plan, your price and a delivery window.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-border bg-card p-6 md:p-8">
      <label className="block">
        <span className={labelClass}>Building</span>
        <select id="building-choice" className={inputClass} value={selectedId || ""} onChange={(e) => onSelect(e.target.value || null)}>
          <option value="">Not sure yet</option>
          {BUILDINGS.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name} · {x.sf.toLocaleString("en-US")} SF
            </option>
          ))}
        </select>
      </label>
      {b && (
        <p className="mt-2 text-sm text-foreground/65" aria-live="polite">
          {money(b.price.pkg)} building package · est. installed {money(b.price.low)} – {money(b.price.high)}
        </p>
      )}

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <label>
          <span className={labelClass}>Name</span>
          <input required id="b-name" name="full_name" autoComplete="name" value={form.full_name} onChange={set} className={inputClass} />
        </label>
        <label>
          <span className={labelClass}>Phone</span>
          <input required id="b-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set} className={inputClass} />
        </label>
        <label>
          <span className={labelClass}>Email</span>
          <input required id="b-email" name="email" type="email" autoComplete="email" value={form.email} onChange={set} className={inputClass} />
        </label>
        <label>
          <span className={labelClass}>Property ZIP</span>
          <input id="b-zip" name="zip_code" inputMode="numeric" autoComplete="postal-code" value={form.zip_code} onChange={set} className={inputClass} />
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full min-h-12 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
      >
        {loading ? "Sending…" : "Get my building quote"}
      </button>
      <p className="mt-3 text-xs text-foreground/55">No obligation. Prices are planning estimates, confirmed after a site review.</p>
    </form>
  );
}

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { money } from "@/lib/projectPricing";
import { createLead, sendLeadEmail, trackLead } from "@/lib/leadEmail";
import { POOL_MODELS, POOL_PRICING, customPoolPrice } from "@/lib/poolCatalogue";

const inputClass =
  "w-full min-h-11 px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-primary mb-2";

// Four contact fields plus the pool: the model picked on a card, or a custom size.
// Saves a CRM lead first, then emails sales@, so a failed email never loses the request.
export default function PoolQuoteForm({ selected, onClear }) {
  const [custom, setCustom] = useState({ model: "linea", w: "", l: "" });
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", zip_code: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const customModel = POOL_MODELS.find((m) => m.id === custom.model);
  const customQuote = selected ? null : customPoolPrice(customModel, Number(custom.w), Number(custom.l));
  const C = POOL_PRICING.custom;

  const pool = selected
    ? { label: `${selected.model.name} ${selected.size[0]}x${selected.size[1]} ft`, p: selected.price, kind: "Catalogue size" }
    : customQuote
      ? { label: `${customModel.name} custom ${custom.w}x${custom.l} ft`, p: customQuote, kind: "Custom size" }
      : null;

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const promo = POOL_PRICING.promo;
    const lines = [
      "Form: Pool Collection (/pools)",
      pool ? `Pool: ${pool.label} (${pool.kind})` : "Pool: not selected",
      pool ? `Package: ${money(pool.p.pkg)}${pool.p.promo ? ` (list ${money(pool.p.list)}, ${promo.name} ${promo.percentOff}% off through ${promo.endsLabel}, ${promo.terms.toLowerCase()})` : ""}` : null,
      pool && pool.kind === "Custom size" ? `Includes ${money(C.engineeringFee)} custom engineering and tooling fee` : null,
      pool ? `Water surface: ${pool.p.sf} SF · ${pool.p.modules} sections` : null,
      pool ? `Est. installed: ${money(pool.p.low)} – ${money(pool.p.high)}` : null,
    ].filter(Boolean);
    try {
      await createLead(
        {
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          zip_code: form.zip_code.trim() || undefined,
          project_type: "Something else",
          message: lines.join("\n"),
          lead_flow: "Pool Collection",
        },
        {
          model_selection: pool ? `Pool: ${pool.label}` : "Pool: not selected",
          estimate_low: pool?.p.low,
          estimate_high: pool?.p.high,
        },
      );
      await sendLeadEmail({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        property_address: form.zip_code ? `ZIP ${form.zip_code.trim()}` : "-",
        final_sf: pool ? `${pool.p.sf} SF water surface` : "-",
        plumbing: "-",
        scope_land_dev: "-",
        scope_materials: "-",
        scope_site_work: "-",
        expected_budget: pool ? `${money(pool.p.low)} – ${money(pool.p.high)} installed` : "-",
        timeline: "-",
        has_plans: "-",
        plans_file_url: "No file uploaded",
        jurisdiction: "-",
        city_contact: "-",
        sewer_type: "-",
        utility_info: pool ? `Pool quote: ${pool.label}` : "Pool quote",
        lead_flow: "Pool Collection",
        details: lines.join("\n"),
      });
      trackLead({ content_name: "Pool Collection" });
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
        <p className="mt-2 text-foreground/65">We'll confirm your price, installation range and delivery date.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-border bg-card p-6 md:p-8">
      {selected ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-secondary/40 p-4">
          <div>
            <div className="font-heading font-bold">{pool.label}</div>
            <div className="text-sm text-foreground/65">
              {money(pool.p.pkg)} package · est. installed {money(pool.p.low)} – {money(pool.p.high)}
            </div>
          </div>
          <button type="button" onClick={onClear} className="min-h-11 text-sm font-semibold text-primary hover:underline">
            Custom size instead
          </button>
        </div>
      ) : (
        <fieldset>
          <legend className="font-heading font-bold">Custom size</legend>
          <p className="text-sm text-foreground/60">Or pick a model above. Widths {C.minW}–{C.maxW} ft, lengths {C.minL}–{C.maxL} ft.</p>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <label className="col-span-2 sm:col-span-1">
              <span className={labelClass}>Closest model</span>
              <select className={inputClass} value={custom.model} onChange={(e) => setCustom({ ...custom, model: e.target.value })}>
                {POOL_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </label>
            <label>
              <span className={labelClass}>Width (ft)</span>
              <input className={inputClass} inputMode="numeric" value={custom.w} onChange={(e) => setCustom({ ...custom, w: e.target.value.replace(/\D/g, "") })} />
            </label>
            <label>
              <span className={labelClass}>Length (ft)</span>
              <input className={inputClass} inputMode="numeric" value={custom.l} onChange={(e) => setCustom({ ...custom, l: e.target.value.replace(/\D/g, "") })} />
            </label>
          </div>
          {customQuote && (
            <p className="mt-3 text-sm" aria-live="polite">
              <strong>{money(customQuote.pkg)}</strong> estimated package, including the {money(C.engineeringFee)} engineering and tooling fee · est. installed {money(customQuote.low)} – {money(customQuote.high)}
            </p>
          )}
        </fieldset>
      )}

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <label>
          <span className={labelClass}>Name</span>
          <input required name="full_name" autoComplete="name" value={form.full_name} onChange={set} className={inputClass} />
        </label>
        <label>
          <span className={labelClass}>Phone</span>
          <input required name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set} className={inputClass} />
        </label>
        <label>
          <span className={labelClass}>Email</span>
          <input required name="email" type="email" autoComplete="email" value={form.email} onChange={set} className={inputClass} />
        </label>
        <label>
          <span className={labelClass}>Property ZIP</span>
          <input name="zip_code" inputMode="numeric" autoComplete="postal-code" value={form.zip_code} onChange={set} className={inputClass} />
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full min-h-12 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
      >
        {loading ? "Sending…" : "Get my pool quote"}
      </button>
      <p className="mt-3 text-xs text-foreground/55">No obligation. Prices are planning estimates, confirmed after engineering and a site review.</p>
    </form>
  );
}

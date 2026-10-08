import emailjs from "@emailjs/browser";
import { base44 } from "@/api/base44Client";
import { money } from "@/lib/projectPricing";

// File types the plans upload accepts (both builders).
export const PLAN_FILE_TYPES =
  ".pdf,.png,.jpg,.jpeg,.gif,.webp,.heic,.heif,.doc,.docx,.xls,.xlsx,.dwg,.dxf,.csv,.txt,.md";

// What the sales email says about the upload, so a failed upload isn't mistaken for no upload.
export const uploadNote = (hadFile, url) =>
  url || (hadFile ? "UPLOAD FAILED · the customer attached a file; ask them to send it again" : "No file uploaded");

// Every answer that isn't its own template field, as one block ({{details}} in the EmailJS template).
export function leadDetails({ flow, jurisdiction, cityContact, sewerType, utilityInfo, originalSf, finalSf }) {
  return [
    `Form: ${flow}`,
    `Jurisdiction: ${jurisdiction || "-"}`,
    `Spoken with the city: ${cityContact || "-"}`,
    `Sewer or septic: ${sewerType || "-"}`,
    `Utility notes: ${utilityInfo || "-"}`,
    originalSf && originalSf !== finalSf ? `First entered size: ${originalSf} SF` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

// Land Development answers and amounts: Lead fields that already existed (entity), Lead
// fields added with the questions (entityNew), and the email (email). The lot question
// prices the Site Work slope allowance, so it travels with them.
// has_plans comes from the drawings question, which replaced the old plans question.
export function landDevFields(answers, estimate) {
  const amount = (key) => estimate.landDev.find((l) => l.key === key).amount;
  const yesNo = (v) => (v === "Yes" ? true : v === "No" ? false : undefined);
  return {
    entity: {
      scope_land_dev: estimate.p1 > 0,
      has_plans: yesNo(answers.has_drawings),
    },
    entityNew: {
      has_drawings: answers.has_drawings || undefined,
      has_permits: answers.has_permits || undefined,
      lot_slope: answers.lot_slope || undefined,
      land_dev_drawings: amount("drawings"),
      land_dev_permits: amount("permits"),
      site_slope_allowance: estimate.siteWork.slope,
    },
    email: {
      scope_land_dev: estimate.p1 > 0 ? "Yes" : "No",
      has_plans: answers.has_drawings || "-",
      has_drawings: answers.has_drawings || "Not answered",
      has_permits: answers.has_permits || "Not answered",
      lot_slope: answers.lot_slope || "Not answered",
      land_dev_total: money(estimate.p1),
      land_dev_drawings: money(amount("drawings")),
      land_dev_permits: money(amount("permits")),
      site_slope_allowance: money(estimate.siteWork.slope),
      site_work_total: money(estimate.p3),
      no_plumbing_credit: money(estimate.siteWork.credit),
    },
  };
}

// Saves the lead. If the hosted Lead schema refuses the newer fields (it lags behind
// base44/entities/Lead.jsonc until that is pushed), save without them rather than lose
// the lead; the email still carries every answer.
export async function createLead(fields, newerFields) {
  try {
    return await base44.entities.Lead.create({ ...fields, ...newerFields });
  } catch (err) {
    console.error("Lead save with the newer fields failed; saving without them.", err);
    return base44.entities.Lead.create(fields);
  }
}

// The lead is already saved by the time this runs, so a failed email never blocks the visitor.
// Retry once for brief outages; after that, log it (the lead is still in Base44).
export async function sendLeadEmail(params) {
  const send = () =>
    emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, params, {
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  try {
    await send();
  } catch {
    await new Promise((r) => setTimeout(r, 1500));
    try {
      await send();
    } catch (err) {
      console.error("Lead notification email failed; the lead is saved in Base44.", err);
    }
  }
}

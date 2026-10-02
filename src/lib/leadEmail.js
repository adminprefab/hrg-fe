import emailjs from "@emailjs/browser";

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

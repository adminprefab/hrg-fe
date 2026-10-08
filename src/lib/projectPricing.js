// HRG Project Builder — pricing variables.
// All customer-facing pricing is derived from these values. Change them here;
// the calculator and value prompt update automatically.

export const PRICING = {
  materialsRate: 100, // $/SF for prefabricated materials
  deliveryPct: 0.22, // delivery as a share of materials cost
  // Land Development, per item (drawings, permits), by building size: [up to SF, amount].
  landDevTiers: [
    [1000, 15000],
    [2000, 20000],
    [3000, 25000],
    [Infinity, 30000],
  ],
  siteSlopeAllowance: 15000, // added to Site Work + Assembly unless the lot is confirmed flat
  siteWorkMin: 35000, // minimum site work + assembly cost
  siteWorkLowRate: 110, // $/SF low end of site work rate
  siteWorkHighRate: 160, // $/SF high end of site work rate
  noPlumbingAdjustment: 15000, // credit on Site Work + Assembly when there is no plumbing
  smallProjectTriggerSF: 250, // below this, show the value prompt
  comparisonSizes: [250, 350, 500],
  sfMin: 100,
  sfMax: 3000, // top of the slider and quick picks
  sfLargeMax: 20000, // largest size accepted when typed in through the "3,000+" option
};

// Working site work rate: midpoint of the low/high band.
export const SITE_WORK_RATE = (PRICING.siteWorkLowRate + PRICING.siteWorkHighRate) / 2;

export const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

export const materialsCost = (sf) => sf * PRICING.materialsRate;
export const deliveryCost = (sf) => materialsCost(sf) * PRICING.deliveryPct;
export const siteWorkCost = (sf) => Math.max(sf * SITE_WORK_RATE, PRICING.siteWorkMin);

// One Land Development item at this size. Before a size is entered, the smallest tier.
export const landDevItemAmount = (sf) => PRICING.landDevTiers.find(([upTo]) => (sf || 0) <= upTo)[1];

// Land Development is two items, each settled by a question about the property.
// An unanswered question counts as "not yet", so the budget starts conservative and
// only drops when the client confirms they already have something.
export const LAND_DEV_ITEMS = [
  { key: "drawings", answer: "has_drawings", label: "Drawings + engineering" },
  { key: "permits", answer: "has_permits", label: "Permits + approvals" },
];

// Each item with what it adds for these answers at this size: its tier amount, or 0 when
// the client already has it.
export const landDevLines = (answers = {}, sf = 0) =>
  LAND_DEV_ITEMS.map((item) => ({
    key: item.key,
    label: item.label,
    amount: answers[item.answer] === "Yes" ? 0 : landDevItemAmount(sf),
  }));

// Site Work + Assembly, itemised: the base scope, the slope allowance (the lot question
// lives here, not in Land Development: approved plans do not flatten a lot), and the
// no-plumbing credit. The credit shows whether or not Site Work is in the budget, so
// answering the plumbing question always visibly changes the Site Work price.
export function siteWorkParts(sf, answers = {}, plumbing = "Yes") {
  const base = siteWorkCost(sf);
  const slope = answers.lot_slope === "Flat" ? 0 : PRICING.siteSlopeAllowance;
  const credit = plumbing === "No" ? -Math.min(PRICING.noPlumbingAdjustment, base + slope) : 0;
  return { base, slope, credit, total: base + slope + credit };
}

// What the square-footage box accepts: digits only, never more than the maximum.
// `large` is the "3,000+" mode, where the visitor types a size above the slider's range.
export const clampSfInput = (raw, large = false) => {
  const max = large ? PRICING.sfLargeMax : PRICING.sfMax;
  const digits = String(raw).replace(/\D/g, "").slice(0, String(max).length);
  return digits && Number(digits) > max ? String(max) : digits;
};

// Project estimate across the three scopes. Scopes left out contribute 0.
// A size below the minimum isn't priced yet, and the total is never negative.
// Land Development is always part of the budget; the answers decide how much of it applies.
// Until there is a size there is no building to budget, so p1 and the total stay at 0 rather
// than showing a budget made of nothing but add-ons. landDev still carries each item's amount.
// p3 is Site Work + Assembly net of its slope allowance and no-plumbing credit (see
// siteWork for the parts); adjustment is the credit as applied to the budget.
export function buildProject({ sf, plumbing = "Yes", landDevAnswers = {}, materials = true, siteWork = true }) {
  const billableSf = sf >= PRICING.sfMin ? Math.min(sf, PRICING.sfLargeMax) : 0;
  const landDev = landDevLines(landDevAnswers, billableSf);
  const p1 = billableSf ? landDev.reduce((sum, l) => sum + l.amount, 0) : 0;
  const mats = materialsCost(billableSf);
  const del = deliveryCost(billableSf);
  const parts = siteWorkParts(billableSf, landDevAnswers, plumbing);
  const p3 = parts.total;
  const adjustment = siteWork && billableSf ? parts.credit : 0;
  const total = billableSf ? Math.max(0, p1 + (materials ? mats + del : 0) + (siteWork ? p3 : 0)) : 0;
  return { p1, landDev, mats, del, p3, siteWork: parts, adjustment, total };
}

// Under-250 SF value comparison: current size vs. 250 / 350 / 500 SF complete projects.
// `answers` (plumbing, drawings, permits, lot) price every size the way the visitor answered.
export function valueComparison(sf, answers = {}) {
  const opts = { plumbing: answers.plumbing || "Yes", landDevAnswers: answers };
  const current = buildProject({ sf, ...opts }).total;
  return PRICING.comparisonSizes
    .filter((size) => size > sf)
    .map((size) => {
      const budget = buildProject({ sf: size, ...opts }).total;
      const addSF = size - sf;
      const addInvestment = budget - current;
      return {
        size,
        budget,
        addSF,
        addInvestment,
        costPerAddedSF: addInvestment / addSF,
        effectiveCurrent: current / sf,
        effectiveNew: budget / size,
      };
    });
}
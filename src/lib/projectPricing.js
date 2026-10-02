// HRG Project Builder — pricing variables.
// All customer-facing pricing is derived from these values. Change them here;
// the calculator and value prompt update automatically.

export const PRICING = {
  materialsRate: 100, // $/SF for prefabricated materials
  deliveryPct: 0.22, // delivery as a share of materials cost
  landDevBase: 15000, // baseline land development cost
  landDevMin: 15000, // minimum land development cost
  siteWorkMin: 35000, // minimum site work + assembly cost
  siteWorkLowRate: 110, // $/SF low end of site work rate
  siteWorkHighRate: 160, // $/SF high end of site work rate
  noPlumbingAdjustment: 15000, // credit for 100 SF no-plumbing projects
  smallProjectTriggerSF: 250, // below this, show the value prompt
  comparisonSizes: [250, 350, 500],
  sfMin: 100,
  sfMax: 3000,
};

// Working site work rate: midpoint of the low/high band.
export const SITE_WORK_RATE = (PRICING.siteWorkLowRate + PRICING.siteWorkHighRate) / 2;

export const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

export const materialsCost = (sf) => sf * PRICING.materialsRate;
export const deliveryCost = (sf) => materialsCost(sf) * PRICING.deliveryPct;
export const landDevelopmentCost = () => Math.max(PRICING.landDevBase, PRICING.landDevMin);
export const siteWorkCost = (sf) => Math.max(sf * SITE_WORK_RATE, PRICING.siteWorkMin);
// The no-plumbing credit comes off Site Work + Assembly, so it never exceeds that scope.
export const adjustmentFor = (sf, plumbing, siteWorkAmount = Infinity) =>
  sf === 100 && plumbing === "No" ? -Math.min(PRICING.noPlumbingAdjustment, siteWorkAmount) : 0;

// What the square-footage box accepts: digits only, never more than the maximum.
export const clampSfInput = (raw) => {
  const digits = String(raw).replace(/\D/g, "").slice(0, 4);
  return digits && Number(digits) > PRICING.sfMax ? String(PRICING.sfMax) : digits;
};

// Project estimate across the three scopes. Scopes left out contribute 0.
// A size below the minimum isn't priced yet, and the total is never negative.
export function buildProject({ sf, plumbing = "Yes", landDev = true, materials = true, siteWork = true }) {
  const billableSf = sf >= PRICING.sfMin ? Math.min(sf, PRICING.sfMax) : 0;
  const p1 = landDevelopmentCost();
  const mats = materialsCost(billableSf);
  const del = deliveryCost(billableSf);
  const p3 = siteWorkCost(billableSf);
  const adjustment = siteWork ? adjustmentFor(billableSf, plumbing, p3) : 0;
  const total = Math.max(
    0,
    (landDev ? p1 : 0) + (materials ? mats + del : 0) + (siteWork ? p3 : 0) + adjustment
  );
  return { p1, mats, del, p3, adjustment, total };
}

// Under-250 SF value comparison: current size vs. 250 / 350 / 500 SF complete projects.
export function valueComparison(sf) {
  const current = buildProject({ sf }).total;
  return PRICING.comparisonSizes
    .filter((size) => size > sf)
    .map((size) => {
      const budget = buildProject({ sf: size }).total;
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
// Lead qualification rules. Starting ranges are set from HRG's current pricing assumptions.

export const STARTING_RANGE = {
  "500 SF": 110000,
  "800 SF": 165000,
};

const BUDGET_LOW = {
  "Under $100,000": 0,
  "$100,000–$149,999": 100000,
  "$150,000–$249,999": 150000,
  "$250,000–$399,999": 250000,
  "$400,000+": 400000,
};

export const SIZE_500 = "500 SF · 1 bedroom";
export const SIZE_800 = "800 SF · 2 bedrooms";

// Maps a display size option to the stored scope value.
export function mapSize(s) {
  if (!s) return "";
  if (s === SIZE_500 || s.startsWith("500")) return "500 SF";
  if (s === SIZE_800 || s.startsWith("800")) return "800 SF";
  return s;
}

// True when the selected budget's low end sits below the confirmed starting range for the scope.
export function budgetBelowScope(sizeDisplay, budget) {
  const scope = mapSize(sizeDisplay);
  const start = STARTING_RANGE[scope];
  if (!start || !(budget in BUDGET_LOW)) return false;
  return BUDGET_LOW[budget] < start;
}

export function categorizeLead(config) {
  const hasProperty =
    !!config.property_connection && config.property_connection !== "I'm still looking for a property";
  const nearTerm =
    config.timing === "As soon as possible" || config.timing === "Within 3 months";

  // Budget below the confirmed starting range for a known scope.
  if (hasProperty && budgetBelowScope(config.size_choice, config.budget)) {
    return "budget_mismatch";
  }

  // No property yet, or no near-term plan.
  if (!hasProperty || config.timing === "Just researching") {
    return "early_research";
  }

  // Worth a call, but a person should look first.
  const needsReview =
    config.funding === "I need financing options" ||
    config.budget === "I need help establishing a budget" ||
    config.size_choice === "Custom size" ||
    config.size_choice === "Help me decide" ||
    config.property_connection === "I'm helping the owner";

  if (needsReview) return "needs_review";

  // Property secured, plausible budget, near-term intent.
  if (nearTerm) return "ready_prospect";

  return "needs_review";
}
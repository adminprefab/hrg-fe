// HRG Prefab finish pricing and selection rules. The catalogue itself (categories,
// options, coordinated looks) lives in finishCatalogue.js.
//
// Only VERIFIED prices count. An option prices in only when it has `verified: true` and a
// `perSf` (per square foot of the home) or `flat` (per home) amount. The `included`
// option adds $0. Everything else shows "Pricing to be confirmed" and leaves the budget
// as it is. HRG's draft numbers (draft: true, from the Master Cost Calculator: middle
// options together +$20/SF, top options +$50/SF, the gap between the $79 / $99 / $129
// grades) stay in the data for review until HRG confirms them.
import { ADD_ONS, COORDINATED_LOOKS, FINISH_CATEGORIES } from "./finishCatalogue";

export { ADD_ONS, COORDINATED_LOOKS, FINISH_CATEGORIES };

// Every slot, flat, with its category key. A finish selection is keyed by slot.
export const FINISH_GROUPS = FINISH_CATEGORIES.flatMap((c) =>
  c.slots.map((s) => ({ ...s, category: c.key, categoryLabel: c.label }))
);

// The range shown around a configured price, the same spread as the cost planner.
export const RANGE = { low: 0.9, high: 1.15 };
export const priceRange = (total) => ({ low: total * RANGE.low, high: total * RANGE.high });

export const includedOption = (slot) => slot.options.find((o) => o.included) || slot.options[0];
export const isPriced = (o) => Boolean(o.included || (o.verified && (o.perSf || o.flat)));

// What an option adds at this size: a number when priced, null when pricing is pending.
export const optionCost = (o, sf) => (o.included ? 0 : isPriced(o) ? (o.perSf || 0) * sf + (o.flat || 0) : null);

// Which categories apply to this project. `scope.kitchen` / `scope.plumbing` false hide
// the categories that need them; anything unknown shows.
export const relevantCategories = (scope = {}) =>
  FINISH_CATEGORIES.filter((c) => !c.needs || scope[c.needs] !== false);

// One line per slot (the chosen option, or the included one when nothing is chosen yet)
// and per chosen add-on. `amount` is 0 for included, a number for verified upgrades and
// null while pricing is pending; `chosen` says whether the homeowner picked it.
export function finishLines(sf, finishes = {}, addOns = []) {
  const lines = FINISH_GROUPS.map((g) => {
    const option = g.options.find((o) => o.key === finishes[g.key]) || includedOption(g);
    return {
      group: g.key,
      label: g.label,
      name: option.name,
      chosen: Boolean(finishes[g.key]),
      included: Boolean(option.included),
      amount: optionCost(option, sf),
    };
  });
  ADD_ONS.filter((a) => addOns.includes(a.key)).forEach((a) =>
    lines.push({ group: "addon", label: "Add-on", name: a.name, chosen: true, included: false, amount: optionCost(a, sf) })
  );
  return lines;
}

// The Lead entity's enum fields for these choices. interior_level follows the flooring
// choice; upgrades lists only the add-ons the Lead enum knows.
export function finishLeadFields(finishes = {}, addOns = []) {
  const fields = {};
  FINISH_GROUPS.filter((g) => g.leadField).forEach((g) => {
    const option = g.options.find((o) => o.key === finishes[g.key]) || includedOption(g);
    fields[g.leadField] = option.lead;
  });
  fields.upgrades = ADD_ONS.filter((a) => a.lead && addOns.includes(a.key)).map((a) => a.lead);
  return fields;
}

// Choices to and from a URL: ?f=flooring.oak,cabinets.white&a=solar,deck
// Every chosen slot is written, included ones too, so "chosen" survives a reload.
export function encodeFinishes(finishes = {}, addOns = []) {
  const f = FINISH_GROUPS.filter((g) => finishes[g.key])
    .map((g) => `${g.key}.${finishes[g.key]}`)
    .join(",");
  return { f, a: addOns.join(",") };
}

// Only known slot/option pairs survive, so a stale or edited link never breaks the page.
export function decodeFinishes(f = "", a = "") {
  const finishes = {};
  f.split(",").forEach((pair) => {
    const [group, option] = pair.split(".");
    const g = FINISH_GROUPS.find((x) => x.key === group);
    if (g && g.options.some((o) => o.key === option)) finishes[group] = option;
  });
  const addOns = a.split(",").filter((k) => ADD_ONS.some((x) => x.key === k));
  return { finishes, addOns };
}

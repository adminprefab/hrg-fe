// HRG Prefab finish and upgrade prices for the "Build yours" configurator.
//
// DRAFT: every price below was drafted from HRG's existing numbers and is waiting for
// HRG's review (draft: true). Change a number here and the configurator, the builder
// and the lead email all follow.
//
// How the drafts were made (HRG_Master_Cost_Calculator, Assumptions tab):
// - The first option in each group is what the base price already includes
//   (projectPricing.js materialsRate, $100/SF), so it adds $0.
// - The middle options together add $20/SF and the top options $50/SF: the gap between
//   HRG's prefab material grades, Base $79 → Mid $99 → Luxury $129 per SF.
// - The gap is split across groups by the calculator's own cost weights (interior
//   finishes $18/SF and kitchen + bath $16/SF, ×1.25 Mid and ×1.60 Luxury).
// - Add-ons use the calculator's Options rates where it has one (deck $45/SF,
//   landscaping $6k / $18k) and national installed averages where it does not.
//
// Photos: Unsplash (free license), hotlinked from images.unsplash.com.

const unsplash = (id) => `https://images.unsplash.com/${id}?w=480&h=360&fit=crop&q=70`;

// `perSf` is per square foot of the home; `flat` is one price per home.
// `lead` is the value the option saves into the Lead entity's enum fields.
export const FINISH_GROUPS = [
  {
    key: "exterior",
    label: "Siding",
    leadField: "exterior_package",
    options: [
      { key: "lap", name: "Fiber-cement lap", perSf: 0, lead: "Standard", img: unsplash("photo-1560990469-8addd0eb06fc") },
      // draft: share of the $79→$99 grade gap ($20/SF) for the envelope
      { key: "batten", name: "Board & batten", perSf: 4, draft: true, lead: "Impact", img: unsplash("photo-1770756051811-1612ac8bedfa") },
      // draft: share of the $79→$129 grade gap ($50/SF) for the envelope
      { key: "cedar", name: "Cedar + metal", perSf: 10, draft: true, lead: "Architectural", img: unsplash("photo-1596830762262-7b5e55dd821c") },
    ],
  },
  {
    key: "roof",
    label: "Roof",
    options: [
      { key: "shingle", name: "Architectural shingle", perSf: 0, img: unsplash("photo-1598885835780-bf5a4d21c017") },
      // draft: share of the $20/SF Mid grade gap
      { key: "metal", name: "Standing-seam metal", perSf: 2.5, draft: true, img: unsplash("photo-1602193458517-db6caca8f1fe") },
      // draft: share of the $50/SF Luxury grade gap
      { key: "tile", name: "Concrete tile", perSf: 6, draft: true, img: unsplash("photo-1605450099279-533bd3ce379a") },
    ],
  },
  {
    key: "windows",
    label: "Windows & doors",
    options: [
      { key: "vinyl", name: "White vinyl, dual-pane", perSf: 0, img: unsplash("photo-1600210492486-724fe5c67fb0") },
      // draft: share of the $20/SF Mid grade gap
      { key: "black", name: "Black aluminum frames", perSf: 3, draft: true, img: unsplash("photo-1600607687939-ce8a6c25118c") },
      // draft: share of the $50/SF Luxury grade gap
      { key: "glasswall", name: "Sliding glass wall", perSf: 8, draft: true, img: unsplash("photo-1600566753190-17f0baa2a6c3") },
    ],
  },
  {
    key: "flooring",
    label: "Flooring",
    leadField: "interior_level",
    options: [
      { key: "lvp", name: "Luxury vinyl plank", perSf: 0, lead: "Essential", img: unsplash("photo-1628229896022-b7dd8720eafe") },
      // draft: interior finishes $18/SF × 0.25 Mid factor ≈ $4.50
      { key: "oak", name: "Engineered oak", perSf: 4.5, draft: true, lead: "Premium", img: unsplash("photo-1584622781564-1d987f7333c1") },
      // draft: interior finishes $18/SF × 0.60 Luxury factor ≈ $10.80
      { key: "stone", name: "Large-format porcelain", perSf: 11, draft: true, lead: "Luxury", img: unsplash("photo-1786933638319-10ebbb5b8661") },
    ],
  },
  {
    key: "kitchen",
    label: "Kitchen",
    leadField: "kitchen",
    options: [
      { key: "classic", name: "Classic: shaker + laminate", perSf: 0, lead: "Classic", img: unsplash("photo-1556911220-bff31c812dba") },
      // draft: kitchen + bath $16/SF × 0.25 Mid factor = $4
      { key: "designer", name: "Designer: quartz + flat panel", perSf: 4, draft: true, lead: "Designer", img: unsplash("photo-1556909114-f6e7ad7d3136") },
      // draft: kitchen + bath $16/SF × 0.60 Luxury factor ≈ $9.60, rounded up for stone counters
      { key: "luxury", name: "Luxury: stone + panel-ready", perSf: 10, draft: true, lead: "Luxury", img: unsplash("photo-1565538810643-b5bdb714032a") },
    ],
  },
  {
    key: "bath",
    label: "Bathroom",
    options: [
      { key: "standard", name: "Tub-shower + stock vanity", perSf: 0, img: unsplash("photo-1552321554-5fefe8c9ef14") },
      // draft: share of the $20/SF Mid grade gap
      { key: "walkin", name: "Tiled walk-in shower", perSf: 2, draft: true, img: unsplash("photo-1584622650111-993a426fbf0a") },
      // draft: share of the $50/SF Luxury grade gap
      { key: "spa", name: "Spa: stone + floating vanity", perSf: 5, draft: true, img: unsplash("photo-1620626011761-996317b8d101") },
    ],
  },
];

export const ADD_ONS = [
  // draft: ~4 kW system at the national installed average of about $3.25/W
  { key: "solar", name: "Solar, 4 kW", flat: 13000, draft: true, lead: "Solar", img: unsplash("photo-1509391366360-2e959784a276") },
  // draft: two-zone ductless heat pump, national installed average
  { key: "minisplit", name: "Mini-split heat + AC", flat: 7500, draft: true, img: unsplash("photo-1762341123870-d706f257a12e") },
  // draft: locks, thermostat, lighting and doorbell package
  { key: "smart", name: "Smart home", flat: 4500, draft: true, lead: "Smart Home", img: unsplash("photo-1558002038-1055907df827") },
  // draft: Master Cost Calculator deck rate $45/SF × 200 SF
  { key: "deck", name: "Deck, 200 SF", flat: 9000, draft: true, lead: "Outdoor Living", img: unsplash("photo-1613544723371-23b514a78c85") },
  // draft: Master Cost Calculator "Landscaping — Basic"
  { key: "landscape", name: "Landscaping", flat: 6000, draft: true, lead: "Landscape", img: unsplash("photo-1558904541-efa843a96f01") },
];

// The range shown around a configured price, the same spread as the cost planner.
export const RANGE = { low: 0.9, high: 1.15 };
export const priceRange = (total) => ({ low: total * RANGE.low, high: total * RANGE.high });

// Per-SF upgrade when every group takes its option at this position (0 = base, 1 = middle,
// 2 = top). The collection page shows these as its finish levels.
export const levelUpgradePerSf = (i) => FINISH_GROUPS.reduce((sum, g) => sum + (g.options[i]?.perSf || 0), 0);

// Each group starts on its included option.
export const defaultFinishes = () => Object.fromEntries(FINISH_GROUPS.map((g) => [g.key, g.options[0].key]));

const optionCost = (o, sf) => (o.perSf || 0) * sf + (o.flat || 0);

// What the chosen finishes and add-ons add at this size, one line per choice that costs
// something. Unknown keys fall back to the included option, so a stale link still prices.
export function finishLines(sf, finishes = {}, addOns = []) {
  const lines = FINISH_GROUPS.map((g) => {
    const option = g.options.find((o) => o.key === finishes[g.key]) || g.options[0];
    return { group: g.key, label: g.label, name: option.name, amount: optionCost(option, sf) };
  });
  ADD_ONS.filter((a) => addOns.includes(a.key)).forEach((a) =>
    lines.push({ group: "addon", label: "Add-on", name: a.name, amount: optionCost(a, sf) })
  );
  return lines;
}

// The Lead entity's enum fields for these choices. interior_level follows the flooring
// choice; upgrades lists only the add-ons the Lead enum knows.
export function finishLeadFields(finishes = {}, addOns = []) {
  const fields = {};
  FINISH_GROUPS.filter((g) => g.leadField).forEach((g) => {
    const option = g.options.find((o) => o.key === finishes[g.key]) || g.options[0];
    fields[g.leadField] = option.lead;
  });
  fields.upgrades = ADD_ONS.filter((a) => a.lead && addOns.includes(a.key)).map((a) => a.lead);
  return fields;
}

// Choices to and from a URL: ?f=exterior.batten,kitchen.designer&a=solar,deck
// Only choices that differ from the included option are written.
export function encodeFinishes(finishes = {}, addOns = []) {
  const f = FINISH_GROUPS.filter((g) => finishes[g.key] && finishes[g.key] !== g.options[0].key)
    .map((g) => `${g.key}.${finishes[g.key]}`)
    .join(",");
  return { f, a: addOns.join(",") };
}

export function decodeFinishes(f = "", a = "") {
  const finishes = defaultFinishes();
  f.split(",").forEach((pair) => {
    const [group, option] = pair.split(".");
    const g = FINISH_GROUPS.find((x) => x.key === group);
    if (g && g.options.some((o) => o.key === option)) finishes[group] = option;
  });
  const addOns = a.split(",").filter((k) => ADD_ONS.some((x) => x.key === k));
  return { finishes, addOns };
}

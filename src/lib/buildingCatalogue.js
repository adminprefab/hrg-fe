// The HRG Building Collection: eight starting buildings, each with a concept floor plan,
// a building package price and an installed range, laid out like the Pool Collection.
// The user picked all eight from the shortlist (Nov 2026). Prices are never typed here:
// they come from projectPricing.js, so they move with the site's rates.
import { buildProject, deliveryCost, materialsCost } from "./projectPricing";
import { buildPath, getPrefabModel } from "./collectionData";

const round = (n, step) => Math.round(n / step) * step;

// Building package = factory building + delivery. Installed = the site's full budget range
// (drawings, permits, site work and assembly added), as the "Build yours" pages show it.
export function buildingPrice(b) {
  const { range } = buildProject({ sf: b.sf, plumbing: b.plumbing ? "Yes" : "No" });
  return {
    pkg: round(materialsCost(b.sf) + deliveryCost(b.sf), 500),
    low: round(range.low, 1000),
    high: round(range.high, 1000),
  };
}

export const BUILDING_GROUPS = [
  { id: "all", label: "All" },
  { id: "backyard", label: "Backyard rooms" },
  { id: "adu", label: "ADUs" },
  { id: "home", label: "Homes" },
];

// Plans in feet: [x, y, w, h, label]. Concept layouts, not construction drawings.
// `slug` links a building to its HRG model page and "Build yours" configurator.
const rows = [
  { id: "garden-office", name: "Garden Office", group: "backyard", w: 14, d: 12, sf: 168, plumbing: false, rooms_label: "Office",
    use: "A quiet backyard office or studio. No plumbing, so the lowest installed cost.",
    plan: [[0, 0, 10, 12, "Office"], [10, 0, 4, 6, "Storage"], [10, 6, 4, 6, "Entry"]] },
  { id: "studio-cabin", slug: "hrg-101", name: "Studio Cabin", group: "backyard", w: 23, d: 10.83, sf: 258, plumbing: true, rooms_label: "Studio · 1 bath",
    use: "A guest suite or short-term rental for one.",
    plan: [[0, 0, 14, 10.83, "Living / sleep"], [14, 0, 4.5, 10.83, "Kitchen"], [18.5, 0, 4.5, 10.83, "Bath"]] },
  { id: "pool-house", name: "Pool House", group: "backyard", w: 24, d: 12, sf: 288, plumbing: true, rooms_label: "Lounge · 1 bath",
    use: "Lounge, bar and shower bath beside the pool.",
    plan: [[0, 0, 14, 12, "Lounge"], [14, 0, 5, 12, "Bar"], [19, 0, 5, 7, "Shower bath"], [19, 7, 5, 5, "Equipment"]] },
  { id: "casita", name: "Casita", group: "adu", w: 24, d: 16, sf: 384, plumbing: true, rooms_label: "Studio · 1 bath",
    use: "A studio with a full kitchen and bath, for family or a long-term tenant.",
    plan: [[0, 0, 15, 16, "Living / sleep"], [15, 0, 9, 9, "Kitchen"], [15, 9, 9, 7, "Bath"]] },
  { id: "one-bedroom", slug: "hrg-102", name: "One-Bedroom Suite", group: "adu", w: 24.58, d: 18.33, sf: 452, plumbing: true, rooms_label: "1 bed · 1 bath",
    use: "The most common rental ADU: a separate bedroom and a full kitchen.",
    plan: [[0, 0, 14, 18.33, "Living / kitchen"], [14, 0, 10.58, 11, "Bedroom"], [14, 11, 10.58, 7.33, "Bath"]] },
  { id: "linear-two-bedroom", slug: "hrg-103", name: "Linear Two-Bedroom", group: "adu", w: 39.08, d: 15.75, sf: 646, plumbing: true, rooms_label: "2 bed · 1 bath",
    use: "Two bedrooms in a long, narrow plan for side yards and deep lots.",
    plan: [[0, 0, 10.5, 15.75, "Bedroom"], [10.5, 0, 7, 15.75, "Bath"], [17.5, 0, 11.5, 15.75, "Living / kitchen"], [29, 0, 10.08, 15.75, "Bedroom"]] },
  { id: "modern-two-bedroom", slug: "hrg-106", name: "Modern Two-Bedroom", group: "adu", w: 36, d: 23, sf: 829, plumbing: true, rooms_label: "2 bed · 1 bath",
    use: "Two bedrooms and a larger living room, for a small family.",
    plan: [[0, 0, 12, 12, "Bedroom"], [0, 12, 12, 11, "Bedroom"], [12, 0, 8, 9, "Bath"], [12, 9, 8, 14, "Hall / laundry"], [20, 0, 16, 23, "Living / kitchen"]] },
  { id: "three-bedroom", slug: "hrg-108", name: "Three-Bedroom Home", group: "home", w: 43.5, d: 26, sf: 1130, plumbing: true, rooms_label: "3 bed · 1 bath",
    use: "Three bedrooms, under California's 1,200 SF limit for a detached ADU.",
    plan: [[0, 0, 12, 13, "Bedroom"], [0, 13, 12, 13, "Bedroom"], [12, 0, 11, 13, "Bedroom"], [12, 13, 11, 6, "Bath"], [12, 19, 11, 7, "Laundry"], [23, 0, 20.5, 26, "Living / kitchen / dining"]] },
];

export const BUILDINGS = rows.map((b) => {
  const model = b.slug ? getPrefabModel(b.slug) : null;
  return {
    ...b,
    code: model?.id,
    photo: model?.photo,
    modelPath: model ? `/collection/prefab-design-build/${b.slug}` : null,
    buildPath: model ? buildPath(b.slug) : null,
    price: buildingPrice(b),
  };
});

// Feet as 12'-6".
export const feet = (v) => {
  const f = Math.floor(v);
  const i = Math.round((v - f) * 12);
  return i === 12 ? `${f + 1}'` : i ? `${f}'-${i}"` : `${f}'`;
};

export const BUILDING_INCLUDED = [
  "Prefabricated building per plan",
  "Base finishes (upgrade them in Build yours)",
  "Delivery",
];

export const BUILDING_INSTALL = [
  "Drawings and permits",
  "Foundation, utilities and site work",
  "Set, assembly and final connections",
];

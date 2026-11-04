// HRG's experience and project references, from HRG's own "Experience and project
// references" page (claude.ai artifact NiuqbQnxawk6auGUcjAXZK, Nov 2026). Photos are HRG's,
// cleaned up and served from public/references.
// Homeowners are named as on that page; their personal phone numbers are left off the
// public site (HRG shares them on request).

const ref = (name) => `/references/${name}.webp`;

export const BEFORE_AFTER = {
  img: ref("garage-to-adu"),
  alt: "A detached garage before conversion, and the finished ADU after",
  project: "Mulholland Estates Luxury Residence",
  address: "14047 Aubrey Road, Mulholland Estates, CA",
  caption: "Same lot, same footprint. Design, permits, factory and install by one team.",
};

export const STATS = [
  { stat: "19+", label: "Referenced projects" },
  { stat: "50+", label: "Units built" },
  { stat: "5", label: "States: CA, NY, FL, PA, NJ" },
  { stat: "1", label: "Team, drawing to install" },
];

// "People you can call": both have run work for HRG directly.
export const CALL_REFERENCES = [
  { name: "James Barry", role: "Lead contractor, ground-up construction and site work, Los Angeles", phone: "(310) 901-7382" },
  { name: "Michael Tsveitel", role: "Prefab, modular and multifamily development, NY / FL / CA", phone: "(917) 559-5056" },
];

export const ADU_PHOTOS = [
  { img: ref("adu-poolside"), caption: "Poolside ADU with patio and walkway" },
  { img: ref("adu-deck"), caption: "Modern ADU with covered deck and full-width glass" },
  { img: ref("adu-batten"), caption: "Board-and-batten ADU with cedar entry" },
  { img: ref("adu-studio"), caption: "Backyard studio with clerestory windows" },
  { img: ref("adu-office"), caption: "Compact backyard office" },
  { img: ref("adu-on-site"), caption: "Shell and openings complete on site" },
  { img: ref("adu-rear"), caption: "Finished detached unit, rear" },
];

export const LUXURY_PROJECTS = [
  { name: "Mulholland Estates Luxury Residence", place: "14047 Aubrey Road, Mulholland Estates, CA", type: "Ground-up Mediterranean residence", owner: "Sam Leon" },
  { name: "Santa Monica Townhome", place: "639 Pacific Street, Santa Monica, CA", type: "Luxury townhome", owner: "Ilene Woolf" },
  { name: "Beverly Hills Mediterranean Estate", place: "Beverly Hills, CA", type: "Ground-up custom residence", owner: null },
];

export const ESTATE_PHOTOS = [
  { img: ref("estate-front"), caption: "Front elevation and motor court" },
  { img: ref("estate-gate"), caption: "Entry gate and forecourt" },
  { img: ref("estate-pool"), caption: "Pool, spa and colonnade" },
  { img: ref("estate-terrace"), caption: "Rear terrace and outdoor kitchen" },
  { img: ref("estate-lawn"), caption: "Rear lawn and pool" },
  { img: ref("estate-frontage"), caption: "Pedestrian gate and frontage" },
];

// Owned and co-owned assets outside California, held and operated.
export const PORTFOLIO = [
  { state: "New York", area: "Staten Island", items: ["Longview · 2 units", "Medford · 2 units", "Vermont · mixed-use, 3 units", "Lily Pond · 2 units"] },
  { state: "Florida", area: "Delray & Boynton Beach", items: ["Saturnia · single family", "Mirabella · single family"] },
  { state: "Pennsylvania", area: "Poconos", items: ["Edelweiss · commercial, 12 units", "Alpine Lakes 1–4 · 8 units", "Emerald Lakes · 2 units", "Pine Run · 2 units", "Oberon · 2 units", "Country Road · 3 units", "Tranquility · 2 units", "Tumbleweed · 2 units"] },
  { state: "New Jersey", area: "Union & Freehold", items: ["Union · commercial, 6 units", "Freehold · single family"] },
];

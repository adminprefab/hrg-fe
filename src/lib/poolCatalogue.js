// The HRG Pool Collection: modular fiberglass pools with a factory-set mosaic interior.
// Models, rates and the promotion come from Michael Tsveitel's pool catalogue
// (hrgprefab-pools.pplx.app, catalog.js, Nov 2026). Every price on the site is derived
// from POOL_PRICING, so a rate or the promotion changes here and nowhere else.

const img = (name) => `/catalogue/pools/${name}.webp`;

export const POOL_PRICING = {
  basePackage: 6000, // engineering, crating and freight per pool
  ratePerSF: 95, // per SF of water surface: modular shell + factory-set mosaic interior
  roundTo: 500,
  moduleLength: 8, // ft per modular section
  install: { base: 8000, lowPerSF: 55, highPerSF: 80 }, // excavation, set, plumbing, coping, deck tie-in
  // Applied to every pool package while active; it switches itself off after `ends`.
  promo: {
    name: "Winter Promotion",
    percentOff: 22,
    ends: "2026-12-15T23:59:59-05:00",
    endsLabel: "December 15",
    terms: "Delivered to the nearest port",
  },
  // Custom sizes: same formula plus a one-time engineering and tooling fee.
  custom: { engineeringFee: 2500, minW: 8, maxW: 20, minL: 12, maxL: 60 },
};

export const promoActive = (now = Date.now()) => now <= new Date(POOL_PRICING.promo.ends).getTime();

const round = (n, step) => Math.round(n / step) * step;

// Package, list (before the promotion) and estimated installed range for one size.
export function poolPrice(model, [w, l], now = Date.now()) {
  const P = POOL_PRICING;
  const sf = Math.round(w * l);
  const list = round((P.basePackage + sf * P.ratePerSF) * model.factor, P.roundTo);
  const promo = promoActive(now);
  const pkg = promo ? round(list * (1 - P.promo.percentOff / 100), 100) : list;
  const low = round(pkg + P.install.base + sf * P.install.lowPerSF, 1000);
  const high = round(pkg + P.install.base + sf * P.install.highPerSF, 1000);
  return { sf, list, pkg, promo, low, high, modules: Math.max(1, Math.ceil(l / P.moduleLength)) };
}

// A custom size priced on the closest model, plus the engineering fee.
export function customPoolPrice(model, w, l, now = Date.now()) {
  const C = POOL_PRICING.custom;
  if (!(w >= C.minW && w <= C.maxW && l >= C.minL && l <= C.maxL && l >= w)) return null;
  const p = poolPrice(model, [w, l], now);
  const add = C.engineeringFee;
  const pkg = p.pkg + add;
  return {
    ...p,
    pkg,
    list: p.list + add,
    low: round(pkg + POOL_PRICING.install.base + p.sf * POOL_PRICING.install.lowPerSF, 1000),
    high: round(pkg + POOL_PRICING.install.base + p.sf * POOL_PRICING.install.highPerSF, 1000),
  };
}

export const POOL_COLLECTIONS = [
  { id: "all", label: "All" },
  { id: "geometric", label: "Geometric" },
  { id: "resort", label: "Resort" },
  { id: "compact", label: "Compact & plunge" },
  { id: "estate", label: "Lap & estate" },
];

export const POOL_MODELS = [
  { id: "linea", name: "Linea", collection: "geometric", factor: 1.0, depth: "3'6\" – 6'", avgDepth: 4.75, photo: img("pool-linea"),
    blurb: "Clean rectangle with full-width entry steps and a deep-end bench.", sizes: [[12, 24], [14, 28], [16, 32]] },
  { id: "riviera", name: "Riviera", collection: "geometric", factor: 1.08, depth: "1' ledge · 3'6\" – 6'", avgDepth: 4.4, photo: img("pool-riviera"),
    blurb: "Rectangle with a tanning ledge for in-water loungers.", sizes: [[12, 24], [14, 28], [16, 32]] },
  { id: "monaco", name: "Monaco", collection: "geometric", factor: 1.1, depth: "3'6\" – 5'6\"", avgDepth: 4.5, photo: img("pool-monaco"),
    blurb: "Roman-end entry and a perimeter bench, for formal gardens.", sizes: [[12, 24], [14, 28], [16, 32]] },
  { id: "sorrento", name: "Sorrento", collection: "geometric", factor: 1.04, depth: "3'6\" – 6'", avgDepth: 4.75, photo: img("pool-sorrento"),
    blurb: "Corner steps that keep the full width open for swimming.", sizes: [[12, 24], [14, 28], [16, 32]] },
  { id: "capri", name: "Capri", collection: "resort", factor: 1.3, depth: "3'6\" – 5'6\" · spa 3'", avgDepth: 4.5, photo: img("real-capri"), installed: true,
    blurb: "Pool and 8-jet spa in one modular shell, with a spillover edge.", sizes: [[12, 24], [14, 28], [16, 32]] },
  { id: "portofino", name: "Portofino", collection: "resort", factor: 1.35, depth: "4' – 5'6\"", avgDepth: 4.75, photo: img("pool-portofino"),
    blurb: "Vanishing edge with catch basin, for views and sloped lots.", sizes: [[12, 24], [14, 28], [16, 32]] },
  { id: "amalfi", name: "Amalfi", collection: "resort", factor: 1.15, depth: "3'6\" – 5'6\"", avgDepth: 4.5, photo: img("real-amalfi"), installed: true,
    blurb: "Freeform lagoon curves with a beach-entry shelf.", sizes: [[12, 24], [14, 28], [16, 32]] },
  { id: "lido", name: "Lido", collection: "resort", factor: 1.18, depth: "3'6\" – 6'", avgDepth: 4.75, photo: img("pool-lido"),
    blurb: "L-shaped layout that separates lounging from laps.", sizes: [[12, 24], [14, 28], [16, 32]] },
  { id: "bellagio", name: "Bellagio", collection: "resort", factor: 1.12, depth: "3'6\" – 6'", avgDepth: 4.75, photo: img("pool-bellagio"),
    blurb: "Grecian cut corners, a centered step entry and bench alcoves.", sizes: [[12, 24], [14, 28], [16, 32]] },
  { id: "cove", name: "Cove", collection: "compact", factor: 1.1, depth: "4' – 5'", avgDepth: 4.5, photo: img("pool-cove"),
    blurb: "Plunge pool for small yards, courtyards and rooftops.", sizes: [[8, 12], [8, 16], [10, 20]] },
  { id: "studio", name: "Studio", collection: "compact", factor: 1.15, depth: "4' – 4'6\"", avgDepth: 4.25, photo: img("pool-studio"),
    blurb: "Cocktail pool with a wrap-around bench for sitting and socializing.", sizes: [[8, 12], [8, 16], [10, 20]] },
  { id: "terrazza", name: "Terrazza", collection: "compact", factor: 1.3, depth: "4' – 4'6\"", avgDepth: 4.25, photo: img("pool-terrazza"),
    blurb: "Spa-plunge with a jet bench: a pool in summer, a spa all year.", sizes: [[8, 12], [8, 16], [10, 20]] },
  { id: "courtyard", name: "Courtyard", collection: "compact", factor: 1.08, depth: "1' ledge · 3'6\" – 5'", avgDepth: 4.0, photo: img("pool-courtyard"),
    blurb: "Small-lot rectangle with a sun shelf at the entry end.", sizes: [[10, 16], [12, 20], [12, 24]] },
  { id: "corsa", name: "Corsa", collection: "estate", factor: 1.0, depth: "4' – 5'", avgDepth: 4.5, photo: img("pool-corsa"),
    blurb: "Long, narrow lap pool sized for side yards.", sizes: [[8, 40], [10, 45], [10, 50]] },
  { id: "atlantico", name: "Atlantico", collection: "estate", factor: 1.05, depth: "4' – 4'6\" sport floor", avgDepth: 4.25, photo: img("pool-atlantico"),
    blurb: "Flat, family-friendly sport floor for volleyball and play.", sizes: [[14, 28], [16, 32], [16, 36]] },
  { id: "palazzo", name: "Palazzo", collection: "estate", factor: 1.2, depth: "1' shelves · 4' – 6'6\"", avgDepth: 4.9, photo: img("pool-palazzo"),
    blurb: "Estate pool with sun shelves at both ends and a long swim lane.", sizes: [[16, 32], [16, 36], [18, 40]] },
];

export const POOL_STEPS = [
  { title: "Choose a model and size", text: "16 layouts, each in its three most common sizes." },
  { title: "Factory build", text: "Sections are molded, reinforced and tiled in mosaic before they ship." },
  { title: "Deliver and set", text: "8 ft modules arrive on standard trucks and are craned onto a leveled gravel base." },
  { title: "Join, seal, swim", text: "Flanged joints are bolted, sealed and laminated; plumbing, coping and deck tie in." },
];

export const POOL_INCLUDED = [
  "Engineered modular fiberglass sections",
  "Full glass mosaic tile interior",
  "Molded steps, benches, ledges and spa features per model",
  "Joint hardware, sealing and lamination kit",
  "Crating and delivery",
];

export const POOL_INSTALL = [
  "Excavation, gravel base and crane set",
  "On-site joining, sealing and lamination",
  "Plumbing, filtration and pump equipment",
  "Coping and deck tie-in",
];

// Construction standard shared by every model; confirmed per model on shop drawings at order.
export const POOL_SPECS = [
  ["Shell", "Fiberglass-reinforced plastic, minimum 1/4\" (6.35 mm) laminate"],
  ["Barrier coat", "Vinyl ester resin layer against water permeation and blistering"],
  ["Surface", "30 mil marine-grade gelcoat under a factory-set glass mosaic interior"],
  ["Modules", "8 ft sections with molded flanges, bolted, sealed and laminated on site"],
  ["Pool type", "Residential inground, designed to ANSI/APSP/ICC-5; not for diving boards"],
  ["Base", "Compacted stone or sand bed on undisturbed soil, level within 1 inch"],
  ["Engineering", "Standard sizes are engineered in the package; plans are signed and sealed for your permit"],
  ["Site extras", "Soil reports, flood-zone design, permits, fencing, heaters and decking are quoted after review"],
];

export const MOSAIC_FINISHES = [
  { name: "Azure Glass", colors: ["#0b3c6b", "#1458a0", "#2a7cc7", "#5aa6e0"] },
  { name: "Caribbean", colors: ["#0f7f8c", "#1aa3a8", "#3cc3c0", "#7ddbd3"] },
  { name: "Pearl", colors: ["#e9ecef", "#d5dbe0", "#c3ccd3", "#b4bec7"] },
  { name: "Onyx", colors: ["#14181c", "#232a31", "#36404a", "#4b5763"] },
  { name: "Sea Glass", colors: ["#4f8f86", "#6fae9f", "#8cc6b4", "#3d7a73"] },
  { name: "Sandstone", colors: ["#d9c7a6", "#c8b28a", "#e8dcc4", "#b89e74"] },
];

export const POOL_INSTALLED = [
  { img: img("real-capri"), caption: "Rectangle pool with raised spa" },
  { img: img("real-deck"), caption: "Freeform pool, deck in progress" },
  { img: img("real-amalfi"), caption: "Freeform pool, full glass mosaic" },
  { img: img("install-set"), caption: "Mosaic-finished shell going in" },
];

export const POOL_VIDEO = { src: "/catalogue/pools/real-spa.mp4", poster: img("real-spa-poster") };
export const POOL_HERO = img("hero");
export const POOL_MOSAIC = img("mosaic");

// The approved ad campaign (Nov 2026, "HRG Approved Campaign" Drive folder): the B videos,
// with package price and installed total, female narrator. Ads send people to /pools, so
// the page shows the same three pools at the advertised sizes. Prices stay live from
// poolPrice; the ads were cut at these same numbers.
const ad = (name) => `/catalogue/pools/ads/${name}`;
export const POOL_ADS = [
  { model: "cove", size: [8, 16], headline: "Small yard. Big possibilities.", video: ad("cove.mp4"), poster: ad("cove-poster.webp") },
  { model: "riviera", size: [14, 28], headline: "Keep the vision. Know the cost.", video: ad("riviera.mp4"), poster: ad("riviera-poster.webp"), note: "Loungers and water feature shown for styling." },
  { model: "sorrento", size: [14, 28], headline: "More than a pool. Plan the whole project.", video: ad("sorrento.mp4"), poster: ad("sorrento-poster.webp") },
];

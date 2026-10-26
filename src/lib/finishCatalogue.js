// The HRG Prefab finishes catalogue: what a homeowner can choose, grouped the way the
// Finishes step shows it. Prices and the pricing rules live in finishPricing.js.
//
// SAMPLE CONTENT: names, descriptions and details are generic material types written for
// the prototype, not supplier products. HRG replaces them with the real catalogue.
// Photos: HRG's own (hrg() below: shot at supplier showrooms in Oct 2026, cleaned up and
// served from public/catalogue/finishes) where HRG has one; otherwise Unsplash (free
// license), hotlinked from images.unsplash.com. `credit` captions HRG's room photos.
//
// Each category has one or more slots; a slot is one choice (Exterior has siding, roof
// and windows). In each slot the option marked `included` is the standard finish already
// in the base price. `perSf` / `flat` with `verified: true` are prices HRG has approved
// and the only ones the page shows and adds to the budget; an option without it shows
// "Pricing to be confirmed".

const photo = (id, w = 640, h = 480) => `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=70`;
const room = (id) => photo(id, 1200, 800);
const hrg = (name) => `/catalogue/finishes/${name}.webp`;
const SHOWROOM = "HRG photo, supplier showroom";

// `needs` hides a category when the project has no kitchen or no plumbing (see
// relevantCategories in finishPricing.js).
export const FINISH_CATEGORIES = [
  {
    key: "flooring",
    label: "Flooring",
    intro: "One floor throughout keeps a small home feeling open.",
    slots: [
      {
        key: "flooring",
        label: "Flooring",
        leadField: "interior_level",
        options: [
          {
            key: "lvp", name: "Wood-look vinyl plank", included: true, lead: "Essential",
            desc: "The look of wood in a plank that wipes clean.",
            img: photo("photo-1628229896022-b7dd8720eafe"), room: room("photo-1600566752355-35792bedcfea"),
            details: { Look: "Matte wood grain, long planks", Care: "Sweep and damp mop", "Where it goes": "Every room, including kitchen and bath" },
          },
          {
            // approved by HRG 2026-10-22; drafted from: interior finishes $18/SF × 0.25 Mid factor ≈ $4.50 (Master Cost Calculator)
            key: "oak", name: "Engineered oak", perSf: 4.5, verified: true, lead: "Premium",
            desc: "Real oak on top, warm underfoot.",
            img: photo("photo-1584622781564-1d987f7333c1"), room: room("photo-1649083048381-520a5b3d91ff"),
            details: { Look: "Natural oak, light to mid tone", Care: "Sweep, damp mop, felt pads under furniture", "Where it goes": "Living areas and bedrooms" },
          },
          {
            // approved by HRG 2026-10-22; drafted from: interior finishes $18/SF × 0.60 Luxury factor ≈ $10.80
            key: "stone", name: "Large porcelain tile", perSf: 11, verified: true, lead: "Luxury",
            desc: "Big, calm tiles with very few grout lines.",
            img: photo("photo-1786933638319-10ebbb5b8661"), room: hrg("living-porcelain-room"), credit: SHOWROOM,
            details: { Look: "Soft stone look, large format", Care: "Sweep and mop; seal grout as advised", "Where it goes": "Whole home or kitchen and bath only" },
          },
        ],
      },
    ],
  },
  {
    key: "cabinets",
    label: "Cabinets",
    needs: "kitchen",
    intro: "The biggest surface in your kitchen sets its mood.",
    slots: [
      {
        key: "cabinets",
        label: "Cabinets",
        leadField: "kitchen",
        options: [
          {
            key: "white", name: "White shaker", included: true, lead: "Classic",
            desc: "A simple framed door that suits almost any style.",
            img: photo("photo-1579725942955-4d8377f8c66a"), room: room("photo-1601760561441-16420502c7e0"),
            details: { Look: "Painted white, recessed panel door", Care: "Wipe with a soft damp cloth", "Where it goes": "Kitchen and bath vanity" },
          },
          {
            key: "wood", name: "Light wood flat panel", lead: "Designer",
            desc: "Clean slab doors with a warm wood grain.",
            img: photo("photo-1721743170649-dcdcdc889b1a"), room: room("photo-1771888703722-ee7ad9143a67"),
            details: { Look: "Light wood grain, flat slab door", Care: "Wipe with a soft damp cloth", "Where it goes": "Kitchen and bath vanity" },
          },
          {
            key: "green", name: "Sage green shaker", lead: "Designer",
            desc: "A soft color that pairs well with wood and brass.",
            img: photo("photo-1748551204316-3b1106b827f3"), room: room("photo-1652918320939-47f66eb1b684"),
            details: { Look: "Painted muted green, recessed panel door", Care: "Wipe with a soft damp cloth", "Where it goes": "Kitchen, or vanity only" },
          },
        ],
      },
    ],
  },
  {
    key: "countertops",
    label: "Countertops",
    needs: "kitchen",
    intro: "Where you cook, eat and set things down every day.",
    slots: [
      {
        key: "counters",
        label: "Countertops",
        options: [
          {
            key: "laminate", name: "White laminate", included: true,
            desc: "A bright, simple surface that keeps costs down.",
            img: photo("photo-1635108195612-1ba1c88aaf0c"), room: room("photo-1560185127-1902ccdc5094"),
            details: { Look: "Solid white, square edge", Care: "Use a cutting board and trivets", "Where it goes": "Kitchen and vanity" },
          },
          {
            key: "quartz", name: "White quartz",
            desc: "Light stone look with soft veining.",
            img: photo("photo-1771795638652-01821921a461"), room: room("photo-1751591148854-49c2835dfaa1"),
            details: { Look: "White with light gray veining", Care: "Mild soap and water; use trivets", "Where it goes": "Kitchen and vanity" },
          },
          {
            key: "butcher", name: "Butcher block",
            desc: "Warm wood that softens a white kitchen.",
            img: photo("photo-1786462543690-71b19c0d5321"), room: room("photo-1774427753780-e74b63344864"),
            details: { Look: "Oiled wood strips", Care: "Re-oil from time to time; wipe spills", "Where it goes": "Kitchen counters or island" },
          },
          {
            key: "granite", name: "Dark granite",
            desc: "Deep black stone with silver flecks.",
            img: hrg("counter-granite"), room: hrg("counter-granite-room"), credit: SHOWROOM,
            details: { Look: "Polished black with silver and gold flecks", Care: "Mild soap and water; reseal as advised", "Where it goes": "Kitchen counters and vanity" },
          },
        ],
      },
    ],
  },
  {
    key: "tile",
    label: "Bathroom tile",
    needs: "plumbing",
    intro: "Shower walls and bath floor.",
    slots: [
      {
        key: "tile",
        label: "Bathroom tile",
        options: [
          {
            key: "subway", name: "White subway tile", included: true,
            desc: "A classic that keeps a small bath bright.",
            img: photo("photo-1792628952805-fec5a7d987cc"), room: room("photo-1792628952115-8f8caf6985ac"),
            details: { Look: "Glossy white, 3 × 6 brick pattern", Care: "Wipe down; clean grout now and then", "Where it goes": "Shower walls" },
          },
          {
            key: "large", name: "Large marble-look tile",
            desc: "Big marble-look panels, very few grout lines.",
            img: hrg("tile-large"), room: hrg("bath-vanity-room"), credit: SHOWROOM,
            details: { Look: "White marble look with gray veining, large format", Care: "Wipe down; fewer grout lines to clean", "Where it goes": "Shower walls and floor" },
          },
          {
            key: "green", name: "Green patterned tile",
            desc: "A bit of color for a bath with personality.",
            img: photo("photo-1778423618443-6a9c410a98ec"), room: room("photo-1778423618443-6a9c410a98ec"),
            details: { Look: "Green and white pattern", Care: "Wipe down; clean grout now and then", "Where it goes": "Shower wall or bath floor" },
          },
        ],
      },
    ],
  },
  {
    key: "fixtures",
    label: "Fixtures and hardware",
    needs: "plumbing",
    intro: "Faucets, shower trim and cabinet pulls in one finish.",
    slots: [
      {
        key: "fixtures",
        label: "Fixtures and hardware",
        options: [
          {
            key: "steel", name: "Brushed steel", included: true,
            desc: "Quiet and easy to match.",
            img: photo("photo-1587093430416-0dc23a0c62c1"), room: room("photo-1586798271453-3b60b56cbba8"),
            details: { Look: "Soft silver, brushed", Care: "Wipe dry after use", "Where it goes": "Kitchen, bath and cabinet pulls" },
          },
          {
            key: "black", name: "Matte black",
            desc: "Crisp contrast against white tile and counters.",
            img: photo("photo-1572379925826-782287f27f65"), room: room("photo-1787539386359-94223e59f1d8"),
            details: { Look: "Flat black", Care: "Wipe with a soft cloth; avoid abrasives", "Where it goes": "Kitchen, bath and cabinet pulls" },
          },
          {
            key: "brass", name: "Brushed brass",
            desc: "A warm accent that works with wood and green.",
            img: hrg("fixture-brass"), room: hrg("tile-large-room"), credit: SHOWROOM,
            details: { Look: "Warm gold tone, brushed", Care: "Wipe with a soft cloth; avoid abrasives", "Where it goes": "Kitchen, bath and cabinet pulls" },
          },
        ],
      },
    ],
  },
  {
    key: "paint",
    label: "Interior paint",
    intro: "One wall color throughout, trim in white.",
    slots: [
      {
        key: "paint",
        label: "Interior paint",
        options: [
          {
            key: "white", name: "Soft white", included: true,
            desc: "Bright and clean; lets your furniture lead.",
            img: photo("photo-1788396408394-b8e46d19272c"), room: room("photo-1788396408394-b8e46d19272c"),
            details: { Look: "Warm white walls", Care: "Wipe marks with a damp cloth", "Where it goes": "All walls" },
          },
          {
            key: "greige", name: "Warm greige",
            desc: "A cozy neutral between gray and beige.",
            img: photo("photo-1790066666522-17beb0c21035"), room: room("photo-1785402231092-859d0a6c4397"),
            details: { Look: "Soft beige-gray walls", Care: "Wipe marks with a damp cloth", "Where it goes": "All walls" },
          },
          {
            key: "sage", name: "Muted sage",
            desc: "A calm green that brings the garden in.",
            img: photo("photo-1767467961045-60e4294e0c7f"), room: room("photo-1768209198274-01dd8d79cd1e"),
            details: { Look: "Gray-green walls", Care: "Wipe marks with a damp cloth", "Where it goes": "All walls or one room" },
          },
        ],
      },
    ],
  },
  {
    key: "exterior",
    label: "Exterior finishes",
    intro: "Siding, roof and windows: how your home looks from the yard.",
    slots: [
      {
        key: "exterior",
        label: "Siding",
        leadField: "exterior_package",
        options: [
          {
            key: "lap", name: "Fiber-cement lap", included: true, lead: "Standard",
            desc: "Classic horizontal boards, painted your color.",
            img: photo("photo-1560990469-8addd0eb06fc"), room: room("photo-1608754193749-0db6b8e828a8"),
            details: { Look: "Horizontal painted boards", Care: "Rinse yearly; repaint as needed", "Where it goes": "All exterior walls" },
          },
          {
            // approved by HRG 2026-10-22; drafted from: share of the $79→$99 grade gap ($20/SF) for the envelope
            key: "batten", name: "Board and batten", perSf: 4, verified: true, lead: "Impact",
            desc: "Tall vertical lines, farmhouse to modern.",
            img: photo("photo-1770756051811-1612ac8bedfa"), room: room("photo-1770756051811-1612ac8bedfa"),
            details: { Look: "Vertical boards with narrow strips", Care: "Rinse yearly; repaint as needed", "Where it goes": "All walls or one accent wall" },
          },
          {
            // approved by HRG 2026-10-22; drafted from: share of the $79→$129 grade gap ($50/SF) for the envelope
            key: "cedar", name: "Cedar and metal", perSf: 10, verified: true, lead: "Architectural",
            desc: "Natural wood paired with dark metal panels.",
            img: photo("photo-1596830762262-7b5e55dd821c"), room: room("photo-1602193458517-db6caca8f1fe"),
            details: { Look: "Stained cedar with dark metal", Care: "Re-stain wood every few years", "Where it goes": "Mix of walls" },
          },
        ],
      },
      {
        key: "roof",
        label: "Roof",
        options: [
          {
            key: "shingle", name: "Architectural shingle", included: true,
            desc: "Dimensional shingles in a dark neutral.",
            img: photo("photo-1598885835780-bf5a4d21c017"), room: room("photo-1598885835780-bf5a4d21c017"),
            details: { Look: "Layered shingles, charcoal", Care: "Check after big storms", "Where it goes": "Pitched roofs" },
          },
          {
            // approved by HRG 2026-10-22; drafted from: share of the $20/SF Mid grade gap
            key: "metal", name: "Standing-seam metal", perSf: 2.5, verified: true,
            desc: "Clean vertical seams with a modern edge.",
            img: photo("photo-1602193458517-db6caca8f1fe"), room: hrg("roof-metal-aframe-room"), credit: SHOWROOM,
            details: { Look: "Smooth panels with raised seams", Care: "Clear leaves from valleys", "Where it goes": "Pitched or low-slope roofs" },
          },
          {
            // approved by HRG 2026-10-22; drafted from: share of the $50/SF Luxury grade gap
            key: "tile", name: "Concrete tile", perSf: 6, verified: true,
            desc: "Curved terracotta-color tile, Spanish style.",
            img: photo("photo-1605450099279-533bd3ce379a"), room: room("photo-1528223871781-8f4c984f6164"),
            details: { Look: "Curved tile, terracotta color", Care: "Replace any cracked tiles", "Where it goes": "Pitched roofs" },
          },
        ],
      },
      {
        key: "windows",
        label: "Windows and doors",
        options: [
          {
            key: "vinyl", name: "White vinyl frames", included: true,
            desc: "Dual-pane windows in crisp white frames.",
            img: photo("photo-1600210492486-724fe5c67fb0"), room: room("photo-1600210492486-724fe5c67fb0"),
            details: { Look: "White frames", Care: "Wipe frames; clean tracks", "Where it goes": "All windows and doors" },
          },
          {
            // approved by HRG 2026-10-22; drafted from: share of the $20/SF Mid grade gap
            key: "black", name: "Black aluminum frames", perSf: 3, verified: true,
            desc: "Slim dark frames that outline the view.",
            img: hrg("window-black"), room: hrg("window-black-room"), credit: SHOWROOM,
            video: "/catalogue/finishes/window-black-demo.mp4", videoPoster: hrg("window-black-demo"),
            details: { Look: "Slim black frames", Care: "Wipe frames; clean tracks", "Where it goes": "All windows and doors" },
          },
          {
            // approved by HRG 2026-10-22; drafted from: share of the $50/SF Luxury grade gap
            key: "glasswall", name: "Sliding glass wall", perSf: 8, verified: true,
            desc: "Opens the living room to the yard.",
            img: photo("photo-1600566753190-17f0baa2a6c3"), room: room("photo-1600566753190-17f0baa2a6c3"),
            details: { Look: "Large sliding panels", Care: "Keep the track clear", "Where it goes": "Living room wall" },
          },
        ],
      },
    ],
  },
];

// Optional extras, shown after the finishes, priced per home.
export const ADD_ONS = [
  // approved by HRG 2026-10-22; drafted from: ~4 kW system at the national installed average of about $3.25/W
  { key: "solar", name: "Solar panels", flat: 13000, verified: true, lead: "Solar", desc: "Rooftop panels sized for a small home.", img: photo("photo-1509391366360-2e959784a276") },
  // approved by HRG 2026-10-22; drafted from: two-zone ductless heat pump, national installed average
  { key: "minisplit", name: "Mini-split heat and AC", flat: 7500, verified: true, desc: "Wall units that heat and cool each zone.", img: photo("photo-1762341123870-d706f257a12e") },
  // approved by HRG 2026-10-22; drafted from: locks, thermostat, lighting and doorbell package
  { key: "smart", name: "Smart home", flat: 4500, verified: true, lead: "Smart Home", desc: "Smart lock, thermostat, lights and doorbell.", img: photo("photo-1558002038-1055907df827") },
  // approved by HRG 2026-10-22; drafted from: Master Cost Calculator deck rate $45/SF × 200 SF
  { key: "deck", name: "Deck, about 200 sq ft", flat: 9000, verified: true, lead: "Outdoor Living", desc: "Outdoor space right off the living room.", img: photo("photo-1613544723371-23b514a78c85") },
  // approved by HRG 2026-10-22; drafted from: Master Cost Calculator "Landscaping — Basic"
  { key: "landscape", name: "Landscaping", flat: 6000, verified: true, lead: "Landscape", desc: "Planting and paths around the new home.", img: photo("photo-1558904541-efa843a96f01") },
];

// "Start with a coordinated look": a choice for every slot. Homeowners can change any of it.
export const COORDINATED_LOOKS = [
  {
    key: "warm", name: "Warm Natural",
    desc: "Oak, warm wood and brass.",
    img: hrg("tub-stone"),
    picks: { flooring: "oak", cabinets: "wood", counters: "butcher", tile: "large", fixtures: "brass", paint: "greige", exterior: "cedar", roof: "metal", windows: "black" },
  },
  {
    key: "contemporary", name: "Clean Contemporary",
    desc: "White, quartz and black accents.",
    img: hrg("tile-large-room"),
    picks: { flooring: "stone", cabinets: "white", counters: "quartz", tile: "large", fixtures: "black", paint: "white", exterior: "batten", roof: "metal", windows: "black" },
  },
  {
    key: "classic", name: "Classic Neutral",
    desc: "The standard finishes, nicely put together.",
    img: photo("photo-1601760561441-16420502c7e0", 640, 420),
    picks: { flooring: "lvp", cabinets: "white", counters: "laminate", tile: "subway", fixtures: "steel", paint: "white", exterior: "lap", roof: "shingle", windows: "vinyl" },
  },
];

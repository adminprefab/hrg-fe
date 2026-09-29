// The two proven HRG prototypes. All specs come directly from the uploaded
// architectural concept sheets (Carlsbad ADU — 500 SF, Encinitas ADU — 800 SF).
export const PROTOTYPES = [
  {
    id: "500",
    name: "500 SF Prototype",
    tagline: "1 Bed · 1 Bath",
    sqft: "500 sq ft",
    footprint: "28'6\" × 18'4\"",
    dims: `28'-6" × 18'-4"`,
    dimsMetric: "(8.7 m × 5.6 m)",
    areaMetric: "(46 m²)",
    beds: "1 Bedroom",
    baths: "1 Bathroom",
    image: "https://media.base44.com/images/public/6aa6b441ec9ba0e9a14504fa/79d69cf51_ChatGPTImageSep15202611_38_06PM.png",
    bestFor:
      "Smaller property or a simpler project: a guest suite, home office or rental that fits a compact lot.",
    included: [
      "Open living / dining / kitchen (20' × 13') with 30\" range, 32\" refrigerator and dishwasher",
      "Pantry shelving and dedicated storage",
      "Bedroom (12' × 12') sized for a king-size bed, with 8' × 5' closet",
      "Full bathroom with 54\" vanity",
    ],
    rooms: [
      { room: "Living / Dining / Kitchen", dim: "20' × 13'", sqft: "260" },
      { room: "Bedroom", dim: "12' × 12'", sqft: "144" },
      { room: "Bathroom", dim: "8' × 7'", sqft: "56" },
      { room: "Closet", dim: "8' × 5'", sqft: "40" },
    ],
  },
  {
    id: "800",
    name: "800 SF Prototype",
    tagline: "2 Bed · 1 Bath",
    sqft: "800 sq ft",
    footprint: "28'6\" × 28'4\"",
    dims: `28'-6" × 28'-4"`,
    dimsMetric: "(8.7 m × 8.6 m)",
    areaMetric: "(74 m²)",
    beds: "2 Bedrooms",
    baths: "1 Bathroom",
    image: "https://media.base44.com/images/public/6aa6b441ec9ba0e9a14504fa/9c606ef6f_ChatGPTImageSep15202611_38_00PM.png",
    bestFor:
      "More living space: full-time living, multigenerational family or a high-demand two-bedroom rental.",
    included: [
      "Open-concept living / dining / kitchen (32' × 12') with 5' island, 30\" range, 32\" refrigerator and dishwasher",
      "Two bedrooms (12' × 13'), each sized for a king-size bed",
      "Oversized 10' × 6' closets in both bedrooms",
      "Bathroom with tub / shower and vanity",
    ],
    rooms: [
      { room: "Living / Dining / Kitchen", dim: "32' × 12'", sqft: "384" },
      { room: "Bedroom 1", dim: "12' × 13'", sqft: "156" },
      { room: "Bedroom 2", dim: "12' × 13'", sqft: "156" },
      { room: "Closets (2)", dim: "10' × 6'", sqft: "120" },
    ],
  },
];
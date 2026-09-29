// Central registry for the Builds / Collection section.
// All models, prices, dimensions and images reuse existing HRG catalogue data.

const DECK = "https://media.base44.com/images/public/6a3d99160f311f943d2b9488";
const img = (file) => `${DECK}/${file}`;

const PRODUCTPHOTOS = "https://media.base44.com/images/public/6aa6b441ec9ba0e9a14504fa";
const photo = (file) => `${PRODUCTPHOTOS}/${file}`;

/* ---------------------------- Prefab Design & Build ---------------------------- */

export const prefabModels = [
  { slug: "hrg-101", id: "HRG-101", name: "Studio Cabin", beds: 1, baths: 1, sqft: "258 ft²", sqftMetric: "24 m²", dim: "10'-10\" × 23'-0\"", dimMetric: "3.3 m × 7.0 m", img: img("2d1d9dc3d_HRGPREFABLab-04.png"), photo: photo("5efe4f57e_ChatGPTImageSep29202603_53_17PM1.png") },
  { slug: "hrg-102", id: "HRG-102", name: "Single-Bedroom Suite", beds: 1, baths: 1, sqft: "452 ft²", sqftMetric: "42 m²", dim: "18'-4\" × 24'-7\"", dimMetric: "5.6 m × 7.5 m", img: img("fd865dcd4_HRGPREFABLab-05.png") },
  { slug: "hrg-103", id: "HRG-103", name: "Linear Two-Bedroom", beds: 2, baths: 1, sqft: "646 ft²", sqftMetric: "60 m²", dim: "15'-9\" × 39'-1\"", dimMetric: "4.8 m × 11.9 m", img: img("8a0a7c4f2_HRGPREFABLab-06.png"), photo: photo("26751b3ff_ChatGPTImageSep29202603_53_18PM1.png") },
  { slug: "hrg-104", id: "HRG-104", name: "Compact Two-Bedroom", beds: 2, baths: 1, sqft: "592 ft²", sqftMetric: "55 m²", dim: null, dimMetric: null, img: img("c7f1a7aff_HRGPREFABLab-07.png"), photo: photo("9a3d18dab_ChatGPTImageSep29202605_40_26PM1.png") },
  { slug: "hrg-106", id: "HRG-106", name: "Modern Two-Bedroom", beds: 2, baths: 1, sqft: "829 ft²", sqftMetric: "77 m²", dim: "29'-4\" × 35'-9\"", dimMetric: "8.9 m × 10.9 m", img: img("e59984e29_HRGPREFABLab-08.png"), photo: photo("f0c372083_ChatGPTImageSep29202603_53_21PM1.png") },
  { slug: "hrg-107", id: "HRG-107", name: "Two-Bedroom + Dining", beds: 2, baths: 1, sqft: "1,076 ft²", sqftMetric: "100 m²", dim: "37'-9\"", dimMetric: "11.5 m", img: img("5767f99d9_HRGPREFABLab-09.png") },
  { slug: "hrg-108", id: "HRG-108", name: "Three-Bedroom + Carport", beds: 3, baths: 1, sqft: "1,130 ft²", sqftMetric: "105 m²", dim: "22'-4\"", dimMetric: "6.8 m", img: img("8f1ba1b5b_HRGPREFABLab-10.png") },
  { slug: "hrg-109", id: "HRG-109", name: "Hip-Roof Three-Bedroom", beds: 3, baths: 1, sqft: "1,292 ft²", sqftMetric: "120 m²", dim: "30'-10\" × 36'-10\"", dimMetric: "9.4 m × 11.2 m", img: img("8b9869bef_HRGPREFABLab-11.png") },
  { slug: "hrg-110", id: "HRG-110", name: "Four-Bedroom Family", beds: 4, baths: 2, sqft: "1,378 ft²", sqftMetric: "128 m²", dim: null, dimMetric: null, img: img("92d806ae1_HRGPREFABLab-12.png"), photo: photo("e2663e3f5_ChatGPTImageSep29202603_53_25PM1.png") },
  { slug: "hrg-111", id: "HRG-111", name: "Three-Bedroom + Pool", beds: 3, baths: 2, sqft: "1,432 ft²", sqftMetric: "133 m²", dim: "46'-3\"", dimMetric: "14.1 m", img: img("3dc32ac97_HRGPREFABLab-13.png"), photo: photo("90b775055_ChatGPTImageSep29202603_53_23PM1.png") },
  { slug: "hrg-112", id: "HRG-112", name: "Modern Pool Villa", beds: 3, baths: 2, sqft: "1,475 ft²", sqftMetric: "137 m²", dim: "60'-4\"", dimMetric: "18.4 m", img: img("de1a22739_HRGPREFABLab-14.png") },
  { slug: "hrg-113", id: "HRG-113", name: "Four-Bedroom Linear Villa", beds: 4, baths: 2, sqft: "2,007 ft²", sqftMetric: "186.5 m²", dim: "97'-0\"", dimMetric: "29.6 m", img: img("cdffdcf6a_HRGPREFABLab-15.png") },
  { slug: "hrg-114", id: "HRG-114", name: "Stone-Clad Three-Bedroom", beds: 3, baths: 3, sqft: "2,422 ft²", sqftMetric: "225 m²", dim: "43'-2\"", dimMetric: "13.2 m", img: img("9d19bf47f_HRGPREFABLab-16.png") },
  { slug: "hrg-115", id: "HRG-115", name: "Three-Bedroom Estate", beds: 3, baths: 3, sqft: "2,885 ft²", sqftMetric: "268 m²", dim: null, dimMetric: null, img: img("362b49e77_HRGPREFABLab-17.png") },
  { slug: "hrg-201", id: "HRG-201", name: "Two-Story Three-Bedroom", beds: 3, baths: 1, sqft: "915 ft²", sqftMetric: "85 m²", dim: "37'-5\" × 32'-10\"", dimMetric: "11.4 m × 10.0 m", img: img("d12b6ba2d_HRGPREFABLab-18.png") },
  { slug: "hrg-202", id: "HRG-202", name: "Cubic Three-Bedroom", beds: 3, baths: 2, sqft: "1,399 ft²", sqftMetric: "130 m²", dim: null, dimMetric: null, img: img("f3d2deaa3_HRGPREFABLab-19.png") },
  { slug: "hrg-203", id: "HRG-203", name: "Loft Four-Bedroom", beds: 4, baths: 2, sqft: "1,507 ft²", sqftMetric: "140 m²", dim: "31'-6\"", dimMetric: "9.6 m", img: img("c3a999e3a_HRGPREFABLab-20.png") },
  { slug: "hrg-204", id: "HRG-204", name: "Cantilever Four-Bedroom", beds: 4, baths: 3, sqft: "1,701 ft²", sqftMetric: "158 m²", dim: "22'-9\"", dimMetric: "6.9 m", img: img("90b2f2d39_HRGPREFABLab-21.png") },
  { slug: "hrg-205", id: "HRG-205", name: "Modern Two-Story", beds: 3, baths: 3, sqft: "1,755 ft²", sqftMetric: "163 m²", dim: "37'-9\"", dimMetric: "11.5 m", img: img("e99317683_HRGPREFABLab-22.png") },
  { slug: "hrg-206", id: "HRG-206", name: "Cedar Two-Story + Garage", beds: 4, baths: 3, sqft: "2,583 ft²", sqftMetric: "240 m²", dim: "43'-10\" × 35'-5\"", dimMetric: "13.3 m × 10.8 m", img: img("9c4dd3939_HRGPREFABLab-23.png") },
  { slug: "hrg-207", id: "HRG-207", name: "Two-Story Modern + Garage", beds: 3, baths: 3, sqft: "2,799 ft²", sqftMetric: "260 m²", dim: "48'-0\" × 24'-8\"", dimMetric: "14.6 m × 7.5 m", img: img("69c4ccbd5_HRGPREFABLab-24.png") },
  { slug: "hrg-208", id: "HRG-208", name: "Hillside Pool Estate", beds: 4, baths: 4, sqft: "3,229 ft²", sqftMetric: "300 m²", dim: null, dimMetric: null, img: img("924073f7e_HRGPREFABLab-25.png") },
  { slug: "hrg-209", id: "HRG-209", name: "Five-Bedroom Estate", beds: 5, baths: 4, sqft: "3,832 ft²", sqftMetric: "356 m²", dim: "73'-7\" × 44'-11\"", dimMetric: "22.4 m × 13.7 m", img: img("b80572518_HRGPREFABLab-26.png") },
];

export const prefabConfigs = [
  { name: "Compact", slug: "hrg-101", meta: ["258 ft²", "1 Bed · 1 Bath"], price: "From $79/ft²", blurb: "An efficient footprint for one: a guest suite, rental, or compact full-time home.", img: photo("5efe4f57e_ChatGPTImageSep29202603_53_17PM1.png") },
  { name: "Essential", slug: "hrg-103", meta: ["646 ft²", "2 Bed · 1 Bath"], price: "From $79/ft²", blurb: "Two bedrooms in a smart linear plan: the essentials for small households.", img: photo("26751b3ff_ChatGPTImageSep29202603_53_18PM1.png") },
  { name: "Family", slug: "hrg-106", meta: ["829 ft²", "2 Bed · 1 Bath"], price: "From $79/ft²", blurb: "Two bedrooms with generous living space for daily family life.", img: photo("f0c372083_ChatGPTImageSep29202603_53_21PM1.png") },
  { name: "Family Plus", slug: "hrg-111", meta: ["1,432 ft²", "3 Bed · 2 Bath"], price: "From $79/ft²", blurb: "Three bedrooms, two bathrooms, and a pool-ready plan.", img: photo("90b775055_ChatGPTImageSep29202603_53_23PM1.png") },
  { name: "Large", slug: "hrg-110", meta: ["1,378 ft²", "4 Bed · 2 Bath"], price: "From $79/ft²", blurb: "Four bedrooms for a growing household.", img: photo("e2663e3f5_ChatGPTImageSep29202603_53_25PM1.png") },
  { name: "Custom", custom: true, meta: ["Any size", "Fully custom"], price: "From $79/ft²", blurb: "A home designed around your property and requirements.", img: photo("a9409ada6_ChatGPTImageSep29202603_53_52PM1.png") },
];

export const prefabCatalogue = [
  { src: img("a0e4d214f_HRGPREFABLab-01.png"), label: "True Prefab Design and Build · Overview" },
  { src: img("973bed88f_HRGPREFABLab-03.png"), label: "Your Home, From Concept to Keys" },
  { src: img("2d1d9dc3d_HRGPREFABLab-04.png"), label: "HRG-101 · Studio Cabin · 258 ft²" },
  { src: img("fd865dcd4_HRGPREFABLab-05.png"), label: "HRG-102 · Single-Bedroom Suite · 452 ft²" },
  { src: img("8a0a7c4f2_HRGPREFABLab-06.png"), label: "HRG-103 · Linear Two-Bedroom · 646 ft²" },
  { src: img("c7f1a7aff_HRGPREFABLab-07.png"), label: "HRG-104 · Compact Two-Bedroom · 592 ft²" },
  { src: img("e59984e29_HRGPREFABLab-08.png"), label: "HRG-106 · Modern Two-Bedroom · 829 ft²" },
  { src: img("5767f99d9_HRGPREFABLab-09.png"), label: "HRG-107 · Two-Bedroom + Dining · 1,076 ft²" },
  { src: img("8f1ba1b5b_HRGPREFABLab-10.png"), label: "HRG-108 · Three-Bedroom + Carport · 1,130 ft²" },
  { src: img("8b9869bef_HRGPREFABLab-11.png"), label: "HRG-109 · Hip-Roof Three-Bedroom · 1,292 ft²" },
  { src: img("92d806ae1_HRGPREFABLab-12.png"), label: "HRG-110 · Four-Bedroom Family · 1,378 ft²" },
  { src: img("3dc32ac97_HRGPREFABLab-13.png"), label: "HRG-111 · Three-Bedroom + Pool · 1,432 ft²" },
  { src: img("de1a22739_HRGPREFABLab-14.png"), label: "HRG-112 · Modern Pool Villa · 1,475 ft²" },
  { src: img("cdffdcf6a_HRGPREFABLab-15.png"), label: "HRG-113 · Four-Bedroom Linear Villa · 2,007 ft²" },
  { src: img("9d19bf47f_HRGPREFABLab-16.png"), label: "HRG-114 · Stone-Clad Three-Bedroom · 2,422 ft²" },
  { src: img("362b49e77_HRGPREFABLab-17.png"), label: "HRG-115 · Three-Bedroom Estate · 2,885 ft²" },
  { src: img("d12b6ba2d_HRGPREFABLab-18.png"), label: "HRG-201 · Two-Story Three-Bedroom · 915 ft²" },
  { src: img("f3d2deaa3_HRGPREFABLab-19.png"), label: "HRG-202 · Cubic Three-Bedroom · 1,399 ft²" },
  { src: img("c3a999e3a_HRGPREFABLab-20.png"), label: "HRG-203 · Loft Four-Bedroom · 1,507 ft²" },
  { src: img("90b2f2d39_HRGPREFABLab-21.png"), label: "HRG-204 · Cantilever Four-Bedroom · 1,701 ft²" },
  { src: img("e99317683_HRGPREFABLab-22.png"), label: "HRG-205 · Modern Two-Story · 1,755 ft²" },
  { src: img("9c4dd3939_HRGPREFABLab-23.png"), label: "HRG-206 · Cedar Two-Story + Garage · 2,583 ft²" },
  { src: img("69c4ccbd5_HRGPREFABLab-24.png"), label: "HRG-207 · Two-Story Modern + Garage · 2,799 ft²" },
  { src: img("924073f7e_HRGPREFABLab-25.png"), label: "HRG-208 · Hillside Pool Estate · 3,229 ft²" },
  { src: img("b80572518_HRGPREFABLab-26.png"), label: "HRG-209 · Five-Bedroom Estate · 3,832 ft²" },
  { src: img("ac865cc24_HRGPREFABLab-27.png"), label: "HRG Prefab · Contact" },
];

/* ------------------------------------ Apple Cabin ------------------------------------ */

const APPLE = {
  overview: img("e33e9c9f1_HRGDeck-AppleHomeContainerKitchen.png"),
  exterior: img("2e6eea16d_HRGDeck-AppleHomeContainerKitchen2.png"),
  gallery: img("439080960_HRGDeck-AppleHomeContainerKitchen3.png"),
  interior: img("a8824fb13_HRGDeck-AppleHomeContainerKitchen4.png"),
  structural: img("1c0349332_HRGDeck-AppleHomeContainerKitchen5.png"),
  configurations: img("a7290eb1f_HRGDeck-AppleHomeContainerKitchen6.png"),
  lineup: img("a71bbf87d_HRGDeck-AppleHomeContainerKitchen7.png"),
  pergola: img("52b27d8f6_HRGDeck-AppleHomeContainerKitchen8.png"),
  upgrades: img("d3c3fe759_HRGDeck-AppleHomeContainerKitchen9.png"),
  addons: img("056bdffa2_HRGDeck-AppleHomeContainerKitchen10.png"),
};

const PRODUCT = "https://media.base44.com/images/public/6aa6b441ec9ba0e9a14504fa";
export const appleModels = [
  { slug: "20ft", name: "20 ft Apple Cabin", dim: "19'0\" × 7'3\" × 8'0\"", area: "138 sq ft", beds: 1, baths: 1, layout: "1 Bedroom · 1 Bathroom · 1 Kitchen", price: "$21,600", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/b953353aa_opt_12f1ee0b5_ChatGPTImageSep28202611_23_53PM.webp" },
  { slug: "30ft", name: "30 ft Apple Cabin", dim: "27'11\" × 7'3\" × 8'0\"", area: "201 sq ft", beds: 1, baths: 1, layout: "1 Bedroom · 1 Bathroom · 1 Kitchen · 1 Living Room", price: "$27,000", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/bcf401d4e_opt_d66583608_ChatGPTImageSep28202611_23_56PM.webp" },
  { slug: "40ft", name: "40 ft Apple Cabin", dim: "37'9\" × 7'3\" × 8'0\"", area: "272 sq ft", beds: 2, baths: 1, layout: "2 Bedrooms · 1 Bathroom · 1 Kitchen · 1 Living Room", price: "$32,400", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/94bdb016b_opt_abb9b6c95_ChatGPTImageSep28202611_23_59PM.webp" },
  { slug: "20ft-pergola", name: "20 ft Apple Cabin w/ Pergola", dim: "19'0\" × 13'9\" × 8'0\"", area: "263 sq ft total (138 indoor + 125 pergola)", beds: 1, baths: 1, layout: "1 Bedroom · 1 Bathroom · 1 Kitchen · Pergola", price: "$30,600", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/60bedce08_opt_3abd471ea_ChatGPTImageSep28202611_24_01PM.webp" },
  { slug: "20ft-double-floor", name: "20 ft Double-Floor Apple Cabin", dim: "Fl1: 19'0\"×7'3\"×8'0\" · Fl2: 19'0\"×7'3\"×8'0\" · Terrace: 11'10\"×7'3\"", area: "631 sq ft total", beds: 1, baths: 1, layout: "1 Bedroom · 1 Bathroom · 1 Kitchen · 1 Living Room", price: "$44,550", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/4f96f9eb9_opt_875f95bb0_ChatGPTImageSep28202611_24_03PM.webp" },
  { slug: "40ft-double-floor", name: "40 ft Double-Floor Apple Cabin", dim: "Fl1: 37'9\"×14'5\"×8'0\" · Fl2: 37'9\"×13'9\"×8'0\" · Terrace: 23'0\"×14'5\"", area: "1,396 sq ft total", beds: 2, baths: 2, layout: "2 Bedrooms · 2 Bathrooms · 1 Kitchen · 2 Living Rooms · Pergola · Terrace", price: "$86,400", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/646a5a777_opt_7b818a792_ChatGPTImageSep28202611_24_05PM.webp" },
];

export const appleConfigs = [
  { name: "20 ft", slug: "20ft", meta: ["138 sq ft", "1 Bed · 1 Bath"], price: "$21,600", blurb: "Bedroom, bathroom, and kitchen in one efficient 138 sq ft volume.", img: appleModels[0].img },
  { name: "30 ft", slug: "30ft", meta: ["201 sq ft", "1 Bed · 1 Bath"], price: "$27,000", blurb: "Adds a dedicated living room to the one-bedroom plan.", img: appleModels[1].img },
  { name: "40 ft", slug: "40ft", meta: ["272 sq ft", "2 Bed · 1 Bath"], price: "$32,400", blurb: "Two bedrooms, a bathroom, kitchen, and living room in the classic 40 ft plan.", img: appleModels[2].img },
  { name: "20 ft w/ Pergola", slug: "20ft-pergola", meta: ["263 sq ft total", "1 Bed · 1 Bath"], price: "$30,600", blurb: "138 sq ft of indoor living plus a 125 sq ft pergola-covered deck.", img: appleModels[3].img },
  { name: "20 ft Double Floor", slug: "20ft-double-floor", meta: ["631 sq ft total", "1 Bed · 1 Bath"], price: "$44,550", blurb: "Two full floors and an 11'10\" terrace give the one-bedroom plan room to spread out.", img: appleModels[4].img },
  { name: "40 ft Double Floor", slug: "40ft-double-floor", meta: ["1,396 sq ft total", "2 Bed · 2 Bath"], price: "$86,400", blurb: "The flagship: two stories, two living rooms, pergola, and terrace.", img: appleModels[5].img },
];

export const appleCatalogue = [
  { src: APPLE.overview, label: "Collection Overview" },
  { src: APPLE.exterior, label: "Exterior Options" },
  { src: APPLE.gallery, label: "Model Gallery" },
  { src: APPLE.interior, label: "Interior Showcase" },
  { src: APPLE.structural, label: "Structural Specifications" },
  { src: APPLE.configurations, label: "Interior Configurations" },
  { src: APPLE.lineup, label: "Model Lineup & Pricing" },
  { src: APPLE.pergola, label: "Pergola Models & Pricing" },
  { src: APPLE.upgrades, label: "Optional Upgrades" },
  { src: APPLE.addons, label: "Add-Ons & Upgrades" },
];

/* -------------------------------- Expandable Container -------------------------------- */

const EXP = {
  hero: img("d51854cd4_HRGDeck-AppleHomeContainerKitchen11.png"),
  multiUnit: img("b7afa7ed5_HRGDeck-AppleHomeContainerKitchen12.png"),
  standard: img("b38e3fa5e_HRGDeck-AppleHomeContainerKitchen13.png"),
  deluxe: img("1c835d9ec_HRGDeck-AppleHomeContainerKitchen14.png"),
  container: img("836c0777d_HRGDeck-AppleHomeContainerKitchen15.png"),
  unit: img("afb4ec00c_HRGDeck-AppleHomeContainerKitchen16.png"),
  design: img("51aeaa3ef_HRGDeck-AppleHomeContainerKitchen17.png"),
  twoStory: img("5cefe9c2d_HRGDeck-AppleHomeContainerKitchen18.png"),
  twoStoryModel: img("535b9ea56_HRGDeck-AppleHomeContainerKitchen19.png"),
};

export const expandableModels = [
  { slug: "standard-cabin", name: "Standard Cabin", meta: ["~320 sq ft", "1 Bed · 1 Bath"], blurb: "Open plan living with full kitchen, bathroom, and bedroom. Ideal for ADU or vacation rental.", img: photo("bed2dca21_ChatGPTImageSep29202604_49_56PM1.png") },
  { slug: "deluxe-cabin", name: "Deluxe Cabin", meta: ["~640 sq ft", "2 Bed · 1 Bath"], blurb: "Two bedrooms, shared living and dining, full kitchen and bathroom. Available in single or double-floor.", img: photo("63f89d305_ChatGPTImageSep29202604_50_02PM1.png") },
  { slug: "container-home", name: "Container Home", meta: ["~960 sq ft", "3 Bed · 2 Bath"], blurb: "Full family configuration with three bedrooms, two bathrooms, living and dining areas.", img: photo("81c60bf41_ChatGPTImageSep29202604_50_15PM1.png") },
  { slug: "office-commercial", name: "Office / Commercial", meta: ["Custom size", "Workspace"], blurb: "Conference room, manager's office, open workspace, and toilet. Ideal for job sites and pop-up offices.", img: photo("a4b0ffce3_ChatGPTImageSep29202604_50_04PM1.png") },
  { slug: "cafe-restaurant", name: "Café / Restaurant", meta: ["Custom size", "Food & beverage"], blurb: "Operating area, bar counter, bread display, dining area, and balcony. Fully finished interior.", img: photo("c2379c6cc_ChatGPTImageSep29202604_50_09PM1.png") },
  { slug: "two-story-modular", name: "Two-Story Prefab", meta: ["2 Bedroom", "Two-story"], blurb: "Two-story expandable home, deployed in white with a black frame.", img: EXP.twoStory },
  { slug: "two-story-model", name: "Two-Story Model House", meta: ["1 Bedroom", "Two-story"], blurb: "Two-story expandable home with a wood-grain exterior.", img: EXP.twoStoryModel },
];

export const expandableConfigs = [
  { name: "1 Bedroom", slug: "standard-cabin", fit: "top", meta: ["~320 sq ft", "1 Bed · 1 Bath"], blurb: "Open-plan living with a full kitchen, bathroom, and bedroom. Ideal for an ADU or vacation rental.", img: photo("bed2dca21_ChatGPTImageSep29202604_49_56PM1.png") },
  { name: "2 Bedroom", slug: "deluxe-cabin", fit: "top", meta: ["~640 sq ft", "2 Bed · 1 Bath"], blurb: "Two bedrooms with shared living and dining, full kitchen and bathroom.", img: photo("63f89d305_ChatGPTImageSep29202604_50_02PM1.png") },
  { name: "3 Bedroom", slug: "container-home", fit: "top", meta: ["~960 sq ft", "3 Bed · 2 Bath"], blurb: "A full family configuration with living and dining areas.", img: photo("81c60bf41_ChatGPTImageSep29202604_50_15PM1.png") },
  { name: "Office / Commercial", slug: "office-commercial", fit: "top", meta: ["Custom size", "Workspace"], blurb: "Workspace configurations for job sites and pop-up offices.", img: photo("a4b0ffce3_ChatGPTImageSep29202604_50_04PM1.png") },
  { name: "Café / Commercial", slug: "cafe-restaurant", fit: "top", meta: ["Custom size", "Food & beverage"], blurb: "An operating area, bar counter, and dining for food and beverage use.", img: photo("c2379c6cc_ChatGPTImageSep29202604_50_09PM1.png") },
  { name: "Custom", custom: true, fit: "top", meta: ["Any size", "Fully custom"], blurb: "A configuration based on your requirements.", img: photo("82b7f5ec8_ChatGPTImageSep29202604_50_06PM1.png") },
];

export const expandableCatalogue = [
  { src: EXP.hero, label: "Expandable Container Home", alt: "Expandable Container Home hero" },
  { src: EXP.multiUnit, label: "Model Gallery & Certifications", alt: "Gallery of expandable container renders" },
  { src: EXP.standard, label: "Standard Cabin Model", alt: "Standard cabin model floor plan and exterior" },
  { src: EXP.deluxe, label: "Deluxe Cabin Model", alt: "Deluxe cabin model floor plan and exterior" },
  { src: EXP.container, label: "Container Home Model", alt: "Container home model floor plan and exterior" },
  { src: EXP.unit, label: "Prefab Home Unit", alt: "Prefab home unit floor plan and exterior" },
  { src: EXP.design, label: "Prefab Home Design", alt: "Prefab home design floor plan and exterior" },
  { src: EXP.twoStory, label: "Two-Story Prefab Home", alt: "Two-story prefab home floor plan and exterior" },
  { src: EXP.twoStoryModel, label: "Two-Story Model House", alt: "Two-story model house floor plan and exterior" },
];

export const expandableRealProjects = [
  { name: "Two-Story Prefab", type: "2 Bedroom Expandable", color: "White with black frame", img: EXP.twoStory },
  { name: "Two-Story Model", type: "1 Bedroom Expandable", color: "Wood-grain exterior", img: EXP.twoStoryModel },
  { name: "Multi-Unit Complex", type: "Multi-unit complex", color: "Blue exterior", img: EXP.multiUnit },
];

/* --------------------------------- Outdoor Kitchen --------------------------------- */

export const kitchenModels = [
  { slug: "model-1", name: "Model 1", fit: "contain", length: "4.1 meters", countertop: "Sintered stone", doors: "Lacquer glass", highlight: "Ice maker, beverage fridge, flatbed grill, 5-burner BBQ, sink, spice rack", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/bba526a3c_k_e6e81561d_ChatGPTImageSep29202605_25_48PM1.webp" },
  { slug: "model-2", name: "Model 2", length: "3.8 meters", countertop: "Sintered stone", doors: "Lacquer glass", highlight: "Kamado grill, 5-burner BBQ, flatbed grill, beverage fridge", img: img("25022f92a_HRGDeck-AppleHomeContainerKitchen60.png") },
  { slug: "model-3", name: "Model 3", length: "3.4 meters", countertop: "Sintered stone", doors: "Lacquer glass", highlight: "Beverage fridge, pizza oven, spice rack, 4-burner BBQ, RO water filter", img: img("3100dc3a5_HRGDeck-AppleHomeContainerKitchen61.png") },
  { slug: "model-4", name: "Model 4", fit: "contain", length: "2.4 meters", countertop: "Sintered stone", doors: "Lacquer glass", highlight: "4-burner BBQ, beverage fridge, stainless sink, compact layout", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/45b873d8e_k_13c0213b0_ChatGPTImageSep29202605_25_43PM1.webp" },
  { slug: "model-5", name: "Model 5", fit: "contain", length: "3.0 meters", countertop: "Sintered stone", doors: "Lacquer glass", highlight: "5-burner BBQ, pizza oven, beverage fridge, sink", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/f7e517614_k_d098f5fa5_ChatGPTImageSep29202605_25_45PM1.webp" },
  { slug: "model-6", name: "Model 6", length: "3.8 meters", countertop: "Sintered stone", doors: "Lacquer glass", highlight: "Kamado grill, 6-burner BBQ, pizza oven, large beverage fridge", img: img("856b3a3c5_HRGDeck-AppleHomeContainerKitchen64.png") },
  { slug: "model-7", name: "Model 7", length: "3.885 meters", countertop: "Sintered stone", doors: "Lacquer glass", highlight: "Glass fridge, pizza oven, 4-burner BBQ, stainless sink", img: img("6585580d9_HRGDeck-AppleHomeContainerKitchen65.png") },
  { slug: "model-8", name: "Model 8", fit: "contain", length: "2.2 × 4.6 meters (L-shape)", countertop: "304 stainless steel", doors: "304 stainless steel", highlight: "Kamado, 4-burner BBQ, double-door fridge, sink, RO filter", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/28af33fed_k_12b596691_ChatGPTImageSep29202605_25_50PM1.webp" },
  { slug: "model-9", name: "Model 9", length: "2.2 × 4.6 meters (L-shape)", countertop: "304 stainless steel", doors: "304 stainless steel", highlight: "Wood-finish panels, 4-burner BBQ, sink, Kamado", img: img("c8b05f375_HRGDeck-AppleHomeContainerKitchen67.png") },
  { slug: "model-10", name: "Model 10", length: "3.2 meters", countertop: "Sintered stone", doors: "Lacquer glass", highlight: "Side burner, glass fridge, spice rack, 5-burner BBQ, flatbed grill", img: img("867f55548_HRGDeck-AppleHomeContainerKitchen68.png") },
  { slug: "model-11", name: "Model 11", fit: "contain", length: "2.57 × 2.95 meters (L-shape)", countertop: "Sintered stone", doors: "Sintered stone", highlight: "Drawer fridge, under-counter sink, built-in grill, RO filter", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/a7387f2e7_k_a80b579a4_ChatGPTImageSep29202605_25_52PM1.webp" },
  { slug: "model-12", name: "Model 12", length: "2.35 meters", countertop: "Quartz stone", doors: "Lacquer glass", highlight: "4-burner BBQ, glass fridge, stainless sink", img: img("00b5d8826_HRGDeck-AppleHomeContainerKitchen70.png") },
  { slug: "model-13", name: "Model 13", length: "4.0 meters", countertop: "Quartz stone", doors: "Wood grain laminated 304 stainless steel", highlight: "3-burner BBQ, stainless sink", img: img("931d71204_HRGDeck-AppleHomeContainerKitchen71.png") },
  { slug: "model-14", name: "Model 14", length: "2.5 × 3.5 meters (L-shape)", countertop: "Sintered stone", doors: "Lacquer glass", highlight: "Pizza oven, flatbed griddle, 4-burner BBQ, beverage fridge, sink", img: img("789e56c02_HRGDeck-AppleHomeContainerKitchen72.png") },
  { slug: "model-15", name: "Model 15", length: "5.0 meters (L-shape)", countertop: "Sintered stone", doors: "Lacquer glass", highlight: "Built-in grill, double-door fridge, sink, pull-out trash bins", img: img("e5066688e_HRGDeck-AppleHomeContainerKitchen73.png") },
];

export const kitchenConfigs = [
  { name: "Essential", slug: "model-4", fit: "contain", meta: ["2.4 m", "Compact"], blurb: "A compact outdoor cooking setup: 4-burner BBQ, beverage fridge, and stainless sink.", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/45b873d8e_k_13c0213b0_ChatGPTImageSep29202605_25_43PM1.webp" },
  { name: "Entertainer", slug: "model-5", fit: "contain", meta: ["3.0 m", "Pizza oven"], blurb: "More preparation, cooking, and storage: 5-burner BBQ, pizza oven, beverage fridge, and sink.", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/f7e517614_k_d098f5fa5_ChatGPTImageSep29202605_25_45PM1.webp" },
  { name: "Premium", slug: "model-1", fit: "contain", meta: ["4.1 m", "Full package"], blurb: "The complete outdoor cooking configuration: ice maker, beverage fridge, flatbed grill, 5-burner BBQ, sink, and spice rack.", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/bba526a3c_k_e6e81561d_ChatGPTImageSep29202605_25_48PM1.webp" },
  { name: "L-Shaped", slug: "model-8", fit: "contain", meta: ["2.2 × 4.6 m", "L-shape"], blurb: "Designed for larger patios: 304 stainless steel build with Kamado grill, 4-burner BBQ, double-door fridge, sink, and RO filter.", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/28af33fed_k_12b596691_ChatGPTImageSep29202605_25_50PM1.webp" },
  { name: "Island", slug: "model-11", fit: "contain", meta: ["2.57 × 2.95 m", "Island"], blurb: "An entertainment-focused central kitchen: drawer fridge, under-counter sink, built-in grill, and RO filter.", img: "https://base44.app/api/apps/6aa6b441ec9ba0e9a14504fa/files/mp/public/6aa6b441ec9ba0e9a14504fa/a7387f2e7_k_a80b579a4_ChatGPTImageSep29202605_25_52PM1.webp" },
];

export const kitchenCatalogue = [
  ...kitchenModels.map((k) => ({ src: k.img, fit: k.fit, label: `${k.name} · ${k.length}`, alt: `Outdoor Kitchen ${k.name}` })),
  { src: img("560b7070a_HRGDeck-AppleHomeContainerKitchen74.png"), label: "Cabinet Box · 16mm 304 Double-layer Stainless Steel", alt: "Cabinet box construction" },
  { src: img("f0be5f899_HRGDeck-AppleHomeContainerKitchen75.png"), label: "Countertop Options", alt: "Countertop materials" },
  { src: img("5a374df30_HRGDeck-AppleHomeContainerKitchen76.png"), label: "Door Panel Options", alt: "Door panel materials" },
  { src: img("88fef0045_HRGDeck-AppleHomeContainerKitchen77.png"), label: "Appliances · CE Certified", alt: "CE certified appliances" },
  { src: img("5e26b9fe6_HRGDeck-AppleHomeContainerKitchen78.png"), label: "Appliances & Color Options", alt: "Appliances and color options" },
];

/* ------------------------------- Collection registry ------------------------------- */

export const buildCollections = {
  "prefab-design-build": {
    slug: "prefab-design-build",
    name: "Prefab Design & Build",
    tagline: "A true prefab starting point: engineered to US specifications and fully customizable around your property.",
    models: prefabModels,
    configs: prefabConfigs,
    catalogue: prefabCatalogue,
    heroFit: "contain",
    metaFor: (m) => [m.sqft, `${m.beds} Bed · ${m.baths} Bath`],
    priceFor: () => "From $79/ft² · finish level dependent",
    specsFor: (m) => [
      { label: "Floor area", value: `${m.sqft}${m.sqftMetric ? ` (${m.sqftMetric})` : ""}` },
      { label: "Dimensions", value: m.dim ? `${m.dim}${m.dimMetric ? ` (${m.dimMetric})` : ""}` : "Per final plan" },
      { label: "Bedrooms", value: m.beds },
      { label: "Bathrooms", value: m.baths },
      { label: "Price basis", value: "From $79/ft² by finish level" },
    ],
    floorPlanFor: (m) => ({ src: m.photo || m.img, label: `${m.id} · ${m.name}` }),
    galleryFor: (m) => [prefabCatalogue[0], prefabCatalogue[1], prefabCatalogue[2], { src: m.img, label: `${m.id} · ${m.name} · ${m.sqft}` }],
    included: [
      { title: "Complete engineered materials package", desc: "Structure, envelope, and interior materials computed for your chosen model by our engineering team." },
      { title: "Factory prefabrication", desc: "Modules and components built in controlled factory conditions, then shipped to your site." },
      { title: "Finish level of your choice", desc: "Standard, Premium, or Luxury interior specification." },
      { title: "Assembly documentation", desc: "Architectural and construction shop drawings, plus foundation drawings for your local contractor." },
    ],
    customization: [
      { name: "Finishes", desc: "Select the Standard, Premium, or Luxury package: from builder-grade fixtures to natural stone and custom millwork." },
      { name: "Exterior", desc: "Facade and cladding treatments adapted to your project and setting." },
      { name: "Kitchen", desc: "Kitchen specification matched to your finish level, from stock cabinetry to designer packages." },
      { name: "Windows", desc: "Window placement and glazing adapted to your plan and site orientation." },
      { name: "Layout", desc: "Bedroom, bathroom, and living configuration adjusted to your property where applicable." },
    ],
    customizationNote: "This configuration is a starting point, not a fixed product. Your HRG project manager adapts the plan to your property, budget, and requirements.",
  },
  "apple-cabin": {
    slug: "apple-cabin",
    name: "Apple Cabin",
    tagline: "Factory-direct prefab structures that ship fully assembled for plug-and-play installation on site.",
    models: appleModels,
    configs: appleConfigs,
    catalogue: appleCatalogue,
    heroFit: "contain",
    metaFor: (m) => [m.area, `${m.beds} Bed · ${m.baths} Bath`],
    priceFor: (m) => `${m.price} · factory direct`,
    specsFor: (m) => [
      { label: "Dimensions (L×W×H)", value: m.dim },
      { label: "Floor area", value: m.area },
      { label: "Layout", value: m.layout },
      { label: "Price", value: `${m.price} factory direct` },
    ],
    floorPlanFor: () => null,
    galleryFor: (m) => [{ src: m.img, label: m.name }, ...appleCatalogue],
    included: [
      { title: "Galvanized steel frame", desc: "120×60×2.0mm galvanized square steel tubing." },
      { title: "A-class fireproof roof", desc: "0.45mm galvanized color steel plate, fully welded." },
      { title: "Waterproof floor system", desc: "18mm high-density cement pressure board with PVC multi-layer composite finish floor." },
      { title: "Insulated envelope", desc: "Metal embossed exterior cladding with rigid polyurethane foam insulation and formaldehyde-free interior panels." },
      { title: "Complete electrical & plumbing", desc: "ELCB protection and a full indoor supply and drain system with hot and cold lines." },
      { title: "LED lighting", desc: "LED ceiling fixtures included, with recessed and track options available." },
    ],
    customization: [
      { name: "Exterior cladding", desc: "Aviation-grade aluminum cladding for walls and roof." },
      { name: "Interior wall panels", desc: "Carbon crystal wall panel upgrade." },
      { name: "Insulation", desc: "50mm polyurethane foam insulation upgrade." },
      { name: "Flooring", desc: "4mm SPC rigid-core flooring, or engineered wood with graphene electric radiant heating." },
      { name: "Smart home & comfort", desc: "AI voice control, mini-split air conditioning, smart door lock, and storage water heater add-ons." },
    ],
    customizationNote: "Every Apple Cabin is one architectural concept adapted to your size and living requirements. This configuration is a starting point that we adapt to your site.",
  },
  "expandable-container": {
    slug: "expandable-container",
    name: "Expandable Container",
    tagline: "Ships compressed, expands on site: flexible space for residential and commercial use.",
    models: expandableModels,
    configs: expandableConfigs,
    catalogue: expandableCatalogue,
    heroFit: "contain",
    metaFor: (m) => m.meta,
    priceFor: () => null,
    specsFor: (m) => [
      { label: "Size", value: m.meta[0] },
      { label: "Configuration", value: m.meta[1] },
      { label: "About this unit", value: m.blurb },
    ],
    floorPlanFor: (m) => ({ src: m.img, label: `${m.name} · floor plan and exterior` }),
    galleryFor: () => expandableCatalogue,
    included: [
      { title: "6-ton structural frame", desc: "Steel structural frame rated at 6 tons of load." },
      { title: "Fold-out expansion", desc: "Side walls fold out on welded high-strength hinges, with unlimited disassembly cycles." },
      { title: "Compressed shipping", desc: "Arrives in a standard container footprint on a flatbed truck; no crane required for single-floor units." },
      { title: "Complete interior", desc: "Kitchen, bathroom, and living areas finished per your configuration." },
    ],
    customization: [
      { name: "Configuration", desc: "Bedrooms, bathrooms, and layout adapted to your space and use case." },
      { name: "Exterior finish", desc: "Exterior colors and finishes as deployed across our real projects." },
      { name: "Floors", desc: "Single or double-floor arrangements." },
    ],
    customizationNote: "This configuration is a starting point. We adapt the layout, size, and finishes to your property and requirements.",
  },
  "outdoor-kitchen": {
    slug: "outdoor-kitchen",
    name: "Outdoor Kitchen",
    tagline: "Factory-direct outdoor kitchen systems with sintered stone and stainless construction.",
    models: kitchenModels,
    configs: kitchenConfigs,
    catalogue: kitchenCatalogue,
    heroFit: "contain",
    metaFor: (m) => [m.length],
    priceFor: () => null,
    specsFor: (m) => [
      { label: "Length", value: m.length },
      { label: "Countertop", value: m.countertop },
      { label: "Door panels", value: m.doors },
      { label: "Appliances", value: m.highlight },
    ],
    floorPlanFor: () => null,
    galleryFor: (m) => [
      { src: m.img, label: `${m.name} · ${m.length}` },
      ...kitchenCatalogue.slice(15),
    ],
    included: [
      { title: "Stainless cabinet box", desc: "16mm 304 double-layer stainless steel cabinet box." },
      { title: "Countertop", desc: "Your choice of 15mm sintered stone, 20mm quartz, or 15mm 304 stainless steel." },
      { title: "Door panels", desc: "20mm lacquer glass, 16mm 304 stainless steel, or 20mm sintered stone." },
      { title: "CE-certified appliances", desc: "Grills, Kamado, pizza oven, refrigeration, sink, and accessories per configuration." },
    ],
    customization: [
      { name: "Length", desc: "Cabinet runs sized to your space." },
      { name: "Countertop material", desc: "Sintered stone, quartz, or stainless steel." },
      { name: "Door panels", desc: "Lacquer glass, stainless steel, or sintered stone, in multiple colors." },
      { name: "Appliances", desc: "Appliance package selected per configuration, all CE certified with custom logo branding available." },
    ],
    customizationNote: "This configuration is a starting point. We size the kitchen and select materials and appliances around your exact outdoor space.",
  },
};

export function getBuild(collectionSlug, modelSlug) {
  const collection = buildCollections[collectionSlug];
  if (!collection) return null;
  const model = collection.models.find((m) => m.slug === modelSlug);
  if (!model) return null;
  return { collection, model };
}
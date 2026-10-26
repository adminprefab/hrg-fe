// A visitor's catalogue build carried between pages in the URL:
//   /see-what-fits?model=hrg-103&sf=650&f=cabinets.wood,flooring.oak&a=solar
// `model` is a prefab slug (hrg-103) or one of the two prototypes (500 / 800).
import { PROTOTYPES } from "./prototypes";
import { buildPath, getPrefabModel } from "./collectionData";
import { decodeFinishes, encodeFinishes, finishLines, finishLeadFields } from "./finishPricing";
import { PRICING, money } from "./projectPricing";

export function presetFromSearch(search) {
  const params = new URLSearchParams(search);
  const modelParam = (params.get("model") || "").toLowerCase();
  const prefab = getPrefabModel(modelParam);
  const prototype = PROTOTYPES.find((p) => modelParam === p.id || modelParam.includes(p.id));
  if (!prefab && !prototype) return null;

  const sizeParam = Number(params.get("sf"));
  const baseSf = prefab ? prefab.sf : Number(prototype.id);
  const sf = sizeParam >= PRICING.sfMin && sizeParam <= PRICING.sfLargeMax ? sizeParam : baseSf;
  const { finishes, addOns } = decodeFinishes(params.get("f") || "", params.get("a") || "");

  return {
    slug: prefab ? prefab.slug : prototype.id,
    name: prefab ? `${prefab.id} ${prefab.name}` : prototype.name,
    img: prefab ? prefab.photo || prefab.img : prototype.image,
    sf,
    // Prototypes have no configurator, so they carry a size only.
    finishes: prefab ? finishes : undefined,
    addOns: prefab ? addOns : [],
    editTo: prefab ? `${buildPath(prefab.slug)}${search}` : null,
  };
}

export function presetSearch({ slug, sf, finishes, addOns }) {
  const { f, a } = encodeFinishes(finishes, addOns);
  const params = new URLSearchParams({ model: slug, sf: String(sf) });
  if (f) params.set("f", f);
  if (a) params.set("a", a);
  return `?${params.toString()}`;
}

// What a build saves on the Lead (entity) and says in the email (lines).
export function presetLeadFields(preset, estimate, sf) {
  if (!preset) return { entity: {}, lines: [] };
  const choices = preset.finishes ? finishLines(sf, preset.finishes, preset.addOns) : [];
  const priceNote = (l) =>
    l.included ? " (included)" : l.amount === null ? " (pricing to be confirmed)" : ` (+${money(l.amount)})`;
  const choiceText = choices.map((l) => `${l.label}: ${l.name}${l.chosen ? "" : " [not chosen, standard]"}${priceNote(l)}`);
  return {
    entity: {
      model_selection: preset.name,
      ...(preset.finishes ? finishLeadFields(preset.finishes, preset.addOns) : {}),
      finish_selections: choiceText.join("; ") || undefined,
      estimate_low: Math.round(estimate.range.low),
      estimate_high: Math.round(estimate.range.high),
    },
    lines: [
      `Model: ${preset.name} · ${sf} SF`,
      ...choiceText,
      `Price range shown: ${money(estimate.range.low)} – ${money(estimate.range.high)}`,
    ],
  };
}

import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { getPrefabModel } from "@/lib/collectionData";
import { ADD_ONS, FINISH_GROUPS, decodeFinishes } from "@/lib/finishPricing";
import { buildProject } from "@/lib/projectPricing";
import { presetSearch } from "@/lib/buildPreset";
import SwatchGroup from "@/components/buildyours/SwatchGroup";
import PriceSummary, { PriceBar } from "@/components/buildyours/PriceSummary";

// "Build yours": pick a size and finishes for one prefab model and watch the price range
// move, then carry the build into the property and contact steps (/see-what-fits).
export default function BuildYours() {
  const { modelSlug } = useParams();
  const model = getPrefabModel(modelSlug);
  const location = useLocation();
  const navigate = useNavigate();

  // Start from the choices in the URL, so "Edit finishes" and a refresh keep them.
  const [build, setBuild] = useState(() => {
    const params = new URLSearchParams(location.search);
    const sf = Number(params.get("sf"));
    return {
      sf: model?.sizes.some((s) => s.sf === sf) ? sf : model?.sf,
      ...decodeFinishes(params.get("f") || "", params.get("a") || ""),
    };
  });

  const search = model ? presetSearch({ slug: model.slug, ...build }) : "";
  useEffect(() => {
    if (model && search !== location.search) navigate({ search }, { replace: true });
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!model) return <Navigate to="/collection/prefab-design-build" replace />;

  const estimate = buildProject({ sf: build.sf, finishes: build.finishes, addOns: build.addOns });
  const costAtSize = (o) => (o.perSf || 0) * build.sf + (o.flat || 0);
  const groups = FINISH_GROUPS.filter((g) => model.finishGroups.includes(g.key));

  const pickFinish = (group) => (key) => setBuild((b) => ({ ...b, finishes: { ...b.finishes, [group]: key } }));
  const toggleAddOn = (key) =>
    setBuild((b) => ({
      ...b,
      addOns: b.addOns.includes(key) ? b.addOns.filter((k) => k !== key) : [...b.addOns, key],
    }));
  const onContinue = () => navigate(`/see-what-fits${search}`);

  return (
    <div className="bg-background min-h-screen pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-10">
        <Link
          to={`/collection/prefab-design-build/${model.slug}`}
          className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-primary"
        >
          <ChevronLeft className="w-4 h-4" />
          {model.id} details
        </Link>

        <div className="mt-4 lg:grid lg:grid-cols-[1fr_340px] lg:gap-12">
          <div>
            <div className="rounded-lg overflow-hidden bg-white border border-border">
              <img
                src={model.photo || model.img}
                alt={model.name}
                className={`w-full aspect-[16/10] ${model.photo ? "object-cover" : "object-contain"}`}
              />
            </div>
            <div className="mt-6">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">{model.id}</div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold">Build your {model.name}</h1>
              <p className="mt-2 text-foreground/60">
                {model.beds} bed · {model.baths} bath · tap to choose
              </p>
            </div>

            <section className="py-8">
              <h2 className="font-heading text-xl md:text-2xl font-bold">Size</h2>
              <div className="mt-4 grid grid-cols-3 gap-3 max-w-lg">
                {model.sizes.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    aria-pressed={build.sf === s.sf}
                    onClick={() => setBuild((b) => ({ ...b, sf: s.sf }))}
                    className={`rounded-md border-2 px-3 py-3 text-center transition-colors ${
                      build.sf === s.sf ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="font-heading text-lg font-bold">{s.sf.toLocaleString("en-US")}</div>
                    <div className="text-xs text-foreground/60">{s.label} · ft²</div>
                  </button>
                ))}
              </div>
            </section>

            {groups.map((g) => (
              <SwatchGroup
                key={g.key}
                label={g.label}
                options={g.options}
                selected={build.finishes[g.key]}
                onPick={pickFinish(g.key)}
                costOf={costAtSize}
              />
            ))}
            <SwatchGroup
              label="Add-ons"
              options={ADD_ONS}
              selected={build.addOns}
              onPick={toggleAddOn}
              costOf={costAtSize}
            />

            {/* Phones: the summary sits at the end, and the bar below keeps the range in view. */}
            <div className="lg:hidden pb-10">
              <PriceSummary estimate={estimate} onContinue={onContinue} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <PriceSummary estimate={estimate} onContinue={onContinue} />
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Questions? Talk to us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <PriceBar estimate={estimate} onContinue={onContinue} />
    </div>
  );
}

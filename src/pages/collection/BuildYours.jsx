import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getPrefabModel } from "@/lib/collectionData";
import { ADD_ONS, decodeFinishes, includedOption, relevantCategories } from "@/lib/finishPricing";
import { buildProject } from "@/lib/projectPricing";
import { presetSearch } from "@/lib/buildPreset";
import ProgressSteps from "@/components/finishes/ProgressSteps";
import FinishCard from "@/components/finishes/FinishCard";
import FinishDetail from "@/components/finishes/FinishDetail";
import CoordinatedLooks from "@/components/finishes/CoordinatedLooks";
import { ReviewSheet, SelectionsAside, SelectionsBar } from "@/components/finishes/SelectionsSummary";

const ADD_ONS_TAB = { key: "addons", label: "Add-ons", intro: "Optional extras. Skip them if you like.", slots: [] };

// Choices survive leaving the page: the URL carries them, and this browser remembers the
// last build of each model for when the visitor comes back without the link.
const storageKey = (slug) => `hrg-build-${slug}`;
const remember = (slug, search) => {
  try {
    localStorage.setItem(storageKey(slug), search);
  } catch {
    // private mode or storage blocked: the URL still carries the build
  }
};
const recall = (slug) => {
  try {
    return localStorage.getItem(storageKey(slug)) || "";
  } catch {
    return "";
  }
};

// The Finishes step of the Project Builder: browse finishes by category, look closer,
// pick or change, or start from a coordinated look; then save and continue into the
// property and contact steps (/see-what-fits).
export default function BuildYours() {
  const { modelSlug } = useParams();
  const model = getPrefabModel(modelSlug);
  const location = useLocation();
  const navigate = useNavigate();

  const [build, setBuild] = useState(() => {
    const has = (s) => /[?&](sf|f|a)=/.test(s);
    const params = new URLSearchParams(has(location.search) ? location.search : model ? recall(model.slug) : "");
    const sf = Number(params.get("sf"));
    return {
      sf: model?.sizes.some((s) => s.sf === sf) ? sf : model?.sf,
      ...decodeFinishes(params.get("f") || "", params.get("a") || ""),
    };
  });
  // The project scope decides which categories apply (no plumbing: no tile or fixtures).
  const plumbing = new URLSearchParams(location.search).get("plumbing") !== "No";
  const categories = useMemo(() => [...relevantCategories({ plumbing }), ADD_ONS_TAB], [plumbing]);

  const [active, setActive] = useState(categories[0].key);
  const [detail, setDetail] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [looksOpen, setLooksOpen] = useState(false);
  const [appliedLook, setAppliedLook] = useState(null);
  const catalogueTop = useRef(null);

  const search = model ? presetSearch({ slug: model.slug, ...build }) : "";
  const plumbingParam = plumbing ? "" : "&plumbing=No";
  useEffect(() => {
    if (!model) return;
    remember(model.slug, search);
    if (search + plumbingParam !== location.search) navigate({ search: search + plumbingParam }, { replace: true });
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!model) return <Navigate to="/collection/prefab-design-build" replace />;

  const shownSlots = categories.flatMap((c) => c.slots.map((s) => ({ ...s, category: c.key })));
  // Slots hidden by scope are dropped from the build, so they never reach the lead.
  const finishes = Object.fromEntries(Object.entries(build.finishes).filter(([k]) => shownSlots.some((s) => s.key === k)));
  const estimate = buildProject({ sf: build.sf, finishes, addOns: build.addOns });
  const rows = shownSlots.map((slot) => ({
    slot,
    category: slot.category,
    included: includedOption(slot),
    option: slot.options.find((o) => o.key === finishes[slot.key]) || null,
  }));
  const category = categories.find((c) => c.key === active) || categories[0];
  const nextCategory = categories[categories.indexOf(category) + 1];
  const isAddOns = category.key === ADD_ONS_TAB.key;

  const choose = (slotKey, optionKey) => {
    setAppliedLook(null);
    setBuild((b) => ({ ...b, finishes: { ...b.finishes, [slotKey]: optionKey } }));
  };
  const clear = (slotKey) => {
    setAppliedLook(null);
    setBuild((b) => ({ ...b, finishes: Object.fromEntries(Object.entries(b.finishes).filter(([k]) => k !== slotKey)) }));
  };
  const toggleAddOn = (key) =>
    setBuild((b) => ({ ...b, addOns: b.addOns.includes(key) ? b.addOns.filter((k) => k !== key) : [...b.addOns, key] }));
  const applyLook = (look) => {
    setAppliedLook(look.key);
    setBuild((b) => ({ ...b, finishes: { ...b.finishes, ...look.picks } }));
  };
  const jumpTo = (key) => {
    setActive(key);
    catalogueTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const help = () => {
    setReviewOpen(false);
    setLooksOpen(true);
    setTimeout(() => document.getElementById("looks")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };
  const save = () => navigate(`/see-what-fits${search}${plumbingParam}`);
  const actions = { onSave: save, onReview: () => setReviewOpen(true), onHelp: help };

  const detailSelectedKey = !detail
    ? null
    : detail.slotKey
      ? finishes[detail.slotKey]
      : build.addOns.includes(detail.option.key)
        ? detail.option.key
        : null;

  return (
    <div className="bg-background min-h-screen pb-40 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 md:pt-8">
        <ProgressSteps current="Finishes" />

        {/* Compact introduction, with the home being finished */}
        <header className="mt-6 md:mt-8 flex items-start gap-4 md:gap-6">
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-3xl md:text-[2.6rem] font-bold leading-tight text-balance">
              Make it feel <em className="font-serif font-medium">like home.</em>
            </h1>
            <p className="mt-2 text-foreground/65 md:text-lg">Explore finishes that fit your style and your project.</p>
          </div>
          <Link
            to={`/collection/prefab-design-build/${model.slug}`}
            className="hidden sm:flex items-center gap-3 rounded-md border border-border bg-card p-2 pr-4 shrink-0 hover:border-primary/50"
          >
            <img src={model.photo || model.img} alt="" className="w-16 h-12 rounded object-cover bg-white" />
            <span className="text-sm leading-tight">
              <span className="block font-semibold">{model.name}</span>
              <span className="text-foreground/60">
                {model.id} · {model.beds} bed · {model.baths} bath
              </span>
            </span>
          </Link>
        </header>

        {/* Size belongs to "Your Model"; kept small here so it can still change */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <Link to={`/collection/prefab-design-build/${model.slug}`} className="sm:hidden inline-flex items-center gap-1 text-foreground/60 mr-2 min-h-10">
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            {model.name}
          </Link>
          <span className="text-foreground/60 mr-1">Size</span>
          {model.sizes.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={build.sf === s.sf}
              onClick={() => setBuild((b) => ({ ...b, sf: s.sf }))}
              className={`min-h-10 rounded-full border px-3.5 font-semibold ${
                build.sf === s.sf ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {s.sf.toLocaleString("en-US")} sq ft
            </button>
          ))}
        </div>

        <div className="mt-6">
          <CoordinatedLooks open={looksOpen} onToggle={() => setLooksOpen((o) => !o)} applied={appliedLook} onApply={applyLook} />
        </div>

        <div className="mt-8 lg:grid lg:grid-cols-[1fr_330px] lg:gap-10 items-start">
          <div ref={catalogueTop} className="scroll-mt-24 min-w-0">
            {/* Category navigation: one scrollable row */}
            <div
              role="tablist"
              aria-label="Finish categories"
              onKeyDown={(e) => {
                // Arrow keys move between categories, as screen-reader users expect from tabs.
                const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
                if (!step) return;
                e.preventDefault();
                const next = categories[(categories.indexOf(category) + step + categories.length) % categories.length];
                setActive(next.key);
                e.currentTarget.querySelector(`[data-tab="${next.key}"]`)?.focus();
              }}
              className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((c) => {
                const on = c.key === category.key;
                const done = c.key === ADD_ONS_TAB.key ? build.addOns.length > 0 : c.slots.every((s) => finishes[s.key]);
                return (
                  <button
                    key={c.key}
                    role="tab"
                    data-tab={c.key}
                    aria-selected={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(c.key)}
                    className={`shrink-0 min-h-11 inline-flex items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors ${
                      on ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/40"
                    }`}
                  >
                    {done && <span aria-label="chosen">✓</span>}
                    {c.label}
                  </button>
                );
              })}
            </div>

            <section role="tabpanel" aria-label={category.label} className="mt-6">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{category.label}</h2>
              <p className="mt-1 text-foreground/60">{category.intro}</p>

              {category.slots.map((slot) => (
                <div key={slot.key} className="mt-6">
                  {category.slots.length > 1 && (
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-foreground/60">{slot.label}</h3>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {slot.options.map((o) => (
                      <FinishCard
                        key={o.key}
                        option={o}
                        sf={build.sf}
                        selected={finishes[slot.key] === o.key}
                        onSelect={() => (finishes[slot.key] === o.key ? clear(slot.key) : choose(slot.key, o.key))}
                        onDetails={() => setDetail({ option: o, slotKey: slot.key, slotLabel: slot.label })}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {isAddOns && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {ADD_ONS.map((a) => (
                    <FinishCard
                      key={a.key}
                      option={a}
                      sf={build.sf}
                      selected={build.addOns.includes(a.key)}
                      onSelect={() => toggleAddOn(a.key)}
                      onDetails={() => setDetail({ option: a, slotKey: null, slotLabel: "Add-on" })}
                    />
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
                {nextCategory ? (
                  <button
                    type="button"
                    onClick={() => jumpTo(nextCategory.key)}
                    className="min-h-12 rounded-md border border-foreground/25 px-6 text-sm font-semibold hover:border-primary hover:text-primary"
                  >
                    Next: {nextCategory.label}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={save}
                    className="min-h-12 rounded-md bg-primary text-primary-foreground px-6 text-sm font-semibold uppercase tracking-wide"
                  >
                    Save and continue
                  </button>
                )}
                <span className="text-xs text-foreground/50">Sample finishes and photos. HRG confirms products and prices in your project review.</span>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block sticky top-24">
            <SelectionsAside rows={rows} estimate={estimate} onJump={jumpTo} {...actions} />
          </aside>
        </div>
      </div>

      <SelectionsBar rows={rows} estimate={estimate} onReview={() => setReviewOpen(true)} onSave={save} />
      <ReviewSheet open={reviewOpen} onOpenChange={setReviewOpen} rows={rows} estimate={estimate} onJump={jumpTo} {...actions} />
      <FinishDetail
        detail={detail}
        sf={build.sf}
        selectedKey={detailSelectedKey}
        onSelect={() => {
          if (detail.slotKey) choose(detail.slotKey, detail.option.key);
          else if (!build.addOns.includes(detail.option.key)) toggleAddOn(detail.option.key);
        }}
        onClear={() => {
          if (detail.slotKey) clear(detail.slotKey);
          else toggleAddOn(detail.option.key);
          setDetail(null);
        }}
        onClose={() => setDetail(null)}
      />
    </div>
  );
}

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import ReferencesStrip from "@/components/shared/ReferencesStrip";
import FloorPlan from "@/components/buildings/FloorPlan";
import BuildingQuoteForm from "@/components/buildings/BuildingQuoteForm";
import { money } from "@/lib/projectPricing";
import { BUILDINGS, BUILDING_GROUPS, BUILDING_INCLUDED, BUILDING_INSTALL, feet } from "@/lib/buildingCatalogue";

const fromPrice = Math.min(...BUILDINGS.map((b) => b.price.pkg));

function BuildingCard({ b, onQuote }) {
  return (
    <article id={b.id} className="scroll-mt-24 flex flex-col rounded-lg border border-border bg-card overflow-hidden">
      <div className="bg-secondary/30 px-4 pt-4 pb-2">
        <FloorPlan building={b} className="w-full h-auto max-h-64" />
        <p className="mt-1 text-xs text-foreground/55 tabular-nums">
          {feet(b.w)} × {feet(b.d)} · {b.sf.toLocaleString("en-US")} SF · concept plan
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {b.code ? `${b.code} · ` : ""}
          {b.rooms_label}
        </div>
        <h3 className="mt-1 font-heading text-xl font-bold">{b.name}</h3>
        <p className="mt-1 text-sm text-foreground/65">{b.use}</p>

        <div className="mt-4 border-t border-border pt-4 tabular-nums">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-foreground/55">Building package</div>
          <div className="font-heading text-2xl font-bold text-primary">{money(b.price.pkg)}</div>
          <p className="text-sm font-semibold">
            Est. installed {money(b.price.low)} – {money(b.price.high)}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onQuote(b.id)}
            className="flex-1 min-h-11 rounded-md bg-primary px-4 py-3 text-xs font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Quote this building
          </button>
          {b.buildPath && (
            <Link
              to={b.buildPath}
              className="flex-1 min-h-11 inline-flex items-center justify-center rounded-md border border-primary px-4 py-3 text-xs font-bold uppercase tracking-wide text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Pick finishes
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

// Buildings: eight starting models, each a floor plan beside its package price and installed range.
export default function Buildings() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const quoteRef = useRef(null);
  const shown = filter === "all" ? BUILDINGS : BUILDINGS.filter((b) => b.group === filter);

  const quote = (id) => {
    setSelected(id);
    setTimeout(() => quoteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  };

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="Buildings"
        label="The HRG Building Collection"
        title={<>Pick a plan. <em className="not-italic font-bold">See the price.</em></>}
        subtitle={`Eight prefab buildings, from a garden office to a three-bedroom home. Building packages from ${money(fromPrice)}.`}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <SectionLabel>The collection</SectionLabel>
        <h2 className="font-heading text-3xl md:text-4xl font-bold">8 buildings. One team installs them.</h2>
        <p className="mt-2 max-w-2xl text-foreground/65">
          The building package is the building and its delivery. The installed range adds drawings, permits, site work and assembly.
        </p>

        <div className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {BUILDING_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={filter === g.id}
              onClick={() => setFilter(g.id)}
              className={`shrink-0 min-h-11 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                filter === g.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/60"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((b) => (
            <BuildingCard key={b.id} b={b} onQuote={quote} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 md:pb-20 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-bold">In the building package</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {BUILDING_INCLUDED.map((t) => (
              <li key={t} className="flex gap-2">
                <Check className="mt-0.5 w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-bold">Added in the installed estimate</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75">
            {BUILDING_INSTALL.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-foreground/55">Plans shown are concept layouts. Final plans come with your quote.</p>
        </div>
      </section>

      <section ref={quoteRef} id="quote" className="bg-secondary/40 py-14 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Get your building quote</h2>
          <p className="mt-2 mb-6 text-foreground/65">
            We'll confirm the plan, your price and a delivery window. Adding a pool?{" "}
            <Link to="/pools" className="font-semibold text-primary hover:underline">
              See the Pool Collection
            </Link>
            .
          </p>
          <BuildingQuoteForm selectedId={selected} onSelect={setSelected} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <ReferencesStrip />
      </section>
    </div>
  );
}

import React, { useState } from "react";
import { money } from "@/lib/projectPricing";
import { POOL_COLLECTIONS, POOL_MODELS, POOL_PRICING, poolPrice } from "@/lib/poolCatalogue";

const short = (n) => `$${Math.round(n / 1000)}k`;

function PoolCard({ model, onQuote }) {
  const [k, setK] = useState(1);
  const size = model.sizes[k];
  const p = poolPrice(model, size);

  return (
    <article className="flex flex-col rounded-lg overflow-hidden border border-border bg-card">
      <div className="relative">
        <img
          src={model.photo}
          alt={`${model.name} pool with mosaic tile interior`}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[4/3] object-cover"
        />
        {model.installed && (
          <span className="absolute left-3 top-3 rounded bg-brand-dark/85 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            Installed by HRG
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-bold">{model.name}</h3>
        <p className="mt-1 text-sm text-foreground/65">{model.blurb}</p>
        <p className="mt-2 text-xs text-foreground/50">Depth {model.depth}</p>

        <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label={`${model.name} size`}>
          {model.sizes.map((sz, i) => (
            <button
              key={sz.join("x")}
              type="button"
              aria-pressed={i === k}
              onClick={() => setK(i)}
              className={`min-h-11 rounded-md border px-2 py-1.5 text-center transition-colors ${
                i === k ? "border-primary bg-primary/10 text-foreground" : "border-border hover:border-primary/60"
              }`}
            >
              <span className="block text-sm font-semibold">{sz[0]}×{sz[1]}</span>
              <span className="block text-[11px] text-foreground/60">{short(poolPrice(model, sz).pkg)}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-primary">
            {p.promo ? `${POOL_PRICING.promo.name} · ${POOL_PRICING.promo.percentOff}% off` : "Pool package"}
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold">{money(p.pkg)}</span>
            {p.promo && <s className="text-sm text-foreground/45">{money(p.list)}</s>}
          </div>
          <p className="mt-1 text-xs text-foreground/60">
            {size[0]}′ × {size[1]}′ · {p.sf} SF · {p.modules} sections
            <br />
            Est. installed {money(p.low)} – {money(p.high)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onQuote({ model, size, price: p })}
          className="mt-5 min-h-11 rounded-md bg-primary px-4 py-3 text-xs font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Quote this pool
        </button>
      </div>
    </article>
  );
}

// The 16 models with collection filters; picking "Quote this pool" hands the choice to the form.
export default function PoolCollection({ onQuote }) {
  const [filter, setFilter] = useState("all");
  const models = filter === "all" ? POOL_MODELS : POOL_MODELS.filter((m) => m.collection === filter);

  return (
    <div>
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {POOL_COLLECTIONS.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={`shrink-0 min-h-11 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors ${
              filter === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/60"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {models.map((m) => (
          <PoolCard key={m.id} model={m} onQuote={onQuote} />
        ))}
      </div>
    </div>
  );
}

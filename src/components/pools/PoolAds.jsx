import React from "react";
import { money } from "@/lib/projectPricing";
import { POOL_ADS, POOL_MODELS, poolPrice } from "@/lib/poolCatalogue";

// The three pools from the ad campaign, as people saw them: the vertical ad video,
// then the same price and a quote button for that pool at the advertised size.
export default function PoolAds({ onQuote }) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {POOL_ADS.map((ad) => {
        const model = POOL_MODELS.find((m) => m.id === ad.model);
        const price = poolPrice(model, ad.size);
        return (
          <figure key={ad.model} className="flex flex-col">
            <video
              className="w-full aspect-[9/16] rounded-lg bg-brand-dark object-cover"
              src={ad.video}
              poster={ad.poster}
              controls
              playsInline
              preload="none"
              aria-label={`${model.name} pool video`}
            />
            <figcaption className="mt-3 flex flex-1 flex-col">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {model.name} · {ad.size[0]}′ × {ad.size[1]}′
              </div>
              <p className="mt-1 font-heading font-bold leading-snug">{ad.headline}</p>
              <p className="mt-1 text-sm tabular-nums">
                <span className="font-semibold">{money(price.pkg)} package</span>
                <span className="text-foreground/60"> · est. installed {money(price.low)} – {money(price.high)}</span>
              </p>
              {ad.note && <p className="mt-1 text-xs text-foreground/55">{ad.note}</p>}
              <button
                type="button"
                onClick={() => onQuote({ model, size: ad.size, price })}
                className="mt-3 min-h-11 rounded-md bg-primary px-4 py-3 text-xs font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Quote {model.name}
              </button>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

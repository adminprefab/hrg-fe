import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionLabel from "@/components/shared/SectionLabel";
import PoolCollection from "@/components/pools/PoolCollection";
import PoolQuoteForm from "@/components/pools/PoolQuoteForm";
import AcrylicPools from "@/components/pools/AcrylicPools";
import { money } from "@/lib/projectPricing";
import {
  MOSAIC_FINISHES,
  POOL_HERO,
  POOL_INCLUDED,
  POOL_INSTALL,
  POOL_INSTALLED,
  POOL_MODELS,
  POOL_PRICING,
  POOL_SPECS,
  POOL_STEPS,
  POOL_VIDEO,
  poolPrice,
  promoActive,
} from "@/lib/poolCatalogue";

const fromPrice = Math.min(...POOL_MODELS.flatMap((m) => m.sizes.map((sz) => poolPrice(m, sz).pkg)));

// Pools: the modular fiberglass collection first (models, prices, quote), then the acrylic range.
export default function Pool() {
  const [selected, setSelected] = useState(null);
  const quoteRef = useRef(null);
  const promo = POOL_PRICING.promo;

  const quote = (choice) => {
    setSelected(choice);
    setTimeout(() => quoteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  };

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="Pools"
        label="The HRG Pool Collection"
        title={<>Resort pools, <em className="not-italic font-bold">delivered in sections</em></>}
        subtitle={`16 modular fiberglass pools, tiled in glass mosaic at the factory and joined on your property in days. Pool packages from ${money(fromPrice)}.`}
        image={POOL_HERO}
      />

      {promoActive() && (
        <div className="bg-primary text-primary-foreground">
          <p className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-sm font-semibold text-center">
            {promo.name}: {promo.percentOff}% off every pool package through {promo.endsLabel}. {promo.terms}.
          </p>
        </div>
      )}

      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 scroll-mt-20">
        <SectionLabel>The collection</SectionLabel>
        <h2 className="font-heading text-3xl md:text-4xl font-bold">16 models. 3 sizes each.</h2>
        <p className="mt-2 max-w-2xl text-foreground/65">Pick a size to see the pool package and an estimated installed range.</p>
        <div className="mt-8">
          <PoolCollection onQuote={quote} />
        </div>
      </section>

      <section className="bg-secondary/40 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Built in sections. Joined as one.</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {POOL_STEPS.map((s, i) => (
              <li key={s.title} className="rounded-lg border border-border bg-card p-5">
                <span className="font-heading text-sm font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-1 font-heading font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-foreground/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">Installed by HRG</h2>
        <div className="mt-6 grid gap-4 grid-cols-2 lg:grid-cols-5">
          <video
            className="col-span-2 lg:col-span-1 w-full aspect-[3/4] rounded-lg object-cover bg-brand-dark"
            src={POOL_VIDEO.src}
            poster={POOL_VIDEO.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            aria-label="Pool and spa with fountain wall"
          />
          {POOL_INSTALLED.map((p) => (
            <figure key={p.img} className="rounded-lg overflow-hidden border border-border bg-card">
              <img src={p.img} alt={p.caption} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover" />
              <figcaption className="px-3 py-2 text-xs text-foreground/65">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 md:pb-20 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-bold">In the pool package</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {POOL_INCLUDED.map((t) => (
              <li key={t} className="flex gap-2">
                <Check className="mt-0.5 w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-bold">In the installed estimate</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75">
            {POOL_INSTALL.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-foreground/55">Permits, fencing, heaters and decking are quoted separately.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-bold">Glass mosaic, set at the factory</h3>
          <p className="mt-2 text-sm text-foreground/65">Included in every package, in your palette.</p>
          <ul className="mt-4 grid grid-cols-3 gap-3">
            {MOSAIC_FINISHES.map((f) => (
              <li key={f.name} className="text-xs">
                <span className="grid grid-cols-2 overflow-hidden rounded border border-border">
                  {f.colors.map((c) => (
                    <span key={c} className="h-5" style={{ background: c }} />
                  ))}
                </span>
                <span className="mt-1 block">{f.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 md:pb-20">
        <details className="group rounded-lg border border-border bg-card">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 min-h-14">
            <span>
              <span className="block font-heading text-lg font-bold">Specifications and engineering</span>
              <span className="block text-sm text-foreground/60">One construction standard across the collection</span>
            </span>
            <span className="text-primary text-2xl leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
          </summary>
          <dl className="grid gap-x-8 gap-y-3 px-5 pb-5 sm:grid-cols-2 text-sm">
            {POOL_SPECS.map(([k, v]) => (
              <div key={k}>
                <dt className="font-semibold">{k}</dt>
                <dd className="text-foreground/70">{v}</dd>
              </div>
            ))}
          </dl>
        </details>
      </section>

      <section ref={quoteRef} id="quote" className="bg-secondary/40 py-14 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Get your pool quote</h2>
          <p className="mt-2 mb-6 text-foreground/65">
            We'll confirm your price, installation range and delivery date. Want a pool house too?{" "}
            <Link to="/collection/prefab-design-build" className="font-semibold text-primary hover:underline">
              See the prefab builds
            </Link>
            .
          </p>
          <PoolQuoteForm selected={selected} onClear={() => setSelected(null)} />
        </div>
      </section>

      <AcrylicPools />
    </div>
  );
}

import React from "react";
import { Phone } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import CTASection from "@/components/shared/CTASection";
import {
  ADU_PHOTOS,
  BEFORE_AFTER,
  CALL_REFERENCES,
  ESTATE_PHOTOS,
  LUXURY_PROJECTS,
  PORTFOLIO,
  STATS,
} from "@/lib/references";

function PhotoGrid({ photos }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((p) => (
        <figure key={p.img} className="rounded-lg overflow-hidden bg-card border border-border">
          <img src={p.img} alt={p.caption} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
          <figcaption className="px-4 py-3 text-sm text-foreground/70">{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

// Our work and the people who can vouch for it: photos first, few words, ends in the form.
export default function References() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        breadcrumb="References"
        label="Our work"
        title={<>Built by <em className="not-italic font-bold">one team</em></>}
        subtitle="Design, permits, factory and install under one roof."
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <figure>
          <img src={BEFORE_AFTER.img} alt={BEFORE_AFTER.alt} className="w-full rounded-lg" />
          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span className="font-heading font-bold">Garage to ADU · {BEFORE_AFTER.project}</span>
            <span className="text-sm text-foreground/60">{BEFORE_AFTER.address}</span>
          </figcaption>
          <p className="mt-2 text-foreground/70">{BEFORE_AFTER.caption}</p>
        </figure>

        <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-5 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-heading text-3xl font-bold text-primary">{s.stat}</dd>
              <dd className="mt-1 text-sm text-foreground/65">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-secondary/40 py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">People you can call</h2>
          <p className="mt-1 text-foreground/65">Both have run work for us. Call them before you sign anything.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {CALL_REFERENCES.map((r) => (
              <div key={r.name} className="rounded-lg border border-border bg-card p-5">
                <div className="font-heading text-lg font-bold">{r.name}</div>
                <p className="mt-1 text-sm text-foreground/65">{r.role}</p>
                <a
                  href={`tel:+1${r.phone.replace(/\D/g, "")}`}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  {r.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">ADUs and backyard units</h2>
        <p className="mt-1 mb-6 text-foreground/65">Built off-site, installed on the client's lot.</p>
        <PhotoGrid photos={ADU_PHOTOS} />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 md:pb-20">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">Luxury homes</h2>
        <p className="mt-1 mb-6 text-foreground/65">Ground-up custom homes in Los Angeles, built with our own crews.</p>
        <ul className="grid gap-4 md:grid-cols-3 mb-8">
          {LUXURY_PROJECTS.map((p) => (
            <li key={p.name} className="rounded-lg border border-border bg-card p-5">
              <div className="font-heading font-bold leading-snug">{p.name}</div>
              <div className="mt-1 text-sm text-foreground/60">{p.place}</div>
              <div className="mt-3 text-sm">{p.type}</div>
              <div className="mt-1 text-sm text-foreground/60">
                {p.owner ? `Owner: ${p.owner}` : "Owner reference on request"} · Contractor: James Barry
              </div>
            </li>
          ))}
        </ul>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-foreground/60">Beverly Hills Mediterranean Estate</h3>
        <PhotoGrid photos={ESTATE_PHOTOS} />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 md:pb-20">
        <details className="group rounded-lg border border-border bg-card">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 min-h-14">
            <span>
              <span className="block font-heading text-lg font-bold">Multifamily and residential portfolio</span>
              <span className="block text-sm text-foreground/60">16 owned and co-owned properties in NY, FL, PA and NJ</span>
            </span>
            <span className="text-primary text-2xl leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
          </summary>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-5 pb-5">
            {PORTFOLIO.map((s) => (
              <div key={s.state}>
                <div className="font-semibold">{s.state}</div>
                <div className="text-xs text-foreground/55 mb-2">{s.area}</div>
                <ul className="space-y-1 text-sm text-foreground/75">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </section>

      <CTASection label="Your project" title="Ready to see what fits your lot?" />
    </div>
  );
}

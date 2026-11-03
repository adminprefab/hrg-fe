import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ADU_PHOTOS, STATS } from "@/lib/references";

// A short look at HRG's finished work for the catalogue pages, linking to /references.
export default function ReferencesStrip({ className = "" }) {
  return (
    <section className={className} aria-labelledby="references-strip">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="references-strip" className="font-heading text-2xl md:text-3xl font-bold">
            Homes we've built
          </h2>
          <p className="mt-1 text-foreground/65">
            {STATS[0].stat} referenced projects · {STATS[1].stat} units · references you can call.
          </p>
        </div>
        <Link
          to="/references"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary hover:underline"
        >
          See our work
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-5 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-4">
        {ADU_PHOTOS.slice(0, 4).map((p) => (
          <Link key={p.img} to="/references" className="shrink-0 w-[70%] sm:w-auto rounded-lg overflow-hidden border border-border bg-card">
            <img src={p.img} alt={p.caption} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
          </Link>
        ))}
      </div>
    </section>
  );
}

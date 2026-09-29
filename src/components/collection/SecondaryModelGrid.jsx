import React from "react";
import { Link } from "react-router-dom";

function metaLine(m) {
  if (m.meta) return m.meta.join(" · ");
  const parts = [];
  if (m.sqft || m.area) parts.push(m.sqft || m.area);
  if (m.length) parts.push(m.length);
  if (m.beds) parts.push(`${m.beds} Bed · ${m.baths} Bath`);
  return parts.join(" · ");
}

export default function SecondaryModelGrid({ models, collectionSlug }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {models.map((m) => (
        <Link
          key={m.slug}
          to={`/collection/${collectionSlug}/${m.slug}`}
          className="group bg-card border border-border rounded-md overflow-hidden hover:border-primary/50 transition-colors"
        >
          <div className="h-28 overflow-hidden bg-secondary/40">
            <img
              src={m.img}
              alt={m.name}
              className={`w-full h-full ${m.fit === "contain" ? "object-contain bg-card" : "object-cover"} opacity-90 group-hover:opacity-100 transition-opacity`}
            />
          </div>
          <div className="p-3">
            {m.id && (
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{m.id}</div>
            )}
            <div className="text-sm font-semibold text-foreground leading-tight">{m.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{metaLine(m)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
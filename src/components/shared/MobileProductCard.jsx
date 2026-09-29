import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BedDouble, Bath } from "lucide-react";
import { cn } from "@/lib/utils";

// Mobile-only product card following the 9:16 reference design:
// tall image, big bold title, large brown area, clear bed/bath row,
// and an oversized dimensions box for easy reading on phones.
export default function MobileProductCard({
  image,
  imageAlt = "",
  imageFit = "cover",
  onImageClick,
  title,
  subtitle,
  area,
  areaMetric,
  beds,
  baths,
  dimensions,
  dimensionsMetric,
  price,
  ctaLabel,
  ctaTo,
  recommended = false,
}) {
  return (
    <article
      className={cn(
        "relative bg-card rounded-lg border flex flex-col overflow-hidden shadow-sm",
        recommended && "border-2 border-primary"
      )}
    >
      {recommended && (
        <span className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md">
          Recommended
        </span>
      )}
      <div className="relative aspect-[4/5] bg-white">
        {onImageClick ? (
          <button
            type="button"
            onClick={onImageClick}
            className="absolute inset-0 cursor-zoom-in"
            aria-label={`View ${imageAlt || "model"} larger`}
          >
            <img
              src={image}
              alt={imageAlt}
              className={cn(
                "absolute inset-0 w-full h-full",
                imageFit === "contain" ? "object-contain p-4" : "object-cover"
              )}
            />
          </button>
        ) : (
          <img
            src={image}
            alt={imageAlt}
            className={cn(
              "absolute inset-0 w-full h-full",
              imageFit === "contain" ? "object-contain p-4" : "object-cover"
            )}
          />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading text-3xl font-bold leading-none text-foreground">{title}</h3>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-heading text-3xl font-bold text-primary leading-none">{area}</span>
          {areaMetric && <span className="text-base text-foreground/50">{areaMetric}</span>}
        </div>
        {subtitle && <p className="mt-2 text-lg font-semibold text-foreground">{subtitle}</p>}
        {price && <p className="mt-1.5 text-sm font-semibold text-foreground/60">{price}</p>}
        <div className="mt-4 h-1 rounded-full bg-primary" />
        <div className="mt-4 flex items-center justify-between text-base font-semibold text-foreground">
          <span className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-foreground/60" />
            {beds}
          </span>
          <span className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-foreground/60" />
            {baths}
          </span>
        </div>
        {dimensions && (
          <div className="mt-5 bg-muted rounded-md border-l-4 border-primary px-5 py-4">
            <span className="block text-xs font-bold uppercase tracking-[0.15em] text-foreground/50">
              Overall Dimensions
            </span>
            <span className="block mt-1.5 font-heading text-2xl font-bold leading-tight text-foreground">
              {dimensions}
              {dimensionsMetric && (
                <span className="text-base font-semibold text-foreground/50"> ({dimensionsMetric})</span>
              )}
            </span>
          </div>
        )}
        {ctaTo && (
          <Link
            to={ctaTo}
            className="mt-5 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-md font-semibold uppercase tracking-wide text-sm hover:bg-primary/90 transition-colors"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
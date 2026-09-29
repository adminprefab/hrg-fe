import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { getBuild } from "@/lib/collectionData";
import BuildHero from "@/components/collection/BuildHero";
import BuildKeyInfo from "@/components/collection/BuildKeyInfo";
import BuildIncluded from "@/components/collection/BuildIncluded";
import PropertyFitCTA from "@/components/collection/PropertyFitCTA";

export default function BuildDetail() {
  const { collectionSlug, modelSlug } = useParams();
  const build = getBuild(collectionSlug, modelSlug);

  if (!build) {
    return <Navigate to={`/collection/${collectionSlug || ""}`} replace />;
  }

  const { collection, model } = build;
  const floorPlan = collection.floorPlanFor(model);

  return (
    <div className="bg-background min-h-screen">
      <BuildHero
        collection={collection}
        model={model}
        meta={collection.metaFor(model)}
        price={collection.priceFor(model)}
        blurb={model.blurb || collection.tagline}
        hasFloorPlan={Boolean(floorPlan)}
        fit={collection.heroFit}
      />

      <BuildKeyInfo specs={collection.specsFor(model)} floorPlan={floorPlan} />

      <BuildIncluded
        included={collection.included}
        customization={collection.customization}
        note={collection.customizationNote}
      />

      <PropertyFitCTA
        title="Will this fit my property?"
        copy="Tell us about your property and we'll help determine whether this configuration works for your space and project requirements."
        buttonText="Check My Property"
      />
    </div>
  );
}
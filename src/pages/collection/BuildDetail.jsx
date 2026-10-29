import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { buildPath, getBuild } from "@/lib/collectionData";
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
  const buildTo = collection.buildable ? buildPath(model.slug) : null;

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
        buildTo={buildTo}
      />

      <BuildKeyInfo specs={collection.specsFor(model)} floorPlan={floorPlan} />

      {/* Prefab models go straight from the specs to choosing finishes; the long "included"
          and "customization" lists stay for the other collections. */}
      {!buildTo && (
        <BuildIncluded
          included={collection.included}
          customization={collection.customization}
          note={collection.customizationNote}
        />
      )}

      {buildTo ? (
        <PropertyFitCTA title="Pick your finishes. See your price." buttonText="Build yours" to={buildTo} />
      ) : (
        <PropertyFitCTA
          title="Will this fit my property?"
          copy="Tell us about your property and we'll help determine whether this configuration works for your space and project requirements."
          buttonText="Check My Property"
        />
      )}
    </div>
  );
}
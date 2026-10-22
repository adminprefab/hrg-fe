import React from "react";
import { useLocation } from "react-router-dom";
import { presetFromSearch } from "@/lib/buildPreset";
import ProjectBuilder from "@/components/projectbuilder/ProjectBuilder";
import BuilderIntro from "@/components/projectbuilder/BuilderIntro";

export default function SeeWhatFits() {
  // A model picked elsewhere (?model=hrg-103 or ?model=500) carries its size and finishes in.
  const { search } = useLocation();
  const preset = presetFromSearch(search);
  return (
    <div className="bg-config-page min-h-screen">
      {/* A carried-in model goes straight to the form. */}
      {!preset && <BuilderIntro />}
      <ProjectBuilder key={search} preset={preset} />
    </div>
  );
}
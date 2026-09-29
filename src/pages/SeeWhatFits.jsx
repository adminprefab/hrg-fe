import React from "react";
import ProjectBuilder from "@/components/projectbuilder/ProjectBuilder";
import BuilderIntro from "@/components/projectbuilder/BuilderIntro";

export default function SeeWhatFits() {
  return (
    <div className="bg-config-page min-h-screen">
      <BuilderIntro />
      <ProjectBuilder />
    </div>
  );
}
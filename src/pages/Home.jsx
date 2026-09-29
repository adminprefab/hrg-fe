import React from "react";
import PBHero from "@/components/projectbuilderpage/PBHero";
import PBSectionNav from "@/components/projectbuilderpage/PBSectionNav";
import PBWhatWeHandle from "@/components/projectbuilderpage/PBWhatWeHandle";
import PBBuilderFlow from "@/components/projectbuilderpage/PBBuilderFlow";
import PBHowItWorks from "@/components/projectbuilderpage/PBHowItWorks";

export default function Home() {
  return (
    <div className="bg-background">
      <PBHero />
      <PBSectionNav />
      <PBWhatWeHandle />
      <PBBuilderFlow />
      <PBHowItWorks />
    </div>
  );
}
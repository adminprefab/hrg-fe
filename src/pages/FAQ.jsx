import React from "react";
import PageHero from "@/components/shared/PageHero";
import FaqSection from "@/components/home/FaqSection";
export default function FAQ() {
  return <><PageHero image={null} breadcrumb="FAQs" label="Prefab ADU questions" title="Plan your project with clear answers." subtitle="Materials pricing, project scope, contractors, permits and what fits on your property." /><FaqSection full /></>;
}

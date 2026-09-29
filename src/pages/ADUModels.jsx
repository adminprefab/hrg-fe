import React from "react";
import PrototypeSection from "@/components/home/PrototypeSection";
import NeedSomethingDifferent from "@/components/home/NeedSomethingDifferent";
import CTASection from "@/components/shared/CTASection";

export default function ADUModels() {
  return (
    <>
      <PrototypeSection />
      <NeedSomethingDifferent />
      <CTASection
        label="Still Deciding?"
        title={<>Point at a plan. <em className="not-italic font-bold">We'll take it from there.</em></>}
      />
    </>
  );
}
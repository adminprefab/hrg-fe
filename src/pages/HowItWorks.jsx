import React from "react";
import PageHero from "@/components/shared/PageHero";
import Process from "@/components/home/Process";
import CTASection from "@/components/shared/CTASection";

export default function HowItWorks() {
  return (
    <>
      <PageHero
        breadcrumb="Our Process"
        label="The HRG Process"
        title={<>From first call to <em className="not-italic font-bold">move-in</em></>}
        subtitle="Your ADU is designed, permitted and built off-site in parallel, so installation on your property takes days, not months."
        image="https://media.base44.com/images/public/6a3d99160f311f943d2b9488/64cd68929_modular-building-under-construction-in-large-indus-2026-03-18-21-33-00-utc.jpg"
      />
      <Process />
      <CTASection
        label="Get Started"
        title={<>See what fits <em className="not-italic font-bold">your property</em></>}
      />
    </>
  );
}
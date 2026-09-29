import React from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";

const sections = [
  {
    heading: "Website Use",
    body: [
      'By accessing or using HRGPrefab.com, you agree to these Terms and Conditions.',
    ],
  },
  {
    heading: "Preliminary Estimates",
    intro: "Any pricing, estimates, renderings, or information provided through this website are preliminary and non-binding.",
    items: [
      "Site evaluation",
      "Engineering",
      "Local building requirements",
      "Permitting",
      "Utility requirements",
      "Final project scope",
    ],
    itemLabel: "Final pricing depends upon:",
  },
  {
    heading: "Permitting",
    body: [
      'Permit approval, zoning compliance, HOA approval, and governmental approvals are determined solely by the applicable authority.',
      'HRG Prefab cannot guarantee permit approval or project eligibility.',
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      'All website content, photographs, renderings, floor plans, graphics, logos, and written materials are the property of HRG Prefab unless otherwise noted and may not be copied or reproduced without written permission.',
    ],
  },
  {
    heading: "Communications Consent",
    body: [
      'By submitting your information through this website, you authorize HRG Prefab to contact you by phone, email, and SMS regarding your inquiry.',
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      'HRG Prefab shall not be liable for indirect, incidental, consequential, or special damages arising from use of this website or reliance upon preliminary information provided herein.',
    ],
  },
  {
    heading: "Governing Law",
    body: [
      'These Terms shall be governed by the laws of the State of California.',
    ],
  },
];

export default function TermsConditions() {
  return (
    <>
      <PageHero
        breadcrumb="Terms & Conditions"
        label="Legal"
        title={<>Terms &amp; <em className="not-italic font-bold">Conditions</em></>}
        subtitle="The terms and conditions for using our services."
      />
      <section className="py-24 bg-brand-cream">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">
                  {section.heading}
                </h2>
                {section.intro && (
                  <p className="text-muted-foreground mb-3">{section.intro}</p>
                )}
                {section.itemLabel && (
                  <p className="text-muted-foreground mb-3">{section.itemLabel}</p>
                )}
                {section.items && (
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.body && (
                  <div className="space-y-3">
                    {section.body.map((para) => (
                      <p key={para} className="text-muted-foreground leading-relaxed">{para}</p>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
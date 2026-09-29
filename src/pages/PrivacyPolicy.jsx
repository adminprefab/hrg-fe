import React from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";

const sections = [
  {
    heading: "Information We Collect",
    intro: "We may collect:",
    items: [
      "Name",
      "Email address",
      "Phone number",
      "Property address",
      "ZIP code",
      "Project details",
      "Device information",
      "Browser information",
      "IP address",
      "Website analytics",
    ],
  },
  {
    heading: "How We Use Your Information",
    intro: "We use your information to:",
    items: [
      "Respond to inquiries",
      "Schedule consultations",
      "Prepare preliminary project estimates",
      "Improve our website and services",
      "Send project updates",
      "Communicate regarding your inquiry",
      "Comply with legal obligations",
    ],
  },
  {
    heading: "SMS & Email Communications",
    body: [
      'By submitting a form through HRGPrefab.com, you consent to receive phone calls, emails, and SMS messages regarding your project inquiry.',
      'Message and data rates may apply.',
      'You may opt out of SMS communications at any time by replying STOP.',
      'You may unsubscribe from marketing emails using the unsubscribe link included within those emails.',
    ],
  },
  {
    heading: "Cookies & Analytics",
    body: [
      'Our website may utilize cookies and tracking technologies including Google Analytics, Google Ads, Meta Pixel, and similar services to improve website performance and advertising effectiveness.',
    ],
  },
  {
    heading: "Third-Party Providers",
    body: [
      'We may share information with trusted service providers who assist in operating our business, including CRM systems, communication platforms, payment processors, analytics providers, and marketing partners.',
      'We do not sell your personal information.',
    ],
  },
  {
    heading: "Data Security",
    body: [
      'We use commercially reasonable safeguards to protect the information you submit. However, no method of electronic transmission or storage is completely secure.',
    ],
  },
  {
    heading: "California Privacy Rights",
    body: [
      'California residents may request access to, correction of, or deletion of personal information in accordance with applicable California privacy laws.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero
        breadcrumb="Privacy Policy"
        label="Legal"
        title={<>Privacy <em className="not-italic font-bold">Policy</em></>}
        subtitle="How we collect, use, and protect your information."
      />
      <section className="py-24 bg-brand-cream">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-2">Effective Date: July 2026</p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              HRG Prefab ("Company," "we," "our," or "us") values your privacy and is committed to protecting your personal information.
            </p>
          </motion.div>

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
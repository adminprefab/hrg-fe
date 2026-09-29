import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import CTASection from "@/components/shared/CTASection";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

const stats = [
  { value: "$0", label: "Credit impact to check your options" },
  { value: "7.99%", label: "APR starting rate" },
  { value: "550", label: "Minimum FICO considered" },
  { value: "$5M", label: "Funding up to, from $1,000" },
];

const steps = [
  { num: "1", title: "Choose", desc: "Select the option that fits your project and funding amount." },
  { num: "2", title: "Contact", desc: "Request an HRG link or contact the financing partner directly." },
  { num: "3", title: "Describe", desc: "Name HRG Prefab. Share the project location, scope and budget." },
];

const options = [
  {
    tag: "No credit impact",
    name: "Acorn Finance",
    subtitle: "Online lending marketplace",
    rows: [
      { label: "Amount", value: "$1,000 – $100,000" },
      { label: "Best for", value: "Home improvement financing" },
      { label: "Terms", value: "Fixed rate · up to 240 months" },
      { label: "Credit", value: "Soft pull · no credit impact" },
    ],
    next: "Next step: ask HRG for your pre-qualification link",
  },
  {
    tag: "FICO as low as 550",
    name: "Hearth",
    subtitle: "Contractor-issued financing through HRG",
    rows: [
      { label: "Amount", value: "$1,000 – $250,000" },
      { label: "Best for", value: "Improvement and construction costs" },
      { label: "Terms", value: "APR from 7.99% · 2 – 12 years" },
      { label: "Credit", value: "Soft pull · FICO as low as 550" },
    ],
    next: "Next step: ask HRG for your pre-qualification link",
  },
  {
    tag: "Uses your home equity",
    name: "Charles Edington",
    subtitle: "ADU Finance Guy | Loanstar Technologies",
    rows: [
      { label: "Amount", value: "Based on equity and future value" },
      { label: "Best for", value: "ADU construction and related work" },
      { label: "Products", value: "HELOC, equity, renovation and equity agreements" },
      { label: "Terms", value: "Fixed or variable · 5 – 30 years" },
    ],
    next: "Contact: NMLS 272063 · (801) 819-3125",
  },
  {
    tag: "Larger projects",
    name: "Brent Gong",
    subtitle: "On Point Funding Corp | onpointfundingcorp.com",
    rows: [
      { label: "Amount", value: "Up to $5,000,000" },
      { label: "Best for", value: "Construction and renovation loans" },
      { label: "Terms", value: "Fixed or adjustable by program" },
      { label: "Credit", value: "Full application and pre-qualification" },
    ],
    next: "Contact: NMLS 2738325 · (818) 585-7442",
  },
];

const documents = [
  "W-2 forms from the two most recent tax years",
  "Two most recent pay stubs",
  "Most recent first and second mortgage statements, if applicable",
  "Homeowners insurance declaration page",
  "Two most recent bank statements",
  "Attorney letter for any timeshare obligation, if applicable",
];

export default function Financing() {
  return (
    <>
      <PageHero
        breadcrumb="Financing"
        label="Project Support · Financing · Built the Smart Way"
        title={<>Financing made <em className="not-italic font-bold">simple</em></>}
        subtitle="Get pre-approved in minutes. Move forward with confidence."
        image="https://media.base44.com/images/public/6a3d99160f311f943d2b9488/484b8aa8a_prefabricated-container-houses-in-building-under-c-2026-03-25-00-29-35-utc.jpg"
      />

      {/* Stats */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <p className="font-heading text-3xl font-normal text-primary mb-1">{s.value}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Start Here</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-foreground text-balance">
              Three easy steps to <em className="not-italic font-bold">move your project forward</em>
            </AnimatedHeading>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-secondary rounded-lg p-8"
              >
                <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mb-4">
                  {s.num}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 border border-border rounded-lg p-6 flex items-start gap-3"
          >
            <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/70 leading-relaxed">
              Need help aligning financing with your scope? Call HRG at{" "}
              <span className="font-semibold text-foreground">213.216.4416</span> and ask for Jason or Michael, we'll walk you through it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Options */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Compare Your Options</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-foreground text-balance">
              Four ways to finance <em className="not-italic font-bold">your HRG Prefab project</em>
            </AnimatedHeading>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {options.map((o, i) => (
              <motion.div
                key={o.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-8"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/40">
                    Option {i + 1}
                  </span>
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {o.tag}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-1">{o.name}</h3>
                <p className="text-sm text-foreground/50 mb-5">{o.subtitle}</p>
                <div className="space-y-2.5 mb-5">
                  {o.rows.map((r) => (
                    <div key={r.label} className="flex gap-3 text-sm">
                      <span className="w-20 flex-shrink-0 uppercase text-xs font-semibold text-foreground/40 pt-0.5">
                        {r.label}
                      </span>
                      <span className="text-foreground/80">{r.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-primary border-t border-border pt-4">{o.next}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents for Option 4 */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionLabel>Using Option 4?</SectionLabel>
          <AnimatedHeading className="font-heading text-2xl font-normal text-balance mb-8">
            Prepare these documents
          </AnimatedHeading>
          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-3 text-sm text-white/80 leading-relaxed"
              >
                <span className="w-4 h-4 border border-white/40 rounded-sm flex-shrink-0 mt-0.5" />
                {d}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-card">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs text-foreground/40 leading-relaxed text-center">
            Acorn Finance, Hearth, Charles Edington / ADU Finance Guy (Loanstar Technologies), and On Point Funding Corp are
            HRG Prefab financing partners and independent third-party providers. Rates, terms, approvals and funding
            timelines are estimates as of September 2026 and are subject to change, creditworthiness and provider
            qualification. HRG Prefab does not originate loans, broker mortgages or guarantee financing terms.
          </p>
        </div>
      </section>

      <CTASection
        label="Next Step"
        title={<>See what fits <em className="not-italic font-bold">your budget</em></>}
      />
    </>
  );
}
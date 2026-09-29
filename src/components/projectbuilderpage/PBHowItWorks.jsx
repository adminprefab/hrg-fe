import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

const CRANE_IMG = "/assets/crane.webp";

const STEPS = [
  {
    num: "01",
    title: "Project review",
    desc: "We review your property, jurisdiction and Expected Project Budget with you.",
  },
  {
    num: "02",
    title: "Design + permit",
    desc: "Feasibility, architecture, engineering and permit coordination.",
  },
  {
    num: "03",
    title: "Materials + site work",
    desc: "Materials are produced and delivered while your site is prepared.",
  },
  {
    num: "04",
    title: "Assembly + inspection",
    desc: "On-site assembly, construction coordination and applicable inspections.",
  },
];

export default function PBHowItWorks() {
  return (
    <section id="how" className="py-20 md:py-24 bg-background overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="rounded-lg overflow-hidden"
        >
          <img
            src={CRANE_IMG}
            alt="Prefabricated building sections being set on site by crane"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div>
          <SectionLabel>How it works</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl md:text-4xl font-normal text-balance">
            Built off-site. <em className="font-serif italic">Assembled on yours.</em>
          </AnimatedHeading>
          <p className="mt-4 text-foreground/60 leading-relaxed">
            HRG pairs prefabricated building materials with a conventional on-site assembly process,
            so your structure meets local code and fits your property.
          </p>

          <div className="mt-8 space-y-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <span className="font-heading text-3xl font-bold text-primary/30 leading-none">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <a
            href="#build"
            className="mt-10 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
          >
            Build my project
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
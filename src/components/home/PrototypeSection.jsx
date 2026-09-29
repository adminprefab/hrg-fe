import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROTOTYPES } from "@/lib/prototypes";
import PrototypeCard from "@/components/adu/PrototypeCard";
import MobileProductCard from "@/components/shared/MobileProductCard";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

const guide = [
  { need: "Smaller property or simpler project", answer: "500 SF" },
  { need: "More living space", answer: "800 SF" },
  { need: "Not sure", answer: "Let HRG recommend" },
];

export default function PrototypeSection() {
  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <SectionLabel>Start Here</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl md:text-4xl font-normal text-foreground text-balance">
            Prototype: 2 most popular plans. <em className="not-italic font-bold">Fully customizable.</em>
          </AnimatedHeading>
          <div className="mt-8 max-w-3xl mx-auto grid sm:grid-cols-3 gap-3">
            {guide.map((g) => (
              <div key={g.need} className="bg-card border border-border rounded-md px-4 py-3 text-sm">
                <span className="text-foreground/60">{g.need}:</span>{" "}
                <span className="font-semibold text-primary">{g.answer}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile: big, readable 9:16 style product cards */}
        <div className="md:hidden space-y-6">
          {PROTOTYPES.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <MobileProductCard
                image={m.image}
                imageAlt={`${m.name}: 3D concept layout`}
                imageFit="contain"
                title={m.name}
                area={m.sqft.replace(" sq ft", " ft²")}
                areaMetric={m.areaMetric}
                beds={m.beds}
                baths={m.baths}
                dimensions={m.dims}
                dimensionsMetric={m.dimsMetric}
                ctaLabel="Check This Model for My Property"
                ctaTo={`/see-what-fits?model=${m.id}`}
                recommended={m.id === "800"}
              />
            </motion.div>
          ))}
          <Link
            to="/collection"
            className="flex items-center justify-between gap-4 bg-card rounded-lg border border-border p-5"
          >
            <div>
              <h3 className="font-heading text-lg font-bold">Explore the Full Collection</h3>
              <p className="mt-1 text-sm text-foreground/60">
                Prefab homes, cabins, container homes, outdoor kitchens and pools.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary shrink-0" />
          </Link>
        </div>

        {/* Desktop: original card grid */}
        <div className="hidden md:grid lg:grid-cols-3 gap-8 items-start">
          {PROTOTYPES.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <PrototypeCard model={m} recommended={m.id === "800"} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: PROTOTYPES.length * 0.12 }}
          >
            <Link
              to="/collection"
              className="group flex flex-col h-full bg-card rounded-lg border border-border shadow-sm hover:border-primary transition-colors overflow-hidden"
            >
              <div className="h-56 overflow-hidden border-b border-border">
                <img
                  src="https://media.base44.com/images/public/6aa6b441ec9ba0e9a14504fa/3910fe02b_00.png"
                  alt="HRG prefab home with pool"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 min-h-[180px]">
                <h3 className="font-heading text-xl md:text-2xl font-bold">Explore the Full Collection</h3>
                <p className="mt-3 text-sm text-foreground/60 leading-relaxed max-w-xs">
                  Prefab homes, cabins, container homes, outdoor kitchens and pools. Browse every HRG design in one place.
                </p>
              </div>
              <div className="p-6 pt-0">
                <span className="inline-flex items-center justify-center gap-2 w-full border border-border rounded-md px-6 py-3.5 font-semibold uppercase tracking-wide text-sm group-hover:border-primary group-hover:text-primary transition-colors">
                  View the Collection
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
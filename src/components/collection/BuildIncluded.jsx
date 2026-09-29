import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

export default function BuildIncluded({ included, customization, note }) {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <SectionLabel>What's Included</SectionLabel>
          <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
            Included in Your <em className="not-italic font-bold">Build</em>
          </AnimatedHeading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {included.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.07 }}
              className="bg-card border border-border rounded-lg p-6 flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <div className="font-heading font-bold text-foreground mb-1">{item.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <SectionLabel>Customization</SectionLabel>
            <AnimatedHeading className="font-heading text-3xl font-normal text-foreground">
              A Starting Point, <em className="not-italic font-bold">Adapted to You</em>
            </AnimatedHeading>
          </div>
          <p className="text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
            {note}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customization.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="font-heading font-bold text-foreground mb-2">{c.name}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
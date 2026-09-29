import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

export default function CollectionCTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center">
          <SectionLabel>Our Collection</SectionLabel>
        </div>
        <AnimatedHeading className="font-heading text-3xl font-normal text-balance mt-2">
          Explore our full range of <em className="not-italic font-bold">prefab structures</em>
        </AnimatedHeading>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Browse prefab homes, apple cabins, expandable containers, outdoor kitchens, and acrylic pools, all engineered off-site and built to last.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8"
        >
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
          >
            View the Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
import React from "react";
import { motion } from "framer-motion";

export default function SectionLabel({ children, light = false }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-3 ${
        light ? "text-primary" : "text-primary"
      }`}
    >
      {children}
    </motion.span>
  );
}
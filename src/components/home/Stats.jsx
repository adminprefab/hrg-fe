import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "120+", label: "Units Installed" },
  { value: "6-10", label: "Weeks Avg. Install" },
  { value: "14", label: "Years Building" },
];

export default function Stats() {
  return (
    <section className="bg-brand-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <p className="font-heading text-5xl md:text-6xl font-bold text-primary mb-2">{s.value}</p>
            <p className="text-sm uppercase tracking-[0.15em] text-white/60">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
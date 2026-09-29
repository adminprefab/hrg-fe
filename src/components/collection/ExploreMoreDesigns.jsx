import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function ExploreMoreDesigns({ children, note }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="border-t border-border py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-muted-foreground leading-relaxed">
          {note || "Want more choice before you decide? Every HRG design remains available."}
        </p>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-5 inline-flex items-center gap-2 border border-border bg-card text-foreground px-6 py-3 rounded-md text-sm font-semibold uppercase tracking-wide hover:border-primary/50 transition-colors"
        >
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {open ? "Show fewer designs" : "Explore More Designs"}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 pt-12">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
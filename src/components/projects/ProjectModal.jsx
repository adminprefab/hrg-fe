import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey, project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-card rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:w-1/2 h-64 md:h-auto flex-shrink-0">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-10 overflow-y-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-foreground">
                {project.title}
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="border-t border-border pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50 mb-4">
                  Project Details
                </h3>
                <div className="space-y-3">
                  {project.tags.map((tag, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                      <span className="text-sm font-semibold text-foreground/80 sm:w-32 flex-shrink-0">
                        {tag.label}
                      </span>
                      <span className="text-sm text-foreground/60">{tag.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
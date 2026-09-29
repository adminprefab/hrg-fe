import React from "react";

export const configInputClass =
  "w-full px-4 py-3 rounded-md border border-config-field bg-card text-sm focus:outline-none focus:ring-2 focus:ring-config-blue/40 focus:border-config-blue transition-all placeholder:text-foreground/40";

export const configLabelClass = "block text-sm font-semibold text-foreground/80 mb-2";

export default function Field({ label, children }) {
  return (
    <div>
      <label className={configLabelClass}>{label}</label>
      {children}
    </div>
  );
}
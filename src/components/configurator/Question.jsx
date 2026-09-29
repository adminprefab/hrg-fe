import React from "react";

export default function Question({ children, hint }) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-semibold text-foreground/80">{children}</h3>
      {hint && <p className="text-xs text-foreground/50 mt-1">{hint}</p>}
    </div>
  );
}
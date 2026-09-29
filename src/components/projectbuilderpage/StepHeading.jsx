import React from "react";

export default function StepHeading({ num, title }) {
  const isNumber = /^\d+$/.test(num);
  return (
    <div>
      {isNumber ? (
        <span className="w-9 h-9 rounded-full border border-primary/40 bg-primary/5 text-primary text-sm font-bold flex items-center justify-center">
          {num}
        </span>
      ) : (
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{num}</span>
      )}
      <h3 className="mt-3 font-heading text-2xl md:text-3xl font-bold text-balance">{title}</h3>
    </div>
  );
}
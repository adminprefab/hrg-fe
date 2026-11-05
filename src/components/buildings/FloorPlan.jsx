import React from "react";
import { feet } from "@/lib/buildingCatalogue";

const S = 10; // drawing units per foot
const PAD = 2.4; // feet of margin for the dimension labels

// A concept floor plan drawn from the building's room list, to scale, with overall dimensions.
export default function FloorPlan({ building: b, className = "" }) {
  const W = (b.w + PAD * 2) * S;
  const H = (b.d + PAD * 2) * S;
  const x0 = PAD * S;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`${b.name} floor plan, ${feet(b.w)} by ${feet(b.d)}`}
      className={className}
    >
      {b.plan.map(([x, y, w, h, label]) => (
        <g key={`${x}-${y}`}>
          <rect
            x={(x + PAD) * S}
            y={(y + PAD) * S}
            width={w * S}
            height={h * S}
            className="fill-card stroke-foreground/70"
            strokeWidth="1.6"
          />
          <text
            x={(x + PAD + w / 2) * S}
            y={(y + PAD + h / 2) * S}
            fontSize={Math.max(7, Math.min(11, w * 1.1))}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground/80"
          >
            {label}
          </text>
        </g>
      ))}
      <rect x={x0} y={x0} width={b.w * S} height={b.d * S} fill="none" className="stroke-foreground" strokeWidth="4" />
      <text x={x0 + (b.w * S) / 2} y={x0 - 8} fontSize="10" textAnchor="middle" className="fill-foreground/60">
        {feet(b.w)}
      </text>
      <text
        x={x0 - 8}
        y={x0 + (b.d * S) / 2}
        fontSize="10"
        textAnchor="middle"
        className="fill-foreground/60"
        transform={`rotate(-90 ${x0 - 8} ${x0 + (b.d * S) / 2})`}
      >
        {feet(b.d)}
      </text>
    </svg>
  );
}

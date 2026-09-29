import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"];

// Lightweight scheduler UI. The selected slot is saved on the lead record.
export default function BookingCalendar({ onConfirm }) {
  const [day, setDay] = useState(null);
  const [slot, setSlot] = useState("");
  const [saving, setSaving] = useState(false);

  const days = useMemo(() => {
    const out = [];
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (out.length < 8) {
      if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return out;
  }, []);

  const pickDay = (d) => {
    setDay(d);
    setSlot("");
  };

  const confirm = () => {
    const label = `${day.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })} · ${slot}`;
    setSaving(true);
    Promise.resolve(onConfirm(label)).finally(() => setSaving(false));
  };

  return (
    <div className="bg-config-muted border border-config-field rounded-lg p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-3">Choose a day</p>
      <div className="flex flex-wrap gap-2">
        {days.map((d, i) => (
          <button
            key={i}
            type="button"
            onClick={() => pickDay(d)}
            className={cn(
              "px-4 py-2.5 rounded-md border text-sm font-medium transition-all",
              day && day.getTime() === d.getTime()
                ? "border-config-blue bg-config-blue/10 text-foreground"
                : "border-config-field bg-card text-foreground/70 hover:border-config-blue/40"
            )}
          >
            {d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </button>
        ))}
      </div>

      {day && (
        <>
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mt-6 mb-3">Choose a time</p>
          <div className="flex flex-wrap gap-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={cn(
                  "px-4 py-2.5 rounded-md border text-sm font-medium transition-all",
                  slot === s
                    ? "border-config-blue bg-config-blue/10 text-foreground"
                    : "border-config-field bg-card text-foreground/70 hover:border-config-blue/40"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </>
      )}

      <button
        type="button"
        disabled={!day || !slot || saving}
        onClick={confirm}
        className="mt-6 w-full px-8 py-3.5 rounded-md bg-config-navy text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-40"
      >
        {saving ? "Booking..." : "Confirm My Project Call"}
      </button>
    </div>
  );
}
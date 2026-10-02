import React, { useEffect, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import { searchAddresses } from "@/lib/addressSearch";
import StepHeading from "./StepHeading";

const inputClass =
  "w-full px-4 py-3.5 rounded-md border border-border bg-secondary focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40";
const labelClass = "block text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50";

export default function PBStepProperty({ data, setField }) {
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showList, setShowList] = useState(false);
  const skipRef = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (skipRef.current) {
      skipRef.current = false;
      setSuggestions([]);
      setShowList(false);
      return;
    }
    const q = data.street.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setShowList(false);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await searchAddresses(q);
        if (!cancelled) {
          setSuggestions(results);
          // Results can land after the visitor has moved on; only open the list while they are still typing here.
          setShowList(document.activeElement === inputRef.current);
        }
      } catch {
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      setSearching(false);
    };
  }, [data.street]);

  const pick = (s) => {
    skipRef.current = true;
    setField("street", s.street);
    if (s.city) setField("city", s.city);
    if (s.zip) setField("zip", s.zip);
    setField("jurisdiction", s.jurisdiction);
    setSuggestions([]);
    setShowList(false);
  };

  return (
    <div>
      <StepHeading num="01" title="Where are you building?" />
      <p className="mt-3 text-foreground/60 leading-relaxed max-w-xl">
        Your property helps us determine jurisdiction, permitting requirements and expected
        site-development costs.
      </p>

      <div className="mt-8 space-y-5">
        <div className="relative">
          <label className={labelClass} htmlFor="pb-street">
            Property address
          </label>
          <input
            id="pb-street"
            value={data.street}
            onChange={(e) => {
              setField("street", e.target.value);
              if (data.jurisdiction) setField("jurisdiction", ""); // the old pick no longer applies
            }}
            ref={inputRef}
            onFocus={() => suggestions.length > 0 && setShowList(true)}
            onBlur={() => setTimeout(() => setShowList(false), 150)}
            autoComplete="off"
            placeholder="Street address"
            className={`mt-2 ${inputClass}`}
          />
          {searching && (
            <Loader2 className="absolute right-4 top-[52px] w-4 h-4 animate-spin text-foreground/40" />
          )}
          {showList && suggestions.length > 0 && (
            <ul className="absolute z-20 left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg max-h-64 overflow-auto">
              {suggestions.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(s)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-secondary/60 flex items-start gap-2.5"
                  >
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{s.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
          <div>
            <label className={labelClass} htmlFor="pb-city">
              City
            </label>
            <input
              id="pb-city"
              value={data.city}
              onChange={(e) => setField("city", e.target.value)}
              placeholder="City"
              className={`mt-2 ${inputClass}`}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="pb-zip">
              ZIP
            </label>
            <input
              id="pb-zip"
              value={data.zip}
              onChange={(e) => setField("zip", e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="ZIP"
              className={`mt-2 ${inputClass}`}
            />
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-foreground/50">
        Jurisdiction ·{" "}
        <span className="text-foreground/80">
          {data.jurisdiction || "Set automatically from your address"}
        </span>
      </p>
      {data.street.trim().length >= 3 && !data.jurisdiction && !searching && !showList && (
        <p className="mt-2 text-xs text-foreground/50">
          Pick your address from the list to set the jurisdiction. Not listed? City and ZIP are enough.
        </p>
      )}
    </div>
  );
}
import React, { useEffect, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";

export default function AddressLookup({ form, setField }) {
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showList, setShowList] = useState(false);
  const skipRef = useRef(false);

  useEffect(() => {
    if (skipRef.current) {
      skipRef.current = false;
      setSuggestions([]);
      setShowList(false);
      return;
    }
    const q = form.property_address.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setShowList(false);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=us&q=${encodeURIComponent(q)}`
        );
        const data = await res.json();
        if (!cancelled) {
          setSuggestions(
            data.map((r) => ({
              id: r.place_id,
              label: r.display_name,
              city: r.address?.city || r.address?.town || r.address?.village || "",
              zip: r.address?.postcode || "",
              county: r.address?.county || "",
            }))
          );
          setShowList(true);
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
  }, [form.property_address]);

  const pick = (s) => {
    skipRef.current = true;
    setField("property_address", s.label);
    if (s.city) setField("city", s.city);
    if (s.zip) setField("zip_code", s.zip);
    if (s.county) setField("jurisdiction", s.county);
    setSuggestions([]);
    setShowList(false);
  };

  return (
    <div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance">
        Where are you building?
      </h2>
      <p className="mt-3 text-foreground/60 leading-relaxed max-w-xl">
        Your property helps us determine jurisdiction, permitting requirements and expected
        site-development costs.
      </p>
      <div className="relative mt-8">
        <input
          name="property_address"
          value={form.property_address}
          onChange={(e) => setField("property_address", e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowList(true)}
          onBlur={() => setTimeout(() => setShowList(false), 150)}
          autoComplete="off"
          placeholder="Property address"
          className="w-full px-5 py-4 rounded-md border border-border bg-background text-lg focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40"
        />
        {searching && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-foreground/40" />
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
      <p className="mt-3 text-xs text-foreground/50">
        Address not found? Type it in manually · city and ZIP are enough to continue.
      </p>
    </div>
  );
}
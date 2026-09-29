import React, { useEffect, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";

export default function AddressStep({ form, handleChange }) {
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
          setSuggestions(data.map((r) => ({ id: r.place_id, label: r.display_name, zip: r.address?.postcode || "" })));
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
    handleChange({ target: { name: "property_address", value: s.label } });
    if (s.zip) handleChange({ target: { name: "zip_code", value: s.zip } });
    setSuggestions([]);
    setShowList(false);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-foreground/80 mb-2">Property address</label>
      <div className="relative">
        <input
          name="property_address"
          value={form.property_address}
          onChange={handleChange}
          onFocus={() => suggestions.length > 0 && setShowList(true)}
          onBlur={() => setTimeout(() => setShowList(false), 150)}
          required
          autoComplete="off"
          placeholder="Street address"
          className="w-full px-4 py-3 pr-10 rounded-md border border-config-field bg-card text-sm focus:outline-none focus:ring-2 focus:ring-config-blue/40 focus:border-config-blue transition-all placeholder:text-foreground/40"
        />
        {searching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-foreground/40" />
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
        This helps us prepare for your call and identify the relevant local requirements. Address not found? Just
        type it in manually.
      </p>
    </div>
  );
}
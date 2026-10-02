// US address suggestions from OpenStreetMap (Nominatim), shaped for the project builders.

function toSuggestion(r) {
  const a = r.address || {};
  const street = [a.house_number, a.road].filter(Boolean).join(" ");
  return {
    id: r.place_id,
    label: r.display_name,
    street: street || r.display_name.split(",")[0].trim(),
    city: a.city || a.town || a.village || "",
    zip: a.postcode || "",
    // Incorporated cities issue their own permits; everywhere else it's the county.
    jurisdiction: a.city ? `City of ${a.city}` : a.county || "",
  };
}

export async function searchAddresses(query) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&countrycodes=us&q=${encodeURIComponent(query)}`
  );
  const results = await res.json();
  const seen = new Set();
  return results
    .map(toSuggestion)
    .filter((s) => !seen.has(s.label) && seen.add(s.label))
    .slice(0, 5);
}

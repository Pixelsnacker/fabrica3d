/**
 * Adresssuche und Streckenberechnung über kostenlose OpenStreetMap-Dienste –
 * ohne API-Key. Läuft vollständig im Browser.
 *
 *  - Nominatim  → Adress-Autocomplete / Geocoding
 *  - OSRM       → Fahrstrecke (Auto) zwischen zwei Koordinaten
 *
 * Hinweis: Die öffentlichen Demo-Server haben Fair-Use-Limits (ca. 1 Anfrage/s).
 * Für den persönlichen Gebrauch reicht das problemlos.
 */

const NOMINATIM = "https://nominatim.openstreetmap.org";
const OSRM = "https://router.project-osrm.org";

export interface GeoSuggestion {
  description: string;
  lat: number;
  lon: number;
}

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

/** Adressvorschläge zu einem Suchbegriff (für das Autocomplete). */
export async function searchAddresses(
  query: string,
  signal?: AbortSignal
): Promise<GeoSuggestion[]> {
  const url = new URL(`${NOMINATIM}/search`);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "0");
  url.searchParams.set("limit", "6");
  url.searchParams.set("countrycodes", "de");
  url.searchParams.set("q", query);

  const res = await fetch(url.toString(), {
    signal,
    headers: { "Accept-Language": "de" },
  });
  if (!res.ok) throw new Error(`Adresssuche fehlgeschlagen (${res.status}).`);
  const data = (await res.json()) as NominatimResult[];
  return data.map(r => ({
    description: r.display_name,
    lat: Number(r.lat),
    lon: Number(r.lon),
  }));
}

/** Erste passende Koordinate zu einer Adresse (Geocoding). */
export async function geocode(address: string): Promise<GeoSuggestion> {
  const results = await searchAddresses(address);
  if (results.length === 0) {
    throw new Error(`Adresse nicht gefunden: „${address}“.`);
  }
  return results[0];
}

/** Fahrstrecke in km zwischen zwei Adressen (über Geocoding + OSRM). */
export async function routeDistanceKm(
  origin: string,
  destination: string
): Promise<{ distanceKm: number; durationMin: number }> {
  const [a, b] = await Promise.all([geocode(origin), geocode(destination)]);
  const url = `${OSRM}/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Streckenberechnung fehlgeschlagen (${res.status}).`);
  const data = (await res.json()) as {
    code: string;
    routes?: Array<{ distance: number; duration: number }>;
  };
  const route = data.routes?.[0];
  if (data.code !== "Ok" || !route) {
    throw new Error("Keine Route gefunden. Bitte Adressen prüfen.");
  }
  return {
    distanceKm: Math.round((route.distance / 1000) * 100) / 100,
    durationMin: Math.round(route.duration / 60),
  };
}

/**
 * Service Worker für die Kilometerabrechnung-PWA.
 * Cacht die App-Shell (gleiche Origin) und liefert sie offline aus.
 * Fremd-Aufrufe (z. B. OpenStreetMap) laufen unverändert über das Netzwerk.
 */
const CACHE = "kilometer-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const sameOrigin = new URL(req.url).origin === self.location.origin;
  if (!sameOrigin) return; // OSM & Co. direkt durchreichen

  event.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req);
      const network = fetch(req)
        .then(res => {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        })
        .catch(() => cached);
      // Stale-while-revalidate: sofort Cache, im Hintergrund aktualisieren
      return cached || network;
    })
  );
});

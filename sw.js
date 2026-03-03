/* TrackScore Service Worker */
const CACHE_NAME = "trackscore-cache-v1";

/* Bestanden die we vooraf cachen */
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./sw.js",
  "./reset.svg",
  "./wissel.svg",
  "./img/icoon.png",
  "./img/logo.png",
  "./img/icoon-192.png",
  "./img/icoon-512.png"
];

/* Install: cache core assets */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

/* Activate: cleanup old caches */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

/* Fetch: stale-while-revalidate */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Alleen GET requests cachen
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((networkRes) => {
          // alleen succesvolle responses cachen
          if (networkRes && networkRes.status === 200) {
            const copy = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return networkRes;
        })
        .catch(() => cached); // als offline en geen cache: fallback = cached (kan null zijn)

      // geef cache direct terug, update op achtergrond
      return cached || fetchPromise;
    })
  );
});
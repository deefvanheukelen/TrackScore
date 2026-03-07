/* GitHub Pages vriendelijke service worker */
const CACHE_NAME = "trackscore-suite-v2";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./img/icoon.png",
  "./img/logo.png",
  "./img/dartscore.png",
  "./img/soccerscore.png",
  "./games/trackscore.html",
  "./games/dartscore.html",
  "./games/reset.svg",
  "./games/wissel.svg"
];

async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);

  await Promise.allSettled(
    CORE_ASSETS.map(async (asset) => {
      const request = new Request(asset, { cache: "reload" });
      const response = await fetch(request);
      if (response.ok) {
        await cache.put(asset, response);
      }
    })
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    cacheCoreAssets().then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => key === CACHE_NAME ? null : caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;

    try {
      const response = await fetch(req);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, response.clone()).catch(() => {});
      }
      return response;
    } catch (error) {
      if (req.mode === "navigate") {
        const fallback = await caches.match("./index.html");
        if (fallback) return fallback;
      }
      throw error;
    }
  })());
});

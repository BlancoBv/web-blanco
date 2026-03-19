const CACHE_NAME = "control-gastos-cache-v1";

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    const shouldCache =
        url.pathname.startsWith("/control") ||
        url.pathname.startsWith("/_astro");

    if (!shouldCache) return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                const clone = networkResponse.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, clone);
                });

                return networkResponse;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});

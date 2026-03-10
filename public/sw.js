/* const CACHE_NAME = "astro-cache-v1";

// rutas que quieres cachear automáticamente
const ROUTES_TO_CACHE = ["/assets/", "/data/"];

self.addEventListener("install", (event) => {
    console.log("Service Worker instalado");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker activo");
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // verificar si la url pertenece a alguna ruta que queremos cachear
    const shouldCache = ROUTES_TO_CACHE.some((route) =>
        url.pathname.startsWith(route)
    );

    if (!shouldCache) return;

    event.respondWith(
        caches.match(event.request).then((response) => {
            // si ya está en cache lo devuelve
            if (response) return response;

            // si no lo descarga y lo guarda
            return fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
}); */

const CACHE_NAME = "control-cache-v1";

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    const shouldCache =
        url.pathname.startsWith("/control") ||
        url.pathname.startsWith("/_astro");

    if (!shouldCache) return;

    event.respondWith(
        caches.match(event.request).then((response) => {
            return (
                response ||
                fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
            );
        })
    );
});
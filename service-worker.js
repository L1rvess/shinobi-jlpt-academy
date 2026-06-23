const CACHE_NAME = 'shinobi-jlpt-academy-pwa-60353c678cfe';
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./shinobi_images/images%20(1).jfif",
  "./shinobi_images/images%20(2).jfif",
  "./shinobi_images/images%20(3).jfif",
  "./shinobi_images/images%20(4).jfif",
  "./shinobi_images/images%20(5).jfif",
  "./shinobi_images/images%20(6).jfif",
  "./shinobi_images/images%20(7).jfif",
  "./shinobi_images/images%20(8).jfif",
  "./shinobi_images/images.jfif",
  "./icons/apple-touch-icon.png",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png",
  "./icons/icon-72.png",
  "./icons/icon-96.png"
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(APP_SHELL.map(url => cache.add(url)))
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME && key.startsWith('shinobi-jlpt-academy-pwa-')).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => cached))
  );
});

const CACHE_NAME = 'shinobi-jlpt-academy-pwa-root-fix-v1';
const APP_SHELL = [
  './',
  './index.html',
  './shinobi_jlpt_academy.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './images.jfif',
  './images (1).jfif',
  './images (3).jfif',
  './images (4).jfif',
  './images (5).jfif',
  './images (6).jfif',
  './images (7).jfif',
  './images (8).jfif'
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
      keys.filter(key => key.startsWith('shinobi-jlpt-academy-pwa-') && key !== CACHE_NAME).map(key => caches.delete(key))
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
        caches.open(CACHE_NAME).then(cache => cache.put('./shinobi_jlpt_academy.html', copy));
        return res;
      }).catch(() => caches.match('./shinobi_jlpt_academy.html') || caches.match('./index.html'))
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

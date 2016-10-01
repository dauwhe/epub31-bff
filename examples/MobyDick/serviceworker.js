self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('offline-publication').then(c => c.addAll([
      './',
      'index.html',
      'html/title-page.html',
      'html/copyright.html',
      'html/introduction.html',
      'html/epigraph.html',
      'html/c001.html',
      'html/c002.html',
      'html/c003.html',
      'html/c004.html',
      'html/c005.html',
      'html/c006.html',
      'css/mobydick.css',
      'fonts/STIXGeneral.otf',
      'fonts/STIXGeneralBol.otf',
      'fonts/STIXGeneralBolIta.otf',
      'fonts/STIXGeneralItalic.otf'
    ]))
  );
});

self.addEventListener('activate', event => {
  clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const sameOrigin = url.origin === location.origin;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
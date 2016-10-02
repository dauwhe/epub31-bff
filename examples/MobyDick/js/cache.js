var AppManifest= '{"name": "Moby-Dick; or, The Whale", "short_name": "Moby-Dick", "start_url": "index.html", "background_color": "#FAFAFA", "display": "standalone"}';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    /*
    This should be handled dynamically by finding the manifest on the page
    and then caching all items listed in spine & resources. 
    This is a temp version where all resources are specified in the SW.*/
    
    caches.open('mobydick-offline').then(c => c.addAll([
      '../index.html',
      '../html/toc.html',
      '../html/copyright.html',
      '../html/introduction.html',
      '../html/epigraph.html',
      '../html/c001.html',
      '../html/c002.html',
      '../html/c003.html',
      '../html/c004.html',
      '../html/c005.html',
      '../html/c006.html',
      '../css/mobydick.css',
      '../fonts/STIXGeneral.otf',
      '../fonts/STIXGeneralBol.otf',
      '../fonts/STIXGeneralBolIta.otf',
      '../fonts/STIXGeneralItalic.otf'
    ]))
  );
});

self.addEventListener('activate', event => {
  clients.claim();
});

/*
For a publication, it seems better to do network then cache than the opposite.
Could be problematic when the network is very slow, but has the benefit of being fresh.
*/

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const sameOrigin = url.origin === location.origin;

  if (sameOrigin && url.pathname.endsWith('/appmanifest.json')) {
    event.respondWith(new Response(AppManifest))
    return;
  }

  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );

});

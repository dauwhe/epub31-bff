/* For now, webpub.js simply calls the Service Worker.
A 1.0 should do the following:
- check if the browser provides support for Web Publications
- if it doesn't it would then do the following:
  1. cache the resources listed in the Web Publication Manifest (both spine and resources)
  2. display a toast notification once the publication is cached
  3. add some controls to move between spine items
  4. eventually provide a paginated viewing mode
*/

(function() {
  var installingMsg = document.querySelector('.installing-msg');
  if (!navigator.serviceWorker) {
    installingMsg.textContent = "Service worker not supported";
    return;
  }
      
  navigator.serviceWorker.register('serviceworker.js');
  navigator.serviceWorker.ready.then(function() {
    console.log('ready');
  });
}());
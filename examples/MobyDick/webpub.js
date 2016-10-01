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
(function() {
      var installingMsg = document.querySelector('.installing-msg');
      if (!navigator.serviceWorker) {
        installingMsg.textContent = "Service worker not supported";
        return;
      }
      
      // I'm not a fan of depending on SW for page render
      // but it I don't think there's another way around
      // it here.
      navigator.serviceWorker.register('sw.js');
      navigator.serviceWorker.ready.then(function() {
        console.log('ready');
        location.reload();
      });
    }());
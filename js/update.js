// update app for cache
(function (undefined) {
    if (navigator.onLine) {// online
        update();
    }
    // listen online
    document.body.addEventListener('online', update);
    function update () {
        if (window.applicationCache) {
            window.applicationCache.update(); // Attempt to update the user's cache.
            window.applicationCache.addEventListener('updateready', 
                function () {
                if (confirm('New version, update now?')) {
                    window.applicationCache.swapCache();  // The fetch was successful, swap in the new cache.
                    window.location.reload();
                }
            }, false);
        }
    }
})();
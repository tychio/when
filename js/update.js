// update app for cache
define(function (require) {
    if (navigator.onLine) {// online
        update();
    }
    if (navigator.onLine !== undefined) {
        document.body.addEventListener('online', update);
    }
    function update () {
        if (window.applicationCache) {
            var status = window.applicationCache.status;
            if (status == 1 || status > 3) {
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
    }
});

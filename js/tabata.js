window.Tabata = (function (undefined) {
    'use strict';
    return function (opt) {
        var count;
        var timeout;
        var options = {
            before: function () {},
            after: function () {}
        };

        for (var key in opt) {
            options[key] = opt[key];
        }

        var api = {
            init: initTabata,
            show: showTabata,
            start: startTabata
        };

        function initTabata () {
            options.count = Count({
                name: 'tabata'
            }).init();

            return api;
        }

        function showTabata () {
            options.before();
            options.count.show().set([0]);
            options.after();

            return api;
        }

        function startTabata () {
            _train();

            return api;
        }

        function _train () {
            timeout = setInterval(function () {
                var values = options.count.get();
                values[values.length - 1] += 1;
                options.count.set(values);
            }, 1000);
        }

        return api;
    };
})();
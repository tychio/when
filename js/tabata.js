window.Tabata = (function (undefined) {
    'use strict';
    return function (opt) {
        var count;
        var timeout;
        var options = {
            name: 'time-number',
            bg: '.main'
        };

        for (var key in opt) {
            options[key] = opt[key];
        }

        var api = {
            init: initTabata,
            show: showTabata,
            hide: hideTabata,
            start: startTabata,
            stop: stopTabata
        };

        function initTabata () {
            options.count = Count({
                name: 'tabata',
                className: options.name,
                handler: '.time-cycle'
            }).init();

            return api;
        }

        function showTabata () {
            options.count.set(0).show();

            return api;
        }

        function hideTabata () {
            options.count.hide();

            return api;
        }

        function startTabata () {
            _break()
            return api;
        }

        function stopTabata () {
            _clear();
            return api;
        }

        function _clear () {
            clearInterval(timeout);
            document.querySelector(options.bg).classList.remove('positive');
            document.querySelector(options.bg).classList.remove('relax');
        }

        function _train () {
            _discount(20, 'positive', function () {
                _break();
            });
        }

        function _break () {
            _discount(10, 'relax', function () {
                _train();
            });
        }

        function _discount (p_limit, p_class, p_end) {
            options.count.set(p_limit);
            _clear();
            timeout = setInterval(function () {
                var values = options.count.get();
                if (values[0] <= 0) {
                    document.querySelector(options.bg).classList.remove(p_class);
                    _clear();
                    p_end();
                } else {
                    values[0] -= 1;
                    options.count.set(values);
                }
            }, 1000);
            document.querySelector(options.bg).classList.add(p_class);
        }

        return api;
    };
})();
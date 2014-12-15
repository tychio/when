window.Tabata = (function (undefined) {
    'use strict';
    return function (opt) {
        var count;
        var timeout;
        var options = {
            before: function () {},
            after: function () {},
            bg: '.main'
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
                name: 'tabata',
                hidden: true
            }).init();

            return api;
        }

        function showTabata () {
            options.before();
            options.count.set(0).show();
            options.after();

            return api;
        }

        function startTabata () {
            _train()
            return api;
        }

        function _clear () {
            clearInterval(timeout);
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
            options.count.set(0);
            _clear();
            timeout = setInterval(function () {
                var values = options.count.get();
                if (values[0] >= p_limit) {
                    document.querySelector(options.bg).classList.remove(p_class);
                    _clear();
                    p_end();
                } else {
                    values[0] += 1;
                    options.count.set(values);
                }
            }, 1000);
            document.querySelector(options.bg).classList.add(p_class);
        }

        return api;
    };
})();
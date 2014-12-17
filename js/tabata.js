window.Tabata = (function (undefined) {
    'use strict';
    return function (opt) {
        var count;
        var timeout;
        var options = {
            name: 'time-number',
            bg: '.main',
            audio: {
                'positive': 'audio/gun.wav',
                'relax': 'audio/gun.wav',
                'end-positive': 'audio/end.wav',
                'end-relax': 'audio/end.wav'
            }
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
            _break(8)
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
        
        function _train (discount) {
            _discount(20, 'positive', function () {
                _break(discount-1);
            });
        }

        function _break (discount) {
            _discount(10, 'relax', function () {
                if (discount > 0) {
                    _train(discount);
                } else {
                    _clear();
                }
            });
        }

        function _discount (p_limit, p_class, p_end) {
            options.count.set(p_limit);
            _clear();
            timeout = setInterval(function () {
                var values = options.count.get();
                if (values[0] > 0) {
                    values[0] -= 1;
                    options.count.set(values);
                    _playSound(p_class);
                }
                if (values[0] <= 0) {
                    _playSound('end-' + p_class);
                    setTimeout(function () {
                        _clear();
                        p_end();    
                    }, 1000);
                }
            }, 1000);
            document.querySelector(options.bg).classList.add(p_class);
        }

        function _playSound (p_name) {
            var audio = new Audio(options.audio[p_name]);
            audio && audio.play();
        }

        return api;
    };
})();
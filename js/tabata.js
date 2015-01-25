window.Tabata = (function (undefined) {
    'use strict';
    return function (opt) {
        var count;
        var round;
        var roundNum;
        var timeout;
        var options = {
            round: 8,
            train: 20,
            pause: 10,
            name: 'time-number',
            bg: '.main',
            audio: {
                'positive': new Audio('audio/do.wav'),
                'relax': new Audio('audio/re.wav'),
                'end-positive': new Audio('audio/disable.wav'),
                'end-relax': new Audio('audio/enable.wav')
            },
            onEnd: function () {}
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
            count = Count({
                name: 'tabata',
                className: options.name,
                handler: '.time-cycle'
            }).init();

            roundNum = Count({
                name: 'tabata-round-num',
                handler: '#count-set',
                digit: 1,
                division: '',
                hidden: true
            }).init();

            round = Count({
                name: 'tabata-round',
                handler: '#count-set',
                digit: 1,
                division: '',
                hidden: true
            }).init();

            return api;
        }

        function showTabata () {
            count.set(0).show();
            round.show();
            roundNum.show();

            return api;
        }

        function hideTabata () {
            count.hide();
            round.hide();
            roundNum.hide();

            return api;
        }

        function startTabata () {
            _pause(options.round);
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
            _setRound(discount);
            _discount(options.train, 'positive', function () {
                _pause(discount-1);
            });
        }

        function _pause (discount) {
            _setRound(discount);
            _discount(options.pause, 'relax', function () {
                if (discount > 0) {
                    _train(discount);
                } else {
                    options.onEnd();
                }
            });
        }

        function _discount (p_limit, p_class, p_end) {
            count.set(p_limit);
            _clear();
            timeout = setInterval(function () {
                var values = count.get();
                if (values[0] > 0) {
                    values[0] -= 1;
                    count.set(values);
                    _playSound(p_class);
                }
                if (values[0] <= 0) {
                    _playSound('end-' + p_class);
                    _clear();
                    p_end();
                }
            }, 1000);
            document.querySelector(options.bg).classList.add(p_class);
        }

        function _setRound (p_round) {
            var roundDot = [];
            roundNum.set(p_round);
            for (var i = 0; i < options.round; i++ ) {
                roundDot[i] = i < p_round ? '*' : '_';
            }
            round.set(roundDot);
        }

        function _playSound (p_name) {
            var audio = options.audio[p_name];
            audio.currentTime = 0;
            audio.load();
            audio.play();
        }

        return api;
    };
})();
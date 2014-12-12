window.Timer = (function (undefined) {
    "use strict";
    var timer;
    return function () {
        var options = {
            accuracy: 40 //ms
        };

        var api = {
            start: startTricle,
            stop: stopTricle
        };

        var pointer = getPointer();
        var counter = createTimer();
        var weather = initWeather();

        function startTricle () {
            timer = setInterval(tricle, options.accuracy);

            return api;
        }

        function stopTricle () {
            clearInterval(timer);

            return api;
        }

        function tricle () {
            var time = new Date();
            var milliseconds = time.getMilliseconds();
            var seconds = time.getSeconds();
            var minutes = time.getMinutes();
            var hours = time.getHours();
            var month = time.getMonth();
            setTimer(milliseconds, seconds, minutes, hours, month);
            // output datetime
            document.querySelector('time').setAttribute('datetime', time.toLocaleString());
        }

        function createTimer () {
            var _count = Count();
            _count.init();

            return _count;
        }

        function getPointer () {
            var pointer = {
                second: Dial({ name: 'point_second', radian:  4, scope: 60 }),
                minute: Dial({ name: 'point_minute', radian: 10, scope: 60 }),
                hour:   Dial({ name:   'point_hour', radian: 30, scope: 12 })
            };
            pointer.second.init();
            pointer.minute.init();
            pointer.hour.init();

            return pointer;
        }

        function initWeather () {
            var skyColor = Sky();
            skyColor.init();
            return skyColor;
        }

        // set text and plate
        function setTimer (p_milliseconds, p_seconds, p_minutes, p_hours, p_months) {
            var timeTexts = [
                p_hours > 12 ? p_hours % 12 : p_hours,
                p_minutes,
                p_seconds
            ];
            var meridiem = p_hours >= 12 ? 'PM' : 'AM';
            counter.prefix(meridiem).set(timeTexts);

            pointer.second.set(p_seconds + p_milliseconds / 1000);
            pointer.minute.set(p_minutes + p_seconds / 60);
            pointer.hour.set(p_hours + p_minutes / 60);

            weather.set(p_months, p_hours);
        }

        return api;
    }
})();

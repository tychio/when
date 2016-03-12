define(['jquery', 'mod/count', 'mod/dial', 'mod/sky'], function ($, Count, Dial, Sky) {
    'use strict';

    return function () {
        var timer;
        var skyDebounce;
        var options = {
            accuracy: 40, //ms
            skyUpdate: 60*1000,
        };

        var api = {
            start: startTricle,
            stop: stopTricle
        };

        api.pointer = getPointer();
        api.counter = createTimer();
        api.weather = initWeather();

        function startTricle () {
            timer = setInterval(tricle, options.accuracy);
            api.weather.set(new Date());
            skyDebounce = setInterval(function () {
                api.weather.set(new Date());
            }, options.skyUpdate);

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
            $('time').attr('datetime', time.toLocaleString());
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
            api.counter.prefix(meridiem).set(timeTexts);

            api.pointer.second.set(p_seconds + p_milliseconds / 1000);
            api.pointer.minute.set(p_minutes + p_seconds / 60);
            api.pointer.hour.set(p_hours + p_minutes / 60);
        }

        return api;
    }
});

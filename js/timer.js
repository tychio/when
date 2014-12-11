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

        // set text and plate
        function setTimer (p_milliseconds, p_seconds, p_minutes, p_hours, p_months) {
            // text part
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
            // color
            setSkyColor({
                hour: p_hours,
                month: p_months
            });
        }
        // setting sky color such as background and text color.
        function setSkyColor (p_time) {
            var sunrise = 8;
            var sunset = 18;
            if (_atTimeZone(p_time.month, 3, 11)) {// summer
                sunrise = 6;
                sunset = 20;
            }
            var mainDOM = document.querySelector('main');
            var NIGHT_CLASS = 'dark';
            if (_atTimeZone(p_time.hour, sunrise, sunset)) {// daytime
                mainDOM.classList.remove(NIGHT_CLASS);
            } else {// night
                mainDOM.classList.add(NIGHT_CLASS);
            }
            function _atTimeZone (p_time, p_start, p_end) {
                return (p_time - p_start)*(p_end - p_time) > 0;
            }
        }

        return api;
    }
})();

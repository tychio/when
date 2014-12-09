window.Timer = (function (undefined) {
    "use strict";
    var timer;
    return function () {
        var options = {
            accuracy: 40 //ms
        };

        var dial = Dial();

        var api = {
            start: startTricle,
            stop: stopTricle
        };

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
        // set text and plate
        function setTimer (p_milliseconds, p_seconds, p_minutes, p_hours, p_months) {
            // text part
            setTimeText({
                second: p_seconds,
                minute: p_minutes,
                hour: p_hours > 12 ? p_hours % 12 : p_hours,
                meridiem: p_hours >= 12
            });
            // plate part
            dial.set({
                second: p_seconds + p_milliseconds / 1000,
                minute: p_minutes + p_seconds / 60,
                hour: p_hours + p_minutes / 60
            });
            // color
            setSkyColor({
                hour: p_hours,
                month: p_months
            });
        }
        // setting clock text include am or pm,second,minute and hour.
        function setTimeText (p_time) {
            var selector = {
                meridiem:         '.time_meridiem',
                hour:             '.time_hour',
                minute:           '.time_minute',
                second:           '.time_second'
            };
            _setTimeValue(selector.meridiem, p_time.meridiem ? 'PM' : 'AM');
            _setTimeValue(selector.hour, coverage(p_time.hour));
            _setTimeValue(selector.minute, coverage(p_time.minute));
            _setTimeValue(selector.second, coverage(p_time.second));
            /**
             * setting the text for clock
             * @param p_selector the prefix could be '.' and '#'
             * @param p_value the value would be text.
            **/
            function _setTimeValue (p_selector, p_value) {
                document.querySelector(p_selector).innerHTML = p_value;
            }
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
        /**
         * complement digits
         * @param p_number[number] the number to be processed.
         * @param p_size[number] digits size, default is 2.
         * @return [string] don't try to parse it to number,
         *     maybe there is '0' in its front.
        **/
        function coverage (p_number, p_size) {
            p_number += '';// parse to string
            if (p_size === undefined) {// default size is 2
                p_size = 2;
            }
            for (var i = 0; i < p_size; i++) {// cover zero
                p_number = '0' + p_number;
            }
            return p_number.slice(0 - p_size);
        }

        return api;
    }
})();

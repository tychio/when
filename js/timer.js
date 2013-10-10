(function (undefined) {
    "use strict";
    var SECOND_WIDTH = 4; // deg
    var MINUTE_WIDTH = 10; // deg
    var HOUR_WIDTH = 30; // deg
    var ACCURACY = 40; //ms
    var PREFIXS = ['', 'moz', 'webkit']; // browers
    // run
    var timer = setInterval(tricle, ACCURACY);
    function tricle () {
        var time = new Date();
        var seconds = time.getSeconds();
        var minutes = time.getMinutes();
        var hours = time.getHours();
        var milliseconds = time.getMilliseconds();
        setTimer(milliseconds, seconds, minutes, hours);
    }
    // set text and plate
    function setTimer (p_milliseconds, p_seconds, p_minutes, p_hours) {
        // text part
        setTimeText({
            second: p_seconds,
            minute: p_minutes,
            hour: p_hours % 12,
            meridiem: p_hours >= 12
        });
        // plate part
        setTimePlate({
            second: p_seconds + p_milliseconds / 1000,
            minute: p_minutes + p_seconds / 60,
            hour: p_hours + p_minutes / 60
        });
    }
    // setting the clock plate include second,minute and hour pointer.
    function setTimePlate (p_time) {
        var selector = {
            second: '.point_second',
            minute: '.point_minute',
            hour: '.point_hour'
        };
        _setTimePoint(p_time.second, SECOND_WIDTH, selector.second, 60);
        _setTimePoint(p_time.minute, MINUTE_WIDTH, selector.minute, 60);
        _setTimePoint(p_time.hour, HOUR_WIDTH, selector.hour, 12);
        /**
         * setting a pointer rotate for webkit and moz
         * @param p_time a value for the pointer.
         * @param p_width the pointer's width
         * @param p_selector the pointer selector
         * @param p_scope units amount to the scope in cycle.
        **/
        function _setTimePoint (p_time, p_width, p_selector, p_scope) {
            var rotate = p_time*(360/p_scope) - 90 + p_width*0.5;
            var skew = p_width - 90;
            var transform = 'rotate(' + rotate + 'deg) skew(' + skew + 'deg)';
            for (var i = 0; i < PREFIXS.length; i++) {
                var _prefix = PREFIXS[i] === '' ? '' : '-' + PREFIXS[i] + '-';
                var _dom = document.querySelector(p_selector);
                _dom.style[_prefix + 'transform'] = transform;
            }
        }
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
    // action bind
    // turn on/off light
    toggleLight();
    function toggleLight () {
        _checkLight(); // first checking
        // turn on/off
        document.querySelector('.time-panel')
        .addEventListener('click', function () {
            if (localStorage.turn === 'off') {
                localStorage.turn = 'on';
            } else {
                localStorage.turn = 'off';
            }
            _checkLight();
        }, false);
        function _checkLight () {
            var _mainDom = document.querySelector('main');
            var _TURNOFF_CLASS = 'dark';
            if (localStorage.turn !== 'off') {// turn on
                _mainDom.classList.remove(_TURNOFF_CLASS);
            } else {// turn off
                _mainDom.classList.add(_TURNOFF_CLASS);
            }
        }
    }
})();
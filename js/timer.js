(function (undefined) {
    "use strict";
    var time,value;
    var timer = setInterval(function () {
        time = new Date();
        value = {
            meridiem: time.getHours() > 12,
            hour: time.getHours() % 12,
            minute: time.getMinutes(),
            second: time.getSeconds()
        };
        setTimer(value);
    }, 300);
    function setTimer (p_value) {
        // text part
        setTimeText(p_value);
        // cycle part
    }
    function setTimeText (p_value) {
        var selector = {
            meridiem:         '.time_meridiem',
            hour:             '.time_hour',
            minute:           '.time_minute',
            second:           '.time_second'
        };
        _setTimeValue(selector.meridiem, p_value.meridiem ? 'AM' : 'PM');
        _setTimeValue(selector.hour, coverage(p_value.hour));
        _setTimeValue(selector.minute, coverage(p_value.minute));
        _setTimeValue(selector.second, coverage(p_value.second));
        function _setTimeValue (p_selector, p_value) {
            document.querySelectorAll(p_selector)[0].innerHTML = p_value;
        }
    }
    function coverage (p_number, p_unit_size) {
        p_number += '';// parse to string
        if (p_unit_size === undefined) {// default size is 2
            p_unit_size = 2;
        }
        for (var i = 0; i < p_unit_size; i++) {// cover zero
            p_number = '0' + p_number;
        }
        return p_number.slice(0 - p_unit_size);
    }
})();
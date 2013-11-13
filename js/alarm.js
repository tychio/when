(function (undefined) {
    "use strict";
    // drag the alarm pointer
    var touch = false;

    var panel = document.querySelector('.time-panel');
    var plate = document.querySelector('.time-plate');
    var main = document.querySelector('main');
    var alarmPointer = document.querySelector('.time-alarm');

    var ALARM_NAME = 'only_alarm';

    panel.addEventListener('touchstart', _startAlarm, false);
    main.addEventListener('touchmove', _rotateAlarm, false);
    main.addEventListener('touchend', _endAlarm, false);
    main.addEventListener('touchcancel', _endAlarm, false);
    // start touch the clock panel for start to set a alarm time.
    function _startAlarm (p_event) {
        p_event.preventDefault();
        touch = true;
        alarmPointer.style.display = 'block';
    }
    // to rotate the alarm pointer on move touch.
    function _rotateAlarm (p_event) {
        p_event.preventDefault();
        if (touch) {
            var touchPos = p_event.touches[0];
            var rotate = _getRotate(touchPos.pageX, touchPos.pageY, plate.clientWidth*0.5, plate.clientHeight*0.5);
            _setRotate(rotate);
        }
        function _getRotate (p_touch_x, p_touch_y, p_target_x, p_target_y) {
            var _PI = Math.atan2(p_touch_x - p_target_x, p_touch_y - p_target_y);
            return (2 - (_PI/Math.PI + 1))*180;
        }
        function _setRotate (p_rotate) {
            var _prefix = ['webkit', 'moz', 'ms', 'o', ''];
            for (var i = 0; i < _prefix.length; i++) {
                if (_prefix[i].length > 0) {
                    _prefix[i] = '-' + _prefix[i] + '-';
                }
                alarmPointer.style[_prefix[i] + 'transform'] = 'rotate(' + p_rotate + 'deg)';
            }
        }
    }
    // end or cancel touch the clock panel to set a time for alarm.
    function _endAlarm (p_event) {
        p_event.preventDefault();
        touch = false;
        alarmPointer.style.display = 'none';
        var _transform = alarmPointer.style.transform;
        var _rotate = /(rotate[\s]*\()([\d.]+)/.exec(_transform);
        if (_rotate && _rotate[2]) {
            var _alarmTime = new Date();
            var _alarmSeconds = (_rotate[2]/360 + 1)*12*60*60*1000;
            _alarmTime.setHours(0);
            _alarmTime.setMinutes(0);
            _alarmTime.setSeconds(0);
            _alarmTime.setMilliseconds(_alarmSeconds);
            if (_alarmTime.getTime() < (new Date()).getTime()) {// past time
                _alarmTime.setHours(_alarmTime.getHours() + 12);
            }
            var _addAlarm = navigator.mozAlarms.add(_alarmTime, ALARM_NAME);
            _addAlarm.onsuccess = function () {
                this.result.forEach(function (p_alarm) {
                    alert(p_alarm.date);
                });
            };
        }
    }
})();
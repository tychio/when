window.Wind = (function (undefined) {
    'use strict';

    function _calculateRotate (p_touch_x, p_touch_y, p_target_x, p_target_y) {
        var _PI = Math.atan2(p_touch_x - p_target_x, p_touch_y - p_target_y);
        return (2 - (_PI/Math.PI + 1))*180;
    }
    
    return function (opt) {
        var options = {
            rotate: function () {},
            tap: function () {},
            panel: document.querySelector('.time-panel'),
            plate: document.querySelector('.upside'),
            main: document.querySelector('.main'),
            alarmPointer: document.querySelector('.time-alarm')
        };

        if (typeof opt === 'function') {
            options.tap = opt;
        } else {
            for (var key in opt) {
                options[key] = opt[key];
            }
        }

        var touch = false;

        options.main.addEventListener('touchmove', rotate, false);
        options.main.addEventListener('touchend', touchUp, false);
        options.main.addEventListener('touchcancel', touchUp, false);
        options.main.addEventListener('click', touchUp, false);

        // to rotate the alarm pointer on move touch.
        function rotate (p_event) {
            p_event.preventDefault();

            touch = true;
            options.alarmPointer.style.display = 'block';
            var touchPos = p_event.touches[0];
            var rotate = _calculateRotate(touchPos.pageX, touchPos.pageY, options.plate.clientWidth*0.5, options.plate.clientHeight*0.5);
            _setRotateStyle(rotate);

        }

        function touchUp (p_event) {
            p_event.preventDefault();

            if (touch) {
                _touch(p_event);
            } else {
                _tap(p_event);
            }
        }

        function _touch (p_event) {
            touch = false;
            options.alarmPointer.style.display = 'none';
            var _transform = options.alarmPointer.style.transform;
            var _rotate = /(rotate[\s]*\()([\d.]+)/.exec(_transform);
            if (_rotate && _rotate[2]) {
                var angle = _rotate[2];
                options.rotate(angle);
            }
        }

        function _tap (p_event) {
            options.tap(p_event);
        }

        function _setRotateStyle (p_rotate) {
            var _prefix = ['webkit', 'moz', 'ms', 'o', ''];
            for (var i = 0; i < _prefix.length; i++) {
                if (_prefix[i].length > 0) {
                    _prefix[i] = '-' + _prefix[i] + '-';
                }
                options.alarmPointer.style[_prefix[i] + 'transform'] = 'rotate(' + p_rotate + 'deg)';
            }
        }

        function _setAlarm (angle) {
            var ALARM_NAME = 'only_alarm';
            var _alarmTime = new Date();
            var _alarmSeconds = (angle/360 + 1)*12*60*60*1000;
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
define(['jquery'], function ($) {
    'use strict';

    function _calculateRotate (p_touch_x, p_touch_y, p_target_x, p_target_y) {
        var _PI = Math.atan2(p_touch_x - p_target_x, p_touch_y - p_target_y);
        return (2 - (_PI/Math.PI + 1))*180;
    }

    return function (opt) {
        var options = {
            rotate: function () {},
            tap: function () {},
            panel: $('.time-cycle'),
            plate: $('.upside'),
            main: $('.main'),
            pointer: $('.time-alarm')
        };

        if (typeof opt === 'function') {
            options.tap = opt;
        } else {
            for (var key in opt) {
                options[key] = opt[key];
            }
        }

        var touch = false;

        options.main
            .on('touchmove', rotate);
        options.panel
            .on('touchend', touchUp)
            .on('touchcancel', touchUp)
            .on('click', touchUp);

        // to rotate the alarm pointer on move touch.
        function rotate (p_event) {
            p_event.preventDefault();

            touch = true;
            options.pointer.show();
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
            options.pointer.hide();
            var _transform = options.pointer.css('transform');
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
                options.pointer.css(_prefix[i] + 'transform', 'rotate(' + p_rotate + 'deg)');
            }
        }
    }
});

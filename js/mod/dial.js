define(function (require) {
    'use strict';
    var PREFIXS = ['', 'moz', 'webkit'];
	return function (opt) {
        var $pointer;
		var options = {
            name: 'pointer' + (new Date()).getTime(),
            radian: 10,
            scope: 10
		};

        options = $.extend(options, opt);

		var api = {
            init: createElement,
			set: setDegree,
            show: showPointer,
            hide: hidePointer
		};

        function createElement (name) {
            options.name = name || options.name;
            $pointer && $pointer.remove && $pointer.remove(); 

            _createElementAppendTo('span', 'time-point', '#dial-set');

            return api;
        }

        function hidePointer () {
            $pointer.hide();

            return api;
        }

        function showPointer () {
            $pointer.show();

            return api;
        }

        function setDegree (deg) {
            _setTimePoint(deg, options.radian, options.scope, $pointer);

            return api;
        }

        function _createElementAppendTo (elementName, className, containerSelector) {
            $pointer = $('<' + elementName + '>');
            $pointer.addClass(className);
            $pointer.addClass(options.name);
            $(containerSelector).append($pointer);
        }

        function _setTimePoint (p_time, p_width, p_scope, p_pointer) {
            var rotate = p_time*(360/p_scope) - 90 + p_width*0.5;
            var skew = p_width - 90;
            var transformValue = 'rotate(' + rotate + 'deg) skew(' + skew + 'deg)';
            _setStyleWithPrefix.call(p_pointer, 'transform', transformValue);
        }

        function _setStyleWithPrefix (p_styleName, p_transform) {
            for (var i = 0; i < PREFIXS.length; i++) {
                var _prefix = PREFIXS[i] === '' ? '' : '-' + PREFIXS[i] + '-';
                this.css(_prefix + p_styleName, p_transform);
            }
        }

		return api;
	};
});
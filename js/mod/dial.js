window.Dial = (function (undefined) {
    'use strict';
    var PREFIXS = ['', 'moz', 'webkit'];
	return function (opt) {
        var $pointer;
		var options = {
            name: 'pointer' + (new Date()).getTime(),
            radian: 10,
            scope: 10
		};

        for (var key in opt) {
            options[key] = opt[key];
        }

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
            $pointer.style.display = 'none';

            return api;
        }

        function showPointer () {
            $pointer.style.display = 'block';

            return api;
        }

        function setDegree (deg) {
            _setTimePoint(deg, options.radian, options.scope, $pointer);

            return api;
        }

        function _createElementAppendTo (elementName, className, containerClass) {
            $pointer = document.createElement(elementName);
            $pointer.classList.add(className);
            $pointer.classList.add(options.name);
            var _$plate = document.querySelector(containerClass);
            _$plate.appendChild($pointer);
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
                this.style[_prefix + p_styleName] = p_transform;
            }
        }

		return api;
	};
})();
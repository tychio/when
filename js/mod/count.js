window.Count = (function (undefined) {
    'use strict';

    function _coverage (p_number, p_size) {
        p_number += '';// parse to string
        if (p_size === undefined) {// default size is 2
            return p_number;
        }
        for (var i = 0; i < p_size; i++) {// cover zero
            p_number = '0' + p_number;
        }
        return p_number.slice(0 - p_size);
    }

    function _wrapSpan (content) {
        return '<span>' + content + '</span>';
    }
    
	return function (opt) {
		var $counter;
        var values;
		var options = {
			name: 'time-count',
			className: 'time-count',
			prefix: '',
			division: ':',
			digit: 2,
			hidden: false
		};

        for (var key in opt) {
            options[key] = opt[key];
        }

        var api = {
        	init: createContainer,
        	set: setCountValue,
            get: getCountValue,
        	prefix: updatePrefix,
        	show: showCounter,
        	hide: hideCounter
        };

        function createContainer () {
        	$counter = _createElementAppendTo('div', options.name, '#count-set');
        	if (options.hidden) {
        		hideCounter();
        	}

        	return api;
        }

        function setCountValue (vals) {
            values = vals;
        	var elements = vals.map(function (val) {
        		return _wrapSpan(_coverage(val, options.digit));
        	});
        	var _space = _wrapSpan('&nbsp;');
        	var _prefix = options.prefix ? _wrapSpan(options.prefix) + _space : options.prefix;

        	$counter.innerHTML = _prefix + elements.join(_wrapSpan(options.division));

        	return api;
        }

        function getCountValue () {
            return values;
        }

        function updatePrefix (prefix) {
        	options.prefix = prefix;

        	return api;
        }

        function showCounter () {
        	$counter.style.height = $counter.style.maxHeight;
        	$counter.style.opacity = 1;

        	return api;
        }

        function hideCounter () {
        	$counter.style.height = 0;
        	$counter.style.opacity = 0;

        	return api;
        }

        function _createElementAppendTo (elementName, id, container) {
            var $element = document.createElement(elementName);
            $element.classList.add(options.className);
            $element.setAttribute('id', id);
            var $container = document.querySelector(container);
            $container.appendChild($element);

            return $element;
        }

        return api;
	}
})();
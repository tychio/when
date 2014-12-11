window.Count = (function (undefined) {
	return function (opt) {
		var $counter;
		var options = {
			name: 'time-count',
			prefix: '',
			division: ':',
			digit: 2
		};

        for (var key in opt) {
            options[key] = opt[key];
        }

        var api = {
        	init: createContainer,
        	set: setCountValue,
        	prefix: updatePrefix
        };

        function createContainer () {
        	$counter = _createElementAppendTo('div', options.name, '#count-set');

        	return api;
        }

        function setCountValue (values) {
        	values = values.map(function (val) {
        		return _wrapSpan(_coverage(val, options.digit));
        	});
        	var _space = _wrapSpan('&nbsp;');
        	var _prefix = options.prefix ? _wrapSpan(options.prefix) + _space : options.prefix;

        	$counter.innerHTML = _prefix + values.join(_wrapSpan(options.division));

        	return api;
        }

        function updatePrefix (prefix) {
        	options.prefix = prefix;

        	return api;
        }

        function _createElementAppendTo (elementName, className, container) {
            var $element = document.createElement(elementName);
            $element.classList.add(className);
            var $container = document.querySelector(container);
            $container.appendChild($element);

            return $element;
        }

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

        return api;
	}
})();
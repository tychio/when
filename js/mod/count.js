define(function (require) {
    'use strict';

    function _coverage (p_number, p_size) {
        p_number += '';// parse to string
        if (p_size === undefined) {// default size is 2
            return p_number;
        }
        p_number = new Array(p_size + 1).join('0') + p_number;
        return p_number.slice(0 - p_size);
    }

    function _wrapSpan (content) {
        var $span = $('<span>');
        return $span.html(content);
    }
    
	return function (opt) {
		var $counter;
        var values;
		var options = {
			name: 'time-count',
            handler: '#count-set',
			className: 'time-count',
			prefix: '',
			division: ':',
			digit: 2,
			hidden: false
		};

        options = $.extend(options, opt);

        var api = {
        	init: createContainer,
        	set: setCountValue,
            get: getCountValue,
        	prefix: updatePrefix,
        	show: showCounter,
        	hide: hideCounter
        };

        function createContainer () {
        	$counter = _createElementAppendTo('div', options.name, options.handler);
        	if (options.hidden) {
        		hideCounter();
        	}

        	return api;
        }

        function setCountValue (vals) {
            if (typeof vals === 'object') {
                values = vals;
            } else {
                values = [vals];
            }

            $counter.empty();
        	
            $.each(values, function (index, val) {
                var $value = _wrapSpan(_coverage(val, options.digit));
                $counter.append($value.add(_wrapSpan(options.division)));
        	});

            $counter.children().last().remove();

            if (options.prefix) {
        	   $counter.prepend(_wrapSpan(options.prefix).add(_wrapSpan('&nbsp;')));
            }

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
        	$counter.height($counter.css('max-height'));
        	$counter.css('opacity', 1);

        	return api;
        }

        function hideCounter () {
        	$counter.height(0);
            $counter.css('opacity', 0);

        	return api;
        }

        function _createElementAppendTo (elementName, id, container) {
            var $element = $('<' + elementName + '>');
            $element.addClass(options.className).attr('id', id);
            $(container).append($element);

            return $element;
        }

        return api;
	}
});
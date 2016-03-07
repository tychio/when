define(function (require) {
    'use strict';
    var cache = {};

	return function (opt) {
        var $velarium;

		var options = {
			handler: '.main',
			darkClass: 'dark'
		};
        
        options = $.extend(options, opt);
		
        var api = {
        	init: initSky,
        	set: setSkyColor
        };

        function initSky () {
        	$velarium = $(options.handler);

            return api;
        }

        function setSkyColor (p_now) {
            _geo(function (lat, lon) {
                if (!cache['sunrise']) {
                    $.get('http://api.openweathermap.org/data/2.5/weather', {
                        lat: lat,
                        lon: lon,
                        APPID: 'ea8ca31e66f3c7cbbf5434f1d072d8c2',
                    }, function (data) {
                        cache['sunrise'] = new Date(data.sys.sunrise*1000);
                        cache['sunset'] = new Date(data.sys.sunset*1000);
                        _updateSky(p_now);
                    });
                } else {
                    _updateSky(p_now);
                }
            });

            return api;
        }

        function _updateSky (p_now) {
            if (p_now > cache['sunrise'] && p_now < cache['sunset']) {
                $velarium.removeClass(options.darkClass);
            } else {
                $velarium.addClass(options.darkClass);
            }
        }

        function _geo (callback) {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    callback(position.coords.latitude, position.coords.longitude);
                });
            }
        }

        return api;
	};
});
define(function (require) {
    'use strict';

    var Ajax = require('mod/ajax');

	return function (opt) {
        var $velarium;

		var options = {
			handler: '.main',
			darkClass: 'dark'
		};
        for (var key in opt) {
            options[key] = opt[key];
        }
		
        var api = {
        	init: initSky,
        	set: setSkyColor
        };

        function initSky () {
        	$velarium = document.querySelector(options.handler);

            return api;
        }

        function setSkyColor (p_now) {
            _geo(function (lat, lon) {
                Ajax.get('http://api.openweathermap.org/data/2.5/weather', {
                    lat: lat,
                    lon: lon,
                    APPID: 'ea8ca31e66f3c7cbbf5434f1d072d8c2',
                }, function (data) {
                    var sunrise = new Date(data.sys.sunrise*1000);
                    var sunset = new Date(data.sys.sunset*1000);
                    if (p_now > sunrise && p_now < sunset) {
                        $velarium.classList.remove(options.darkClass);
                    } else {
                        $velarium.classList.add(options.darkClass);
                    }
                    
                });
            });

            return api;
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
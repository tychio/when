var Sky = (function (undefined) {
    function _atTimeZone (p_hour, p_start, p_end) {
        return (p_hour - p_start)*(p_end - p_hour) > 0;
    }
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

        function setSkyColor (p_month, p_hour) {
            var sunrise = 8;
            var sunset = 18;
            if (_atTimeZone(p_month, 3, 11)) {// summer
                sunrise = 6;
                sunset = 20;
            }
            if (_atTimeZone(p_hour, sunrise, sunset)) {// daytime
                $velarium.classList.remove(options.darkClass);
            } else {// night
                $velarium.classList.add(options.darkClass);
            }

            return api;
        }

        return api;
	};
})();
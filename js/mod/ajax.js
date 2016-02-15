define(function (require) {
    'use strict';

    function _buildParams (params) {
        var paramsBuilder = [];
        for (name in params) {
            paramsBuilder.push(name + '=' + params[name]);
        }
        var paramsString = paramsBuilder.join('&');

        return '?' + paramsString;
    }

    return {
        get: function (url, params, success) {
            var request = new XMLHttpRequest();
            request.open('GET', url + _buildParams(params), true);
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    try {
                        success(JSON.parse(request.responseText));
                    } catch (e) {

                    }
                }
            };
            request.send();
        }
    }
});
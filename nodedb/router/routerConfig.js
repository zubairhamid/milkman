(function(){

    var getMethod = require('../config/getGlobalMethod');

    var dummy = require('../api/dummy');

    var directResponse = require('../api/directResponseApi');

    var parseBody = require('../api/parseBodyApi');

    var parseRequest = require('../api/parseRequestApi');

    var routes = [
        {
            apiName             : 'dummy',
            apiType             : 'Command',
            apiHandler          : dummy.dummyApi,
            apiRedirect         : '',
            moduleName          : '',
            inSession           : false,
            contentType         : 'application/json'
        },
        {
            apiName             : 'registerDevice',
            apiType             : 'Command',
            apiHandler          : parseBody.parseBodyApi,
            apiRedirect         : 'registerDevice',
            moduleName          : getMethod.FileName.device,
            inSession           : false,
            contentType         : 'application/json'
        },
        {
            apiName             : 'checkDeviceInfo',
            apiType             : 'Query',
            apiHandler          : parseBody.parseBodyApi,
            apiRedirect         : 'getSpecificRecord',
            moduleName          : getMethod.FileName.device,
            inSession           : false,
            contentType         : 'application/json'
        },
        {
            apiName             : 'getMilkService',
            apiType             : 'Query',
            apiHandler          : parseBody.parseBodyApi,
            apiRedirect         : 'checkForDelivery',
            moduleName          : getMethod.FileName.device,
            inSession           : false,
            contentType         : 'application/json'
        }
    ];

    module.exports.routeConfig = function(){
        return routes;
    };

    module.exports.routeList = function(){
        var apiCall = {};
        for(var i = 0; i < routes.length; i++){
            apiCall[routes[i].apiName] = routes[i].apiName;
        }
        return apiCall;
    };
})();
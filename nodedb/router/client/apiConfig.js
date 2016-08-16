(function(){

    var router = require('../route');

    module.exports = [
        {
            path: '/client/integrate/dummy',
            method: 'post',
            callApi: router.apiCalls.dummy
        },
        {
            path: '/client/nfc/register',
            method: 'post',
            callApi: router.apiCalls.registerDevice
        },
        {
            path: '/client/nfc/check/info',
            method: 'post',
            callApi: router.apiCalls.checkDeviceInfo
        },
        {
            path: '/client/nfc/milk/service',
            method: 'post',
            callApi: router.apiCalls.getMilkService
        }
    ];

})();
(function(){

    var interactor = require('@cloudmpower/interactor');

    var loadOtherModules = function(){

        var errorResponse = require('../gen/errorResponse');

        var moment = require('moment');

        var successResponse = require('../gen/successResponse');

        var mongoModel = require('../databases/dbModel/model');

        var session = require('@cloudmpower/session');

        var webServer = require('@cloudmpower/saasgateway');

        var device = require('../apiMethods/device/deviceMethods');

        var referenceObj = [
            {
                fileName        : 'mongoModel',
                fileObj         : mongoModel
            },
            {
                fileName        : 'session',
                fileObj         : session
            },
            {
                fileName        : 'moment',
                fileObj         : moment
            },
            {
                fileName        : 'errorResponse',
                fileObj         : errorResponse
            },
            {
                fileName        : 'successResponse',
                fileObj         : successResponse
            },
            {
                fileName        : 'webServer',
                fileObj         : webServer
            },
            {
                fileName        : 'device',
                fileObj         : device
            }
        ];
        interactor.requireHandler(referenceObj);
    };

    module.exports = interactor;

    module.exports.FileName = interactor.fileName();

    loadOtherModules();
})();
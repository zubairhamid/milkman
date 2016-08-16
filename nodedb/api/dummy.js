(function(){

    var getMethod = require('../config/getGlobalMethod');

    var dummyApi = function dummyApi(rin , callback){
        var methodName = getMethod.FileName;
        this.response = rin;
        this.body = rin.body;
        this.callback = callback;
        this.tnxId = rin.header['x-request-id'] || '';
        this.connectionManager = getMethod(methodName.connectionManager);
    };

    dummyApi.prototype.requestApi = function(){

        console.log("existing connection " ,this.connectionManager);
        this.response.body = { status: 200,responseData: {message: "Integration Successful"} };
        this.callback(null, this.response);
    };

    module.exports.dummyApi = function(rin , callback){
        var dApi = new dummyApi(rin , callback);
        dApi.requestApi();
    };
})();
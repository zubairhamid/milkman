(function(){

    var getMethod = require('../config/getGlobalMethod');

    var parseBodyApi = function parseBodyApi(rin , callback){
        this.response = rin;
        this.body = rin.request.body;
        this.callback = callback;
        this.tnxId = rin.header['x-request-id'] || '';
    };

    parseBodyApi.prototype.requestApi = function(){
        var methodName = getMethod.FileName;
        var response = getMethod(methodName.responseHandler)(this.response, this.callback, this.tnxId);
        var resHandle = response.requestHandle.bind(this);
        var selectedMethod = getMethod(this.response.moduleName)(this.response.config , this.tnxId);
        selectedMethod[this.response.apiRedirect](this.body , resHandle);
    };

    module.exports.parseBodyApi = function(rin , callback){
        var dApi = new parseBodyApi(rin , callback);
        dApi.requestApi();
    };
})();
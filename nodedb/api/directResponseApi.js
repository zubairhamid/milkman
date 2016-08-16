(function(){

    var getMethod = require('../config/getGlobalMethod');

    var directResponseApi = function directResponseApi(rin , callback){
        this.response = rin;
        this.body = rin.request.body;
        this.callback = callback;
        this.tnxId = rin.header['x-request-id'] || '';
    };

    directResponseApi.prototype.requestApi = function(){
        var methodName = getMethod.FileName;
        var response = getMethod(methodName.responseHandler)(this.response, this.callback, this.tnxId);
        var resHandle = response.directRequestHandle.bind(this);
        var selectedMethod = getMethod(this.response.moduleName)(this.response.config , this.tnxId);
        selectedMethod[this.response.apiRedirect](this.body , resHandle);
    };

    module.exports.directResponseApi = function(rin , callback){
        var dApi = new directResponseApi(rin , callback);
        dApi.requestApi();
    };
})();
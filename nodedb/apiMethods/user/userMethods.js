(function(){

    var getMethod = require('../../config/getGlobalMethod');

    var methodObj = { Command: require('./command'), Query: require('./query') };

    var Customer = function(config , tnxId){
        this.config = config;
        this.tnxId = tnxId;
        var methodName = getMethod.FileName;
        this.errorResponse = getMethod(methodName.errorResponse)(config);
        this.successResponse = getMethod(methodName.successResponse)(config);
        this.utils = getMethod(methodName.utils).util(this.config, this.tnxId);
        this.model = getMethod(methodName.mongoModelName).Login;
        getMethod(methodName.utils).getMethodObj(methodObj, config).call(this);
    };

    module.exports = function(config , tnxId){
        var defaultPrototype = getMethod(getMethod.FileName.extender)();
        var prototype = getMethod(getMethod.FileName._).assignIn(getMethod(getMethod.FileName.utils).getMethodObj(methodObj, config).prototype, defaultPrototype);
        Customer.prototype = Object.create(prototype);
        return (new Customer(config , tnxId));
    };
})();

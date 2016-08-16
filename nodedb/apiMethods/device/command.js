(function(){

    var getMethod = require('../../config/getGlobalMethod');

    var CommandMethods = function() {
        var methodName = getMethod.FileName;
    };

    CommandMethods.prototype = {
        registerDevice: function(commandObj, callback){
            this.callback = callback;
            this.commandObj = commandObj;
            this.commandObj.deviceId = this.utils.getToken();

            console.log(this.commandObj);
            var resHandle = this.deviceSaved.bind(this);
            this.defaultSaveMethod(this.commandObj, resHandle);
        },
        deviceSaved: function(err, result){
            if(!result){
                var error = this.errorResponse.OperationFailed;
                this.callback(error, null);
            }else{
                this.callback(null, { response: { message: 'Device registered successfully'}});
            }
        }
    };

    module.exports = CommandMethods;
})();
(function(){

    module.exports = function(config){

        var errorResponseCode;
        var errorMessageObj = {};
        try{
            errorResponseCode = require('../templates/errorMessages/'+ config.serviceTo + '/'+ config.setLang +'/errorResponse');
        }catch(err){
            console.log('Cannot find the '+ config.serviceTo + '/' + config.setLang +' error messages');
            errorResponseCode = require('../templates/errorMessages/errorResponse');
        }

        for(var key in errorResponseCode){
            errorMessageObj[key] = {
                status: 400,
                errorCode: key,
                responseData: {
                    message: errorResponseCode[key]
                }
            }
        }
        return errorMessageObj;
    };
})();
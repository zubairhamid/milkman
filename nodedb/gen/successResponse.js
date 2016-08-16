(function(){

    module.exports = function(config){

        var successResponseEngine;
        try{
            successResponseEngine = require('../templates/successMessages/'+ config.serviceTo + '/'+ config.setLang +'/successResponse');
        }catch(err){
            console.log('Cannot find the '+ config.serviceTo + '/' + config.setLang +' success messages');
            successResponseEngine = require('../templates/successMessages/successResponse');
        }
        return successResponseEngine(config);
    };
})();
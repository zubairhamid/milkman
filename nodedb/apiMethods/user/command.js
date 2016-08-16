(function(){

    var getMethod = require('../../config/getGlobalMethod');

    var CommandMethods = function() {
        var methodName = getMethod.FileName;
    };

    CommandMethods.prototype = {
    };

    module.exports = CommandMethods;
})();
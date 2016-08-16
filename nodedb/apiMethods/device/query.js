(function(){

    var getMethod = require('../../config/getGlobalMethod');

    var QueryMethods = function QueryMethods(){
        var methodName = getMethod.FileName;
        this.connectionManager = getMethod(methodName.connectionManager);
    };

    QueryMethods.prototype = {
        getSpecificRecord: function(queryObj, callback){
            this.queryObj = queryObj;
            this.callback = callback;

            this.message = 'User Information';
            var resHandle = this.defaultReturnMethod.bind(this);
            this.defaultFindOneMethod(this.queryObj, resHandle);
        },
        checkForDelivery: function(queryObj, callback){
            this.queryObj = queryObj;
            this.callback = callback;

            var query = { nfcId: this.queryObj.nfcId };
            var resHandle = this.checkMilkSupply.bind(this);
            this.defaultFindOneMethod(query, resHandle);
        },
        checkMilkSupply: function(err, result){
            if(!result){
                var error = this.errorResponse.OperationFailed;
                this.callback(error, null);
            }else{
                var isAvailable = false;
                var milkData = result.userData;
                var milkLeft = parseFloat(milkData.balance) - parseFloat(this.queryObj.needMilk);

                if(milkLeft >= 0){
                    isAvailable = true;
                    result.userData["balance"] = milkLeft;
                    result.save();
                    this.callback(null, {response: {isAvailable: isAvailable, message: this.queryObj.needMilk + ' ltrs Delivered. Balance is ' + result.userData.balance + ' ltrs' }});
                }else{
                    this.callback(null, {response: {isAvailable: isAvailable, message: 'Your balance is only ' + result.userData.balance + ' ltrs. Please rechange immediately.'}});
                }
            }
        }
    };

    module.exports = QueryMethods;
})();
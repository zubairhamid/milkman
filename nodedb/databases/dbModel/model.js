(function () {
    <!--##################################Require the Modules########################################################-->

    var dbConn = require('@cloudmpower/globaldb');

    var modelextender = require('@cloudmpower/modelextender');

    var timestamps = require('@cloudmpower/utils').timestamp;

    module.exports.modelForService = function(service){

        var db = dbConn.getdbConn(service);

        var mongoose = dbConn.getConnMongoose(service),
            Schema = mongoose.Schema;

        <!--##################################Habit Schema###########################################################-->
        <!--#########################################################################################################-->
        var Device = new Schema({
            deviceId                : {type: String, required: true },
            nfcId                   : {type: String, required: true, unique: true },
            userData                : {}
        });

        Device.plugin(timestamps);

        var DeviceModel = module.exports.Device = db.model('device', Device);
        modelextender.populateModel('Device', DeviceModel);
    };
})();
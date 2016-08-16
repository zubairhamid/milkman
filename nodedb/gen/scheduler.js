(function(){

    var moment = require('moment');

    var later = require('later');

    var getMethod = require('../config/getGlobalMethod');

    var methodName = getMethod.FileName;

    var Scheduler = function Scheduler(config, tnxId){
        this.config = config;
        this.config.requestType = 'Query';
        this.tnxId = 'Scheduler Manager';
        this.queryDate = moment().add(1, 'days').format('MM/DD/YYYY');
        this.endDate = new Date(this.queryDate).getTime() + 60 * 60 * 23.9999 * 1000;
        later.date.UTC();
    };

    Scheduler.prototype = {
        runScheduleJobs: function(){
            var everyDay8am = later.parse.text('at 2:30 am');//
            var everyDay730am = later.parse.text('at 2:00 am');//

            var everyDay1130am = later.parse.text('at 6:00 am');//IST REDUCE -5:30 from actual time
            var everyDay = later.parse.text('every 1 mins');//
            var everySaturday = later.parse.text('at 3:30 pm on Sat');
            var everyMonFri = later.parse.text('at 5:30 am on Mon and Fri');

            /*this.scheduleServices("iDidItNotifier", everyDay1130am, this.config, this.tnxId);
            this.scheduleServices("everyWeekEndNotifier", everySaturday, this.config, this.tnxId);
            this.scheduleServices("twiceWeekNotifier", everyMonFri, this.config, this.tnxId);*/

            //this.scheduleServices("alertLastCallToCompleteChallenge", everyDay8am, this.config, this.tnxId);
            //this.scheduleServices("sendScheduledEmails", everyDay730am, this.config, this.tnxId);
        },
        scheduleServices: function(fName, timer, config, tnxId){
            later.setInterval(function(){
                var scheduler = new Scheduler(config, tnxId);
                scheduler[fName]();
            }, timer);
        },
        iDidItNotifier: function(){
            var webServerMethod = getMethod(methodName.webServer);
            this.notifierType = "iDidIt";
            this.notifierMethod = "checkIfIDidItNotFound";

            this.config.gatewayConfig = this.config.notificationConfig;
            var resHandle = this.processEachNotifier.bind(this);

            var webServer = webServerMethod(this.config, this.tnxId);
            webServer.gatewayHandler({}, resHandle);
        },
        processEachNotifier: function(err, result){
            if(result){
                var notifyToMethod = getMethod(methodName[this.notifierType]);
                var responseList = result.responseData.response;
                for(var i = 0; i < responseList.length; i++){

                    var userId = responseList[i].externalId;
                    var query = { userId: userId };

                    var notify = notifyToMethod(this.config, this.tnxId);
                    var resHandle = this.scheduleTaskComplete.bind(this);
                    notify[this.notifierMethod](query, resHandle);
                }
            }
        },
        everyWeekEndNotifier: function(){
            var webServerMethod = getMethod(methodName.webServer);
            this.notifierType = "user";
            this.notifierMethod = "sendWeeklyNotifierToUsers";

            this.config.gatewayConfig = this.config.notificationConfig;
            var resHandle = this.processEachNotifier.bind(this);

            var webServer = webServerMethod(this.config, this.tnxId);
            webServer.gatewayHandler({}, resHandle);
        },
        twiceWeekNotifier: function(){
            var userMethod = getMethod(methodName.user);
            var resHandle = this.scheduleTaskComplete.bind(this);

            var query1 = {query: { "userData.isFirstLogin": true }, handler : "listNotSignedUsers" };
            var query2 = {query: { "userData.isFirstLogin": false }, handler : "listNotSetupUsers" };

            var user1 = userMethod(this.config, this.tnxId);
            user1.sendNotifierToUsers(query1, resHandle);

            var user2 = userMethod(this.config, this.tnxId);
            user2.sendNotifierToUsers(query2, resHandle);
        },
        scheduleTaskComplete: function(){
        }
    };

    module.exports = function(config , tnxId){
        return (new Scheduler(config , tnxId));
    };
})();
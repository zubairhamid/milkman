(function(){

    var scheduler = require('../../gen/scheduler');

    var dbLoadManager = function dbLoadManager(){
        this.tnxId = 'dbLoad Manager';
    };

    dbLoadManager.prototype = {
        defaultManager: function(config){
            console.log('dbLoadBalancer has nothing to do');
        },
        schedulerManager: function(config){
            console.log('dbLoadBalancer has scheduled tasks to run');
            var taskManager = scheduler(config);
            taskManager.runScheduleJobs();
        }
    };

    module.exports = function(){
        return (new dbLoadManager());
    };
})();
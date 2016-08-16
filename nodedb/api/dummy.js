(function(){

    var getMethod = require('../config/getGlobalMethod');

    var dummyApi = function dummyApi(rin , callback){
        this.response = rin;
        this.body = rin.request.body;
        this.callback = callback;
        this.tnxId = rin.header['x-request-id'] || '';
    };

    dummyApi.prototype.requestApi = function(){
        console.log(this.response);
        console.log(this.response.session);
        this.response.session.startingAt = new Date();
        this.response.session.endingAt = new Date('01/01/2016');

        this.response.body = {responseData: { status: 200, message: 'Please contact the administrator'}};
        this.callback(null, this.response);
            /*this.response.status = 400;
        //console.log(this.response.params);

        /!*var responseXML = '<?xml version="1.0" encoding="UTF-8"?>'+
            '<Response>'+
            '<Say voice="woman" language="en">Jack and Jill </Say>'+
            '<Pause length="1"/>'+
            '<Say voice="woman" language="en">Went up the hill</Say>'+
            '<Pause length="1"/>'+
            '<Say voice="woman" language="en">To fetch a pail of water,</Say>'+
            '<Pause length="1"/>'+
            '<Say voice="woman" laguage="en">Jack fell down </Say>'+
            '<Pause length="1"/>'+
            '<Say voice="woman" language="en">And broke his crown </Say>'+
            '<Pause length="1"/>'+
            '<Say voice="woman" language="en">And Jill came tumbling after.</Say>'+
            '<Pause length="2"/>'+
            '<Say voice="woman" language="en">You are not Jack and I am not Jill. Thank you</Say>'+
        '</Response>';*!/
        var responseXML = '<?xml version="1.0" encoding="UTF-8"?>'+
            '<Response>'+
            '<Say>Welcome to Cloud m power Customer Service!</Say>'+
        '<Gather action="http://159.203.243.37:5170/check/input" finishOnKey="*">'+
            '<Say>Press 1 for customer service.</Say>'+
        '<Say language="en-gb">Press 2 for British customer service.</Say>'+
        '<Say>Press star after you selection</Say>'+
        '</Gather>'+
        '</Response>';
            */
    };

    module.exports.dummyApi = function(rin , callback){
        var dApi = new dummyApi(rin , callback);
        dApi.requestApi();
    };
})();
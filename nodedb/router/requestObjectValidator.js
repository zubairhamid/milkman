(function(){
    var paperwork = require('@cloudmpower/utils').paperwork;

    module.exports.habitSteps = function(arr){
        var schema = [{ "step"                :"" }];

        if(!paperwork.accepted(schema, arr)) throw new Error('Incorrect Body parameters');
        return paperwork.accepted(schema, arr);
    };

    module.exports.corePractiseHabit = function(arr){
        var schema = [""];

        if(!paperwork.accepted(schema, arr)) throw new Error('Incorrect Body parameters');
        return paperwork.accepted(schema, arr);
    };

    module.exports.onBoardingEmail = function(arr){
        var schema = [{
            "userId"        : "",
            "name"          : "",
            "userName"      : "",
            "password"      : "",
            "emailId"       : "",
            "mobileNo"      : ""
        }];

        if(!paperwork.accepted(schema, arr)) throw new Error('Incorrect Body parameters');
        return paperwork.accepted(schema, arr);
    };

    module.exports.habitEvaluator = function(arr){
        var schema = [{
            "question"          : "",
            "options"           : [{
                "optionId"      : "",
                "optionText"    : "",
                "optionPoints"  : ""
            }],
            "isMultipleSelect"  : true
        }];

        if(!paperwork.accepted(schema, arr)) throw new Error('Incorrect Body parameters');
        return paperwork.accepted(schema, arr);
    };

    module.exports.completedChallenge = function(arr){
        var schema = [{
            completeDated     : "",
            dayNo             : "",
            dateStatus        : true
        }];

        if(!paperwork.accepted(schema, arr)) throw new Error('Incorrect Body parameters');
        return paperwork.accepted(schema, arr);
    };
})();
(function(){

    var validator = require('../requestObjectValidator');

    module.exports = {
        "/client/integrate/dummy": {
            "request": {
                "method"                            : "POST"
            }
        },
        "/client/image/:id/:extension": {
            "request": {
                "method"                            : "POST"
            }
        },
        "/client/nfc/register": {
            "request": {
                "method"                            : "POST",
                "body"                              : {
                    "nfcId"                         : ".+",
                    "userData"                      : {
                        "name"                      : ".+",
                        "balance"                   : ".+"
                    }
                }
            }
        },
        "/client/nfc/check/info": {
            "request": {
                "method"                            : "POST",
                "body"                              : {
                    "nfcId"                         : ".+"
                }
            }
        },
        "/client/nfc/milk/service": {
            "request": {
                "method"                            : "POST",
                "body"                              : {
                    "nfcId"                         : ".+",
                    "needMilk"                      : ".+"
                }
            }
        }
    };
})();
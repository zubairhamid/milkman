(function () {

    var router = require('@cloudmpower/router');

    var config = require('./routerConfig');

    module.exports.apiCalls = config.routeList();

    var Route = function Route(app , rin) {
        var routes = config.routeConfig();

        return function(callback){
            var routerHandler = router(rin , routes);
            var resHandle = routerHandler.routerController.bind(routerHandler);
            resHandle(callback);
        };
    };

    module.exports.route = function(app , rin){
        return (new Route(app , rin));
    };
})();
(function(){

    var apiLoader = require('@cloudmpower/apiloader');

    var send = require('koa-send');

    module.exports = function (app) {

        app.route('/client')
            .get(function * (next) {
            yield send(this, './public/client/index.html');
        });

        app.route('/client/image/:id/:extension')
            .get(function * (next) {
            var requestParam = this.request.params;
            var imagePath = requestParam.id + '/' + requestParam.id + '.' + requestParam.extension;
            yield send(this, './nodedb/imageAbstractor/' + imagePath);
        });

        apiLoader(app, './nodedb/router/client/apiConfig');
    };
})();
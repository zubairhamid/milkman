(function(){

    var path = require('path');

    var routing = require('koa-routing');

    var bodyParser = require('koa-body');

    var scheme = require('koa-scheme');

    //var session = require('koa-generic-session');

    //var mongoStore = require('koa-generic-session-mongo');

    var restricted = require('@cloudmpower/serverblocker');

    var swagger = require('swagger-injector');

    var config = require('@cloudmpower/serverconfig');

    var schemeValidator = require('./routeValidator');

    module.exports = middleware;

    function middleware (app){

        // logger
        app.use(function *(next){
            var start = new Date;
            console.log('method- %s url- %s time- %s ms', this.method, this.url, start);

            yield next;
            var ms = new Date - start;
            //this.set('X-Response-Time', ms + 'ms');
            console.log('method- %s url- %s time- %s ms status- %s', this.method, this.url, ms , this.status);
        });

        /*Swagger-Injector*/
        app.use(swagger.koa({route: '/client/definition',swagger: './swagger.json'}));

        //Application Server Restrict
        app.use(restricted);

        //Body Parser
        app.use(bodyParser({jsonLimit: '5mb'}));

        //Session Handling . Session Key
        //app.keys = ['1ClientJollywell1', 'ClientJollywellSession'];

        /*app.use(session({
            cookie      : {
                path        : '/',
                httpOnly    : true,
                maxage      : (60 * 60 * 24 * 1000 * 3),
                rewrite     : true,
                signed      : true
            },
            store       : new mongoStore({
                url     : 'mongodb://127.0.0.1:27017/session'
            })
        }));*/

        //Config Specific Vendor
        app.use(function *(next){
            var configFile = this.header['x-config'] || 'systemConfig';
            var configFilePath = path.resolve('./nodedb/config/' + configFile + '.json');
            this.config = config(configFilePath);
            yield next;
        });

        //Request/Response Body Validation
        app.use(scheme(schemeValidator));

        //Routing
        app.use(routing(app));

        //Load Routes
        var route = require('./routeHandler')(app);

        //Handle redundant Url for all Vendors
        app.use(function *(){
            this.body = 'The Url is not found';
        });

        return app;
    }
})();
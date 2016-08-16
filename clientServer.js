(function(){

    var koa = require('koa');

    var app = koa();

    var appPort = 7171;

    var databaseLoaderManager = require('./nodedb/databases/dbMethods/dbLoadManager');

    var loadMultipleDatabases = require('@cloudmpower/databasemanager');

    var loadDb = databaseLoaderManager();
    var afterLoad = loadDb.defaultManager.bind(loadDb);

    var inputConfig = process.argv[2] || 'systemConfig';
    var systemConfigFile = './nodedb/config/'+ inputConfig +'.json';
    //Load Database
    loadMultipleDatabases(systemConfigFile, afterLoad);

    var middleware = require('./nodedb/router/client/middleware');

    //Load Middleware
    middleware(app);

    //On error
    app.on('error', function(err , ctx){
        console.log('server error', err.stack);
        console.log('server error', err , ctx);
        var responseError = { status: 409 , responseData: {message: 'Incorrect Request'}};
        if(ctx.method == "POST") {
            ctx.status = 409;
            ctx.res.writeHead(409, {'Content-Type': 'application/json'});
            ctx.res.write(JSON.stringify(responseError));
            ctx.res.end();
        }
    });

    app.listen(appPort);
    console.log('webServer listening to ' + appPort);

    process.on('uncaughtException', function (err) {
        console.error(err.stack);
        console.log('Uncaught Error Occurred. Handling Error and Reporting log');
    });

    process.on('error', function (err) {
        console.error(err.stack);
        console.log('Process Error Occurred. Handling Error and Reporting log');
    });
})();
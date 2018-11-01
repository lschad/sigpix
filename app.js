let routes = require('./routes');
let db = require('./db');
let server = require('./server');
let middleware = require('./middleware');
let bodyParser = require('body-parser');
require('./banner').print();

db.Connect()
    .then(server.Start)
    .then(middleware.xPoweredBy)
    .then(app => {
        return new Promise(resolve => {
            app.use(bodyParser.urlencoded({ extended: false }));
            resolve(app);
        });
    }) .then(routes.CreateAll)

    .catch(console.error);
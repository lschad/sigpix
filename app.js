let routes = require('./routes');
let db = require('./db');
let server = require('./server');
let middleware = require('./middleware');
require('./banner').print();

db.Connect()
    .then(server.Start)
    .then(middleware.xPoweredBy)
    .then(routes.CreateAll)
    .catch(console.error);
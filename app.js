let routes = require('./routes');
let db = require('./db');
let server = require('./server');
require('./banner').print();

db.Connect()
    .then(server.Start)
    .then(routes.CreateAll)
    .catch(console.error);
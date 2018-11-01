let globals = require('./globals');
let express = require('express');

module.exports = server = {
    Start: function (app) {
        return new Promise(function (resolve, reject) {
            let app = express();
            app.listen(globals.PORT, globals.HOST, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(app);
                    console.info(`Listening on ${globals.HOST}:${globals.PORT}`);
                }
            });
        });
    }
};
const express = require('express');
const mongoose = require('mongoose');
const Track = require('./models/Track');
const globals = require('./globals');
const routes = require('./routes');

const app = express();

function ConnectDatabase(obj) {
    return new Promise((resolve, reject) => {

        let opts = {useNewUrlParser: true};
        let credentials = (!!obj.DB_USER && !!obj.DB_PASS) ? `${obj.DB_USER}:${obj.DB_PASS}@` : '';
        let connectionString = `mongodb://${credentials}${obj.DB_HOST}:${obj.DB_PORT}/${obj.DB_NAME}`;

        mongoose
            .connect(connectionString, opts)
            .then(() => resolve(obj))
            .catch(err => reject(err));
    });
}

function StartServer(obj) {
    return new Promise(function (resolve, reject) {
        app.listen(obj.PORT, obj.HOST, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(obj);
                console.log(`Listening on ${obj.HOST}:${obj.PORT}`);
            }
        });
    });
}

function CreateRoutes(obj) {
    return new Promise((resolve) => {
        routes.createAll(app);
        resolve(obj);
    });
}


ConnectDatabase(globals)
    .then(StartServer)
    .then(CreateRoutes)
    .catch(console.error);
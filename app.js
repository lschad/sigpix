const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connection;

const appObj = {
    HOST: process.env.SP_HOST || '0.0.0.0',
    PORT: process.env.SP_PORT || 8080,
    DB_HOST: process.env.SP_DBHOST || '127.0.0.1',
    DB_PORT: process.env.SP_DBPORT || '27017',
    DB_NAME: process.env.SP_DBNAME || 'sigpix',
    DB_USER: process.env.SP_DBUSER || '',
    DB_PASS: process.env.SP_DBPASS || '',
    SIGNATURE: process.env.SP_SIGNATURE || path.join(__dirname, 'blank.png')
};

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

function SetupRoutes(obj) {
    return new Promise((resolve, reject) => {
        app.get('/:id/signature', (req, res) => {

            let info = {
                id: req.params['id'],
                Timestamp: new Date().toISOString(),
                UserAgent: req.headers['user-agent'] || 'unknown',
                ipv4: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            };


            res.sendFile(obj.SIGNATURE);
        });

        resolve(obj);
    });
}


ConnectDatabase(appObj)
    .then(StartServer)
    .then(SetupRoutes)
    .catch(console.error);
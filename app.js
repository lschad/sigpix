const express = require('express');
const mongoose = require('mongoose');
const Track = require('./models/Track');
const globals = require('./globals');

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

        app.get('/:id/signature', (req, res) => {

            let info = {
                id: req.params['id'],
                timestamp: new Date().toISOString(),
                ua: req.headers['user-agent'] || 'unknown',
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            };

            let track = new Track(info);
            track.save(err => {
                if (err) return console.error(err);
            });

            res.sendFile(obj.SIGNATURE);
        });

        app.get('/log', (req, res) => {
            Track.find((err, tracks) => {
                if (err) return res.send(err);
                return res.send(tracks);
            });
        });

        app.get('/log/:id', (req, res) => {
            Track.find({id: req.params['id']}, (err, tracks) => {
                if (err) return res.send(err);
                return res.send(tracks);
            });
        });

        resolve(obj);
    });
}


ConnectDatabase(globals)
    .then(StartServer)
    .then(CreateRoutes)
    .catch(console.error);
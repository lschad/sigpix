let globals = require('../globals');
let base62 = require("base62/lib/ascii");
let Track = require('../models/Track')

let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890!"§$%&/()=ß?´`üöä#+*\'-.,;:_<>^°@€'.toLowerCase().split('');

module.exports = newid = {
    Create: function (app) {
        app.post('/newid', (req, res) => {

            let to = '';
            let index = 0;
            while (!!req.body[`to[email][${index}]`]) {
                to += (!!to ? ',' : ' ') + req.body[`to[email][${index}]`];
                index++;
            }
            let from = req.body['from[email]'];
            let date = req.body['date[short]'];
            let time = req.body['time[seconds]'];
            let subject = req.body['subject'];

            if (!to || !from || !date || !time || !subject) {
                res.send('400 - Bad Request');
            } else {
                let phrase = `${to}${from}${date}${time}${subject}`;
                let np = '';

                for (let i = 0; i < phrase.length; i++) {
                    let letter = phrase.split('')[i].toLowerCase();
                    let index = abc.indexOf(letter);
                    if (index > -1) {
                        np += index;
                    }
                }

                let encoded = base62.encode(np);
                res.send(`http://localhost:8080/${encoded}/signature`);
                new Track({
                    id: req.params['id'],
                    timestamp: new Date().toISOString(),
                    ua: req.headers['user-agent'] || 'unknown',
                    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                    type: 'REQUEST'
                }).Save();
            }
        });
    }
};
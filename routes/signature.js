let globals = require('../globals');
let Track = require('../models/Track');

module.exports = {
    Create: function (app) {

        app.get('/:id/signature', (req, res) => {

            let track = new Track({
                id: req.params['id'],
                timestamp: new Date().toISOString(),
                ua: req.headers['user-agent'] || 'unknown',
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            });
            track.save((err, track) => {
                if (err) return console.error(err);
                console.debug(`Saved new Track\n${track}`);
            });


            res.sendFile(globals.SIGNATURE);
        });
    }
};
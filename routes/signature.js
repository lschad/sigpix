let globals = require('../globals');
let Track = require('../models/Track');

module.exports = {
    Create: function (app) {

        app.get('/:id/signature', (req, res) => {

            new Track({
                id: req.params['id'],
                timestamp: new Date().toISOString(),
                ua: req.headers['user-agent'] || 'unknown',
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                type: 'VIEW'
            }).Save();

            res.sendFile(globals.SIGNATURE);
        });
    }
};
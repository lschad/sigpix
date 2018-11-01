let Track = require('../models/Track');

module.exports = {
    create: function (app) {
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
    }
};
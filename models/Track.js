let mongoose = require('mongoose');

let TrackSchema = new mongoose.Schema({
    id: String,
    timestamp: String,
    ua: String,
    ip: String
});

module.exports = mongoose.model('Track', TrackSchema);
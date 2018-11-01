let mongoose = require('mongoose');

let TrackSchema = new mongoose.Schema({
    id: String,
    timestamp: String,
    ua: String,
    ip: String,
    type: ['VIEW', 'REQUEST']
});

TrackSchema.methods.Save = function(){
    this.save((err, track) => {
        if (err) return console.error(err);
        console.info(`Track saved.\n${this}`)
    });
};

module.exports = mongoose.model('Track', TrackSchema);
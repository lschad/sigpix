module.exports = {
    createAll: function(app){
        require('./signature').create(app);
        require('./log').create(app);
    }
};
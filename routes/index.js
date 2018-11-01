module.exports = {
    CreateAll: function(app){
        require('./signature').Create(app);
        require('./log').Create(app);
    }
};
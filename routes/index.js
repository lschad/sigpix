module.exports = {
    CreateAll: function (app) {
        return new Promise((resolve) => {
            require('./signature').Create(app);
            require('./log').Create(app);
            resolve(app);
        });
    }
};
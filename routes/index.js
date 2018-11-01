module.exports = {
    CreateAll: function (app) {
        return new Promise((resolve) => {
            require('./signature').Create(app);
            require('./log').Create(app);
            require('./newid').Create(app);
            resolve(app);
        });
    }
};
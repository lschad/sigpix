module.exports = {
    xPoweredBy: function (app) {
        return new Promise(resolve => {
            require('./x-powered-by')(app);
            resolve(app);
        });
    }
};
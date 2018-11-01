module.exports = function (app) {
    app.use((req, res, next) => {
        res.removeHeader("X-Powered-By");
        next();
    });
};
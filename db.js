let mongoose = require('mongoose');
let globals = require('./globals');

module.exports = db = {
  Connect: function () {
      return new Promise((resolve, reject) => {

          let opts = {useNewUrlParser: true};
          let credentials = (!!globals.DB_USER && !!globals.DB_PASS) ? `${globals.DB_USER}:${globals.DB_PASS}@` : '';
          let connectionString = `mongodb://${credentials}${globals.DB_HOST}:${globals.DB_PORT}/${globals.DB_NAME}`;

          mongoose
              .connect(connectionString, opts)
              .then(() => resolve())
              .catch(err => reject(err));
      });
  }
};
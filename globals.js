const path = require('path');

module.exports = globals = {
    HOST: process.env.SP_HOST || '0.0.0.0',
    PORT: process.env.SP_PORT || 8080,
    DB_HOST: process.env.SP_DBHOST || '127.0.0.1',
    DB_PORT: process.env.SP_DBPORT || '27017',
    DB_NAME: process.env.SP_DBNAME || 'sigpix',
    DB_USER: process.env.SP_DBUSER || '',
    DB_PASS: process.env.SP_DBPASS || '',
    SIGNATURE: process.env.SP_SIGNATURE || path.join(__dirname, 'blank.png')
};
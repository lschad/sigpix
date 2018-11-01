const path = require('path');
const express = require('express');

const signature = process.env.SP_SIGNATURE || path.join(__dirname, 'blank.png');
const app = express();

const HOST = process.env.SP_HOST || '0.0.0.0';
const PORT = process.env.SP_PORT || 8080;

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

app.get('/:id/signature', (req, res) => {

    let info = {
        id: req.params['id'],
        Timestamp: new Date().toISOString(),
        UserAgent: req.headers['user-agent'] ||'unknown',
        ipv4: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    };

    // save to mongodb
    res.sendFile(signature);
});
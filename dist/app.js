const express = require('express');

const app = express();
let port = process.env.PORT || 8080;
app.listen(port);
app.get('/signature/:id', function (req, res) {
  console.log(req.params);
  res.sendFile('signature.png', {});
});
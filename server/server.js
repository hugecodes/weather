const express = require('express');
const app = express();
const weather = require('./weather');

app.use(express.static('public'));

app.get('/search', (req, res) => {
  weather.search(req.query.city, (err, httpRes, body) => {
    res.status(httpRes.statusCode).json(body);
  });
});

app.listen(3000, () => {
  console.log('Weather app listening on port 3000!');
});

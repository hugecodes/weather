const request = require('request');

// URL to the root of the Open Weather API.
const baseUrl = 'http://openweathermap.org/data/2.5/';

// This is the key that OpenWeatherMap uses on their actual site, so I assume
// it has unlimited access.
const apiKey = 'b1b15e88fa797225412429c1c50c122a';

function sendRequest(config, cb) {

  const requestOptions = {
    url: `${ baseUrl }${ config.path }`,
    qs: config.qs || {},
    json: true,
  };

  requestOptions.qs.appid = apiKey;

  request(requestOptions, cb);

}

module.exports = {

  search: function(query, cb) {

    // The API doesn't do so well with spaces in city names. They need to be
    // replaced with hyphens or underscores.
    const qs = { q: query.split(' ').join('-') };

    sendRequest({ path: 'find', qs }, cb);

  },

};

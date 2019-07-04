const request = require('request');

const fetchMyIP = (callback) => {

  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      callback(`Error 💀, the response status is at ${response.statusCode} on IP ${body}`);
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
};

module.exports = { fetchMyIP };
const request = require('request');

const fetchMyIP = (callback) => {

  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      callback(`Error 💀, the response status is at ${response.statusCode} on IP ${body}`, null);
    } else {
      const ipData = JSON.parse(body);
      callback(null, ipData.ip);
    }
  });

};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      callback(`Error 💀, the response status is at ${response.statusCode} on IP ${body}`, null);
    } else {
      const coordinates = JSON.parse(body);
      callback(null, coordinates.data.latitude);
      callback(null, coordinates.data.longitude);
    }
  });

};

module.exports = {
  fetchMyIP, 
  fetchCoordsByIP
};
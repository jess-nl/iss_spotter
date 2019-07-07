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
      const lat = coordinates.data.latitude;
      const long = coordinates.data.longitude;
      callback(null, {lat, long});
      // callback(null, coordinates.data.altitude;
      // console.log(body)
    }
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.long}`, (error, response, body) => {

    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      callback(`Error 💀, the response status is at ${response.statusCode} on IP ${body}`, null);
    } else {
      const coordinates = JSON.parse(body);
      callback(null, coordinates.response);
    }
  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
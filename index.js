const { fetchMyIP } = require('./iss');
// const breedName = process.argv[2];

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
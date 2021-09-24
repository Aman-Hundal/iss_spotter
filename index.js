const request = require('request');
const { nextISSTimesForMyLocation }  = require('./iss');
// const cordinateObj = { latitude: 49.0982, longitude: -123.0316 };
// const IP = "162.156.135.117";

//test to get IP ADDRESS
// fetchMyIP((error, ip) => {
//   if (error) { //checks to see if error is present or null (meaning error, null or null,error.)
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

//test for function 2 to get LAT AND LON
// fetchCoordsByIP(IP, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , data);
// });

//test for function 3 to get ISS data
// fetchISSData(cordinateObj, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , data);
// });


//FINAL STEP

//addtional function to loop over final function result and print iss times as strings
const printIssTimes = function(issArray) {
  for (let riseTime of issArray) {
    console.log(`Risetime at ${riseTime.risetime} with a duration of ${riseTime.duration}.`);
  }
};

//Implementaion of final function which calls the chained callback function from iss.js
nextISSTimesForMyLocation((error, result) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printIssTimes(result);
});
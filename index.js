const request = require('request');
const { fetchMyIP, fetchCoordsByIP, fetchISSData }  = require('./iss');
const cordinateObj = { latitude: 49.0982, longitude: -123.0316 };
const IP = "162.156.135.117";

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
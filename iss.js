const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 *
 * we will use ipify.org API to get our ip address
 */
const fetchMyIP = function(callback) { //callback will do the same thing as breedfetcher; callback will expect to take two args - error and ip for the callback. If error/param 1 exsits/returned (meaining error, null on the callback passed below) then print the error/param1. If error/param1 is null and does not exist (meaning null, data in our callback passed below) then print the data/param2 or IP in our case.
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) { // As error code from request would be null (A FALSY VALUE) this is saying if (true) as error would not be null and would contain chars in a string (meaning truthy)
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP Address. Reponse: ${body}`;
      callback(Error(msg), null); //creates a new error object that we can pass around. AND AGAIN AS THE FIRST PARAM IS BEING PRESENTED AND THE SECOND BEING NULL. THE IF(ERROR) is executed as the first param exists.
      return;
    }
    let data = JSON.parse(body);
    callback(null, data.ip);
  });
};

//function #2 -> will be one that takes in an IP address and returns the latitude and longitude for it as an obj
const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP Address. Reponse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body);
    const latLongObj = {latitude: data.latitude, longitude: data.longitude};
    callback(null, latLongObj);
  });
};

//function 3 to grab iss data using long and lat
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSData = function(coordsObj, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coordsObj.latitude}&lon=${coordsObj.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching response times for ISS. Reponse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body);
    const issResponse = data.response;
    callback(null, issResponse);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSData
};


//FETCHMYIP + FETCHCOORD RULES CALLBACK RULES
// It should:
// pass through the error to the callback if an error occurs when requesting the IP data
// parse and extract the IP address using JSON and then pass that through to the callback (as the second argument) if there is no error

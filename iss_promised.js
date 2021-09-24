const request = require('request-promise-native'); // NOTE THIS LIBRARY IS A PROMISED BASED LIBRARY AND CREATES PROMISE OBJECTS AND KNOWS HOW TO DEAL WITH THEM AND INCORPORATE THEM
//ALSO THIS MEANS THAT IT RETURNS A PROMISE FOR EACH ASYNC NETWORK REQUEST (AS SEEN BELOW)

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  // console.log(request("https://api.ipify.org?format=json"))
  return request("https://api.ipify.org?format=json"); // the request function when called from the requset library imported above returns a PROMISE OBJCET already and therefore a promise object does not need to be created.
}; // the above request will return a JSON object of our ip adress

/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(ipJSON) {
  let ip = JSON.parse(ipJSON).ip;
  return request(`https://freegeoip.app/json/${ip}`); //next when doing your function call -> .then() this return value to store the async value.
  // this returns a geo object in JSON
};

/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from freegeoip.app
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSData = function(geoJSON) {
  let geoObj = JSON.parse(geoJSON);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${geoObj.latitude}&lon=${geoObj.longitude}`); // will return a promise object with a value of ISS data object as JSON.
};


//NOW FINAL STEP. MAKE THE PARENT FUNCTION/OVEREACHING FUNCTION THAT CALLS ALL THRE ABOVE THREE CREATED FUNCTIONS AND USES .THEN CHAINS TO GET YOUR FINAL RESULT
const nextISSTimesForMyLocation = function() {
  return fetchMyIP() // TO RETURN A PROMISED OBJECT FROM THE INTIAL REQUEST MADE IN FETHCH MY IP
    .then(fetchCoordsByIP) // chain over results
    .then(fetchISSData) // chain over results
    .then((carriedOverResults) => { // now take your results and modify them and return them. When we call Nextisstimesformylocaton we will use .then on this final function to access them. 
      let finalResult = JSON.parse(carriedOverResults)
      return finalResult.response //THIS FINAL RETURN VALUE IS A PROMISE
     });
};

module.exports = {
  nextISSTimesForMyLocation
}
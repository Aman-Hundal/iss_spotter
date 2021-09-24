const {fetchMyIP ,fetchCoordsByIP,fetchISSData, nextISSTimesForMyLocation} = require("./iss_promised");
const cordinateObj = { latitude: 49.0982, longitude: -123.0316 };
const IP = "162.156.135.117";

//to use on final result from the promised chain value
const printIssTimes = function(issArray) {
  for (let riseTime of issArray) {
    console.log(`Risetime at ${riseTime.risetime} with a duration of ${riseTime.duration}.`);
  }
};

//STEP 1:
//PROMISED RETURN OF IP ADDRESS -> you are calling .then on your request object which is a promised object and therefore .then() works. The .then takes in a call which takes the value of your return (your request call which is a JSON OBJECT with YOUR IP)
// fetchMyIP().then((result => {
//   console.log(result);
// }))

//STEP 2: Chain the prvious function toe the fetchcords fucntion
//PROMISED RETURN OF LAT&LONG OBJ -> function has been defined and returns a promised object, NOW STORE THAT RETURNED OBJCET IN A .THEN (to transfer the value for later). This will store your lat and long object.
//NOTE -> BY CALLING .THEN() YOU ARE NOTE RETURNING THE VALUE FROM THE ASYNCH FUNCTION YOU ARE JUST PROVIDING A PROMISE CONTAINER FOR IT. THEREFORE YOU HAVE TO USE THE CALLBACK TO TAKE THE RESULT (THE RETURN VALUE FROM THE FUNCTION CRATION) TO ASSGN IT TO .THEN
// CHAIN THE FETCHCOOPRDS TO FETCH MY IP
// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(result => console.log(result))

//STEP3: CHAIN THE PREVIOUS FUNCTIONS TO ADD FETTCH ISSDATA -> ITS DOING THE SAMET THING AS ABOVES
// fetchMyIP()
// .then(fetchCoordsByIP)
// .then(fetchISSData)
// .then(result => console.log(result))

//STEP 4: MOVE THE CHAINING FUNCTIONS TO THE OVERREACHIGN FUNCTION CALLED nextISSTimesForMyLocation  in iss promised. THESE WILL COMPOSE YOUR FINAL FUNCTION. IN INDEX -> just call the final function and pass in a .then to get accesss to the final result provided by the final funciton.
nextISSTimesForMyLocation() // WE NEED TO USE .THEN TO GET ACCESS TO THE RESULTS AS THE return value in the function creation is a promise object.
  .then((finalResult => {
    printIssTimes(finalResult);
  }))
  .catch((error) => {
    console.log("It didnt work:", error.message) //an overall error method from promise object is added which will catch any errors from our request call. If there is any error along the chain of promises the execution will jump to our catch callback.
  })

// OVERALL you are just chaining thens (which are promise methods THAT HOLD promise values WHICH ARE THE RETURN CODES IN YOUR FUNCTION CREATION/DECLARATION in iss ) and PASSING OVER THE RESULT FROM YOUR async functions (made in iss) to one another UNTIL YOU GET YOUR WANTED RESULT. see final function for end resuklt

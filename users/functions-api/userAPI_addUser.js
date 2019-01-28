function main(args) {
  console.log("Score API Action called");
  console.log("Args:" + JSON.stringify(args));

  // require the openwhisk npm package
  var ow = require("openwhisk");

  // read apihost, auth, and namespace from params
  var apiHost = args.FUNCTIONS_APIHOST;
  var namespace = "_";
  var auth = args.FUNCTIONS_AUTHORIZATION;

  // generate api_key from auth
  var base64Auth = new Buffer(auth).toString("base64");
  var apiKey = "Basic " + base64Auth;
  var options = { apihost: apiHost, api_key: apiKey, namespace: namespace };

  // instantiate the openwhisk instance before you can use it
  var openwhisk = ow(options);

  // http://www.stevenatkin.com/index.php/2017/05/16/using-async-and-promises-in-openwhisk/

  return new Promise(function(resolve, reject) {
    //  REST api
    var request = require("request");
    var reqURL = args.USERAPI_URL + "registeruser";
    console.log("URL: \n", reqURL);
    var restoptions = {
      method: "POST",
      url: reqURL,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-ibm-client-secret": args.USERAPI_CLIENT_SECRET,
        "x-ibm-client-id": args.USERAPI_CLIENT_ID
      },
      body: {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        signedTerms: args.signedTerms,
        registrationDate: args.registrationDate
      },
      json: true
    };

    request(restoptions, function(error, response, body) {
      console.log("in request");
      if (error) {
        console.error("Failed: %s", error.message);
        reject(error);
      } else {
        console.log("Success: ", body);
        console.log("Response:", response);

        resolve(body);
      }
    });
  });
}

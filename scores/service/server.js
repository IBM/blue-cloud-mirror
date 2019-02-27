const express = require("express");
const path = require("path");
const { get } = require("request");
const app = express();
// Auth
const basicAuth = require('express-basic-auth');
var fs = require("fs");

// Server configuration
require("dotenv").config(); // Used for the configuration (https://www.npmjs.com/package/dotenv)
require("dotenv").load();
var cors = require("cors");
var bodyParser = require("body-parser");

// Cors
// app.options("*", cors()); // preflight
app.use(cors());

app.use(bodyParser.json({ type: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const publicDir = path.join(__dirname, "./public");
app.use(express.static(publicDir));
app.use(express.static(path.join(__dirname, "./public")));

// Create the connection to the cloudant service
var Cloudant = require("@cloudant/cloudant");

// Set process variables
if ( process.env.VCAP_SERVICES != undefined)
{ 
  console.log("VCAP_SERVICES :", process.env.VCAP_SERVICES);
  var envVCAP = JSON.parse(process.env.VCAP_SERVICES)
  var username = envVCAP.cloudantNoSQLDB[0].credentials.username;
  var password = envVCAP.cloudantNoSQLDB[0].credentials.password;
  var urlCloudant = envVCAP.cloudantNoSQLDB[0].credentials.url;
  var portCloudant = envVCAP.cloudantNoSQLDB[0].credentials.port;
  var url = "" + urlCloudant + ":" + portCloudant + "";
} else {
  var username = process.env.CLOUDANT_USERNAME;
  var password = process.env.CLOUDANT_PASSWORD;
  var urlCloudant = process.env.CLOUDANT_URL;
  var portCloudant = process.env.CLOUDANT_PORT;
  var url = "" + urlCloudant + ":" + portCloudant + "";
}

// cloudant
var dbname = process.env.CLOUDANT_NAME;
var des_scores = process.env.CLOUDANT_DES_SCORES;
var idx_scores = process.env.CLOUDANT_IDX_SCORES;
var des_highscore = process.env.CLOUDANT_DES_HIGHSCORE;
var idx_highscore = process.env.CLOUDANT_IDX_HIGHSCORE;
var highscoreViewDef = "highscore_view.json";
var scoreIndexDef = "score_index.json";
// server
var base_path = process.env.BASE_PATH;
var port = process.env.PORT || 3000;
var defaultStatusReturn = 500;
// auth
var service_userid = process.env.SERVICE_USER;
var service_password = process.env.SERVICE_PASSWORD;
var auth = '{"'+ service_userid +'":"'+service_password+'"}';
var authVar = JSON.parse(auth);
app.use(basicAuth({
  users: authVar,
  unauthorizedResponse: {"error": "unauthorized"}
}));

app.get("/", (req, res) => res.redirect(base_path));
app.get(base_path, (req, res) =>
  res.sendFile(path.join(publicDir, "index.html"))
);


var cloudantClient = Cloudant(
  { username: username, password: password, url: url },
  function(err, cloudant, info) {
    if (err) {
      return console.log("Failed to initialize Cloudant: " + err.message);
    }
    console.log("INIT INFORMATION ", info); // {"couchdb":"Welcome","version": ...
    // Lists all the databases.
    cloudant.db
      .list()
      .then(body => {
        body.forEach(db => {
          console.log("DATABASES :", db);
          console.log("Serivce Auth:", JSON.stringify(authVar));
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
);

/* **********************************************
 * description: Connect or create a database.
 *              Creates the needed index and view.
 *              Setup "cors" as wild card.
 * path:        /api/v1/setupDB
 * method:      GET
 * header:      "Content-Type": "application/json"
 *
 * parameter:
 * ==========
 * no
 *
 * return JSON:
 * ============
 * Database information
 * *********************************************/

app.get("/api/v1/setupDB", cors(), function(req, res) {
  setupDB(function(db, info) {
    console.log("DB /api/db/v1/setupDB", db.config);
    console.log("Info /api/db/v1/setupDB", info);
    var result = null;
    if (db == null) {
      result = { Error: "No database object returned!" };
      res.status(defaultStatusReturn).json({
        status: result
      });
      //res.statusCode = defaultStatusReturn;
      //res.json(result);
    } else {
      result = {
        dbconfig: JSON.stringify(db.config),
        setupinfo: info
      };
      res.json(result);
    }
  });
});

/* **********************************************
 * description: Add score
 * path:        /api/v1/addscore
 * method:      POST
 * header:      "Content-Type": "application/json"
 *
 * parameter JSON:
 * ===============
 * firstName, lastName and email are strings
 * gameDate is date (see below)
 * score is integer (time in milliseconds, the smaller the better)
 *
 * request body:
 * { firstName: String,
 *   lastName: String,
 *   gameDate: int,
 *   score: int }
 *
 * return JSON:
 * ============
 * response:
 * Http 200: success
 * response body: { id: xxx }
 * id is string with of high score record
 * alternative: empty response body {}
 * ******************************************** */

app.post("/api/v1/addscore", cors(), function(req, res) {
  var result = null;
  if (req != undefined) {
    console.log("=> Request  \n ", req.toString());
    console.log("=> Headers  \n ", JSON.stringify(req.headers));
    const contentType = req.headers["content-type"];

    if (contentType && contentType.indexOf("application/json") !== -1) {
      if (req.body != undefined) {
        console.log("=> Body  \n ", JSON.stringify(req.body));
        if (
          req.body.firstName != undefined &&
          req.body.lastName != undefined &&
          req.body.gameDate != undefined &&
          req.body.score != undefined
        ) {
          result = req.body;
          var db = cloudantClient.db.use(dbname);
          var id = req.body.firstName + " " + req.body.lastName;
          var score = {
            score: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              gameDate: req.body.gameDate,
              score: req.body.score,
              uid: id
            }
          };

          db.insert(score, function(err, body, header) {
            if (err) {
              result = {};
              console.log("---> [db.insert] error: ", err.message);
              res.statusCode = defaultStatusReturn;
              res.json(result);
            } else {
              console.log("---> You have inserted the data.");
              console.log("---> Result : " + body);
              result = { _id: body.id };
              res.json(result);
            }
          });
        } else {
          result = {};
          res.statusCode = defaultStatusReturn;
          res.json(result);
        }
      } else {
        result = {};
        res.statusCode = defaultStatusReturn;
        res.json(result);
      }
    } else {
      result = {};
      res.statusCode = defaultStatusReturn;
      res.json(result);
    }
  } else {
    result = {};
    res.statusCode = defaultStatusReturn;
    res.json(result);
  }
});

/* **********************************************
 * description: Delete scoring data
 * path:        /api/v1/deletescore
 * method:      POST
 * header:      "Content-Type": "application/json"
 *
 * parameter JSON:
 * ===============
 * {
 *  "score" : { "id": "XXX",
 *              "rev": "XXXX"
 *            }
 * }
 *
 * return JSON:
 * ============
 * Success:
 * {
 *   "ok": true,
 *   "id": "c05d7563faf34d243d9a634a55218dac",
 *   "rev": "2-cabe8f192a513718598a2d88d47f18b5"
 * }
 * ******************************************** */

app.post("/api/v1/deletescore", cors(), function(req, res) {
  var result = null;
  var id = null;
  var rev = null;

  if (req != undefined) {
    console.log("Request", req.toString());
    console.log("Headers", JSON.stringify(req.headers));
    const contentType = req.headers["content-type"];

    if (contentType && contentType.indexOf("application/json") !== -1) {
      if (req.body != undefined) {
        console.log("==> req.body \n", req.body);
        if (req.body.score != undefined) {
          if (
            req.body.score.id != undefined &&
            req.body.score.rev != undefined
          ) {
            result = req.body;
            console.log("Delete Body: ", JSON.stringify(req.body));
            id = req.body.score.id;
            rev = req.body.score.rev;

            var db = cloudantClient.db.use(dbname);
            db.destroy(id, rev, function(err, body, header) {
              if (err) {
                result = { Error: "" + err.message + "" };
                console.log("---> [db.destroy] error : ", err.message);
                res.status(defaultStatusReturn).json({
                  status: result
                });
                //res.statusCode = defaultStatusReturn;
                //res.json(result);
              } else {
                console.log("---> You have destroyed the data.");
                console.log("---> Result : " + JSON.stringify(body));
                result = body;
                res.json(result);
              }
            });
          } else {
            result = {
              Error:
                "Request does not contain a score id or rev! " +
                JSON.stringify(req.body) +
                ""
            };
            console.log("result", result);
            res.status(defaultStatusReturn).json({
              status: result
            });
            //res.statusCode = defaultStatusReturn;
            //res.json(result);
          }
        } else {
          result = {
            Error:
              "Request does not contain a score id or rev! " +
              JSON.stringify(req.body) +
              ""
          };
          console.log("result", result);
          res.status(defaultStatusReturn).json({
            status: result
          });
          //res.statusCode = defaultStatusReturn;
          //res.json(result);
        }
      } else {
        result = { Error: "Request does not contain a body!" };
        console.log("result", result);
        res.status(defaultStatusReturn).json({
          status: result
        });
        //res.statusCode = defaultStatusReturn;
        //res.json(result);
      }
    } else {
      result = { Error: "Request is not in application/json format!" };
      console.log("result", result);
      res.status(defaultStatusReturn).json({
        status: result
      });
      //res.statusCode = defaultStatusReturn;
      //res.json(result);
    }
  }
});

/* **********************************************
 * description: possible search for score values
 * path:        /api/v1/searchscore
 * method:      GET
 * header:      "Content-Type": "application/json"
 *
 * query parameter JSON:
 * ===============
 * KEY: searchTopic=theScore
 * KEY: searchString=50
 *
 * searchTopic:
 * ============
 * theScore: no wild card
 * theScoreGameTime: no wild card
 * theScoreFirstName: wild card
 * theScoreLastName: wild card
 * theScoreUID: wild card
 *
 * return JSON:
 * ============
 * List of search result.
 * **********************************************/

app.get("/api/v1/searchscore", cors(), function(req, res) {
  var result = null;
  if (req != undefined) {
    console.log("=> Headers: \n ", JSON.stringify(req.headers));
    console.log("=> Query: \n ", JSON.stringify(req.query));
    const contentType = req.headers["content-type"];

    //if (contentType && contentType.indexOf("application/json") !== -1) {
    if (req.query != undefined) {
      console.log("=> Query \n ", JSON.stringify(req.query));

      inSearchTopic = req.query.searchTopic;
      inSearchString = req.query.searchString;

      console.log("=> inSearchTopic \n ", inSearchTopic);
      console.log("=> inSearchString \n ", inSearchString);

      var query = {
        searchTopic: req.query.searchTopic,
        searchString: req.query.searchString
      };
      console.log("=> searchString \n ", query.searchString);
      if (query.searchTopic != undefined && query.searchString != undefined) {
        var searchTopic = query.searchTopic;
        var searchString = query.searchString;
        console.log("database name: ", dbname);
        var db = cloudantClient.db.use(dbname);
        var search = { q: "" + searchTopic + ":" + searchString + "" };
        console.log("search: ", search);

        db.search(des_scores, idx_scores, search, function(err, body, header) {
          if (err) {
            result = { Error: "" + err.message + "" };
            console.log("---> [db.search] ", err.message);
            res.status(defaultStatusReturn).json({
              status: result
            });
            //res.statusCode = defaultStatusReturn;
            //res.json(result);
          } else {
            // build score list
            var rowcount = body.total_rows;
            var list = [];
            var i = 0;
            for (i = 0; i < rowcount; i++) {
              list.push({
                uid: body.rows[i].fields.theScoreUID,
                score: body.rows[i].fields.theScore,
                gameDate: body.rows[i].fields.theScoreGamedate,
                firstName: body.rows[i].fields.theScoreFirstName,
                lastName: body.rows[i].fields.theScoreLastName
              });
            }
            result = list;
            console.log("---> You have searched for following data.");
            console.log("---> Result " + result);
            error = null;
            res.json(result);
          }
        });
      } else {
        result = {
          Error: "Request does not contain a search topic and search string!"
        };
        console.log("result", result);
        res.status(defaultStatusReturn).json({
          status: result
        });
        //res.statusCode = defaultStatusReturn;
        //res.json(result);
      }
    } else {
      result = { Error: "Request does not contain a query!" };
      console.log("result", result);
      res.status(defaultStatusReturn).json({
        status: result
      });
      //res.statusCode = defaultStatusReturn;
      //res.json(result);
    }
    /*
    } else {
      result = { Error: "Request is not in application/json format!" };
      console.log("result", result);
      res.statusCode = defaultStatusReturn;
      res.json(result);
    }
    */
  }
});

/* **********************************************
 * description: Get the best number of emotions
 * path:        /api/v1/gethighscore
 * method:      GET
 * header:      "Content-Type": "application/json"
 *
 * parameter JSON:
 * ===============
 * No parameter
 *
 * return JSON:
 * ============
 * Get list of the best highscores
 * **********************************************/

app.get("/api/v1/gethighscore", cors(), function(req, res) {
  var result = null;
  console.log("database name: ", dbname);
  var db = cloudantClient.db.use(dbname);
  var view = { include_docs: true, descending: false, update: true };

  console.log("view: ", view);
  db.view(des_highscore, idx_highscore, view, function(err, body, header) {
    if (err) {
      result = { Error: "" + err.message + "" };
      console.log("---> [db.view] ", err.message);
      res.status(defaultStatusReturn).json({
        status: result
      });
      //res.statusCode = defaultStatusReturn;
      //res.json(result);
    } else {
      result = JSON.stringify(body);
      console.log("---> This is your view for following data.");
      console.log("---> Result list " + result);
      result = JSON.parse(result);
      if (result.total_rows != 0) {
        console.log("---> Result 0 " + JSON.stringify(result.rows[0]));
        var highscore = result.rows[0].doc.score.score;
        console.log("---> highscore ", highscore);
        searchhighscore(highscore, function(error, list) {
          if (error) {
            result = error;
            res.status(defaultStatusReturn).json({
              status: result
            });
            //res.statusCode = defaultStatusReturn;
            //res.json(result);
          } else {
            result = list;
            res.json(result);
          }
        });
      } else {
        result = { Error: "NO HIGHSCORE AVAILABLE" };
        console.log("---> highscore", highscore);
        res.status(defaultStatusReturn).json({
          status: result
        });
        //res.statusCode = defaultStatusReturn;
        //res.json(result);
      }
    }
  });
});

/* **********************************************
 * description: Get the score list
 * path:        /api/v1/getscorelist
 * method:      GET
 * header:      "Content-Type": "application/json"
 *
 * parameter JSON:
 * ===============
 * No parameter
 *
 * return JSON:
 * ============
 * Score list
 * **********************************************/

app.get("/api/v1/getscorelist", cors(), function(req, res) {
  var result = null;
  console.log("database name: ", dbname);
  var db = cloudantClient.db.use(dbname);
  var view = { include_docs: true, descending: false, update: true };
  console.log("view: ", view);
  db.view(des_highscore, idx_highscore, view, function(err, body, header) {
    if (err) {
      result = { Error: "" + err.message + "" };
      console.log("---> [db.view] ", err.message);
      res.status(defaultStatusReturn).json({
        status: result
      });
      //res.statusCode = defaultStatusReturn;
      //res.json(result);
    } else {
      var rowcount = body.total_rows;
      var list = [];
      var i = 0;
      for (i = 0; i < rowcount; i++) {
        list.push({
          uid: body.rows[i].doc.score.uid,
          score: body.rows[i].doc.score.score,
          gameDate: body.rows[i].doc.score.gameDate,
          firstName: body.rows[i].doc.score.firstName,
          lastName: body.rows[i].doc.score.lastName,
          _id: body.rows[i].doc._id,
          _rev: body.rows[i].doc._rev
        });
      }
      console.log("---> This is your view for following data.");
      console.log("---> Result " + JSON.stringify(list));
      result = list;
      res.json(result);
    }
  });
});

app.listen(port, () => console.log("Listening on port (" + port + ")"));

/* **********************************************
 *
 * description: Get the highscore list
 *
 * parameter:
 * ===============
 * score: highscore number to search
 *
 * return JSON:
 * ============
 * score list with the values of highscore
 * **********************************************/

function searchhighscore(score, callback) {
  var db = cloudantClient.db.use(dbname);
  var error = null;
  var search = { q: "theScore:" + score + "" };
  console.log("searchhighscore: ", search);
  db.search(des_scores, idx_scores, search, function(err, body, header) {
    if (err) {
      console.log("---> [db.searchhighscore] ", err.message);
      result = null;
      error = { Error: "" + err.message + "" };
      callback(error, result);
    } else {
      // build score list
      var rowcount = body.total_rows;
      var list = [];
      var i = 0;
      for (i = 0; i < rowcount; i++) {
        list.push({
          uid: body.rows[i].fields.theScoreUID,
          score: body.rows[i].fields.theScore,
          gameDate: body.rows[i].fields.theScoreGamedate,
          firstName: body.rows[i].fields.theScoreFirstName,
          lastName: body.rows[i].fields.theScoreLastName
        });
      }
      result = list;
      error = null;
      console.log("---> You have searched for following data.");
      console.log("---> Result " + result);
      callback(error, result);
    }
  });
}

function createScoreIndex(db, callback) {
  var content = fs.readFileSync(scoreIndexDef);
  var result = null;
  db.insert(content, function(err, body, header) {
    if (err) {
      result = { Error: "" + err.message + "" };
      console.log("---> [createScoreIndex] ", err.message);
      result = null;
      callback(err, result);
    } else {
      console.log("---> You have inserted the data.");
      console.log("---> result " + JSON.stringify(body));
      result = body;
      err = null;
      callback(err, result);
    }
  });
}

function createHighscoreView(db, callback) {
  var content = fs.readFileSync(highscoreViewDef);
  var result = null;
  db.insert(content, function(err, body, header) {
    if (err) {
      result = { Error: "" + err.message + "" };
      console.log("---> [createHighscoreView] ", err.message);
      result = null;
      callback(err, result);
    } else {
      console.log("---> You have inserted the data.");
      console.log("---> result " + JSON.stringify(body));
      result = body;
      err = null;
      callback(err, result);
    }
  });
}

function setupDB(callback) {
  // check if DB exists if not create
  cloudantClient.db.create(dbname, function(err, res) {
    if (err) {
      console.log(
        "Could not create new db: " +
        dbname +
          ", it might already exist."
      );
    } else {
      console.log("DB result:", res);
    }

    var db = cloudantClient.db.use(dbname);
    var result = "";
    var setupresult = new Object();

    console.log("Set DB result", db.config);
    createHighscoreView(db, function(err, res) {
      if (err) {
        console.log("Error create view: " + JSON.stringify(err));
        result = result + "] Error View: [" + JSON.stringify(err) + "]";
        setupresult.view = err.message;
        setupresult.index =
          "Because of the view error index will not be created";
        setupresult.cors =
          "Because of the view error, cors settings will not be touched";
        callback(db, setupresult);
      } else {
        result = "Index: " + JSON.stringify(res);
        setupresult.view = "view success";
        setupresult.cors = "Cors not enabled";
        createScoreIndex(db, function(err, res) {
          if (err) {
            console.log("Error create index: " + JSON.stringify(err));
            result = result + " Error Index: [" + JSON.stringify(err) + "]";
            setupresult.index = err.message;
            setupresult.cors =
              "Because of the index error, cors settings will not be touched";
            callback(db, setupresult);
          } else {
            result = result + "] Index: [" + JSON.stringify(res) + "]";
            console.log("Result: " + result);
            setupresult.index = "index success";
            cloudantClient
              .set_cors({
                enable_cors: true,
                allow_credentials: true,
                origins: ["*"]
              })
              .then(data => {
                // success - response is in 'data'.
                console.log("Success enable cors: " + JSON.stringify(data));
                result = result + " Core: [" + JSON.stringify(data) + "]";
                setupresult.core = "cors success";
                callback(db, setupresult);
              })
              .catch(err => {
                // failure - error information is in 'err'.
                console.log("Error enable cors: " + JSON.stringify(err));
                result = result + " Error Cors: [" + JSON.stringify(err) + "]";
                setupresult.core = err.message;
                console.log("setupresult : " + JSON.stringify(setupresult));
                callback(db, setupresult);
              });
          }
        });
      }
    });
  });
}

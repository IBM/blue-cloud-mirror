var Cloudant = require('@cloudant/cloudant');
var fs = require("fs");
require('dotenv').load();

var username = process.env.CLOUDANT_USERNAME;
var password = process.env.CLOUDANT_PASSWORD;
var dbname = process.env.CLOUDANT_NAME;
var highscoreViewDef = "../../highscore_view.json";
var scoreIndexDef = "../../score_index.json";

let cloudant = new Cloudant({ account: username, password: password, plugins: 'promises' });

cloudant.db.create(dbname).then(() => {
    let db = cloudant.use(dbname);
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
            reject(setupresult);
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
                reject(setupresult);
            } else {
                result = "[" + result + "] Index: [" + JSON.stringify(res) + "]";
                console.log("Result: " + result);
                setupresult.index = "index success";
                cloudant.set_cors({
                    enable_cors: true,
                    allow_credentials: true,
                    origins: ["*"]
                  })
                  .then(data => {
                    // success - response is in 'data'.
                    console.log("Success enable cors: " + JSON.stringify(data));
                    result = result + " Core: [" + JSON.stringify(data) + "]";
                    setupresult.core = "cors success";
                    resolve(setupresult);
                  })
                  .catch(err => {
                    // failure - error information is in 'err'.
                    console.log("Error enable cors: " + JSON.stringify(err));
                    result = result + " Error Cors: [" + JSON.stringify(err) + "]";
                    setupresult.core = err.message;
                    console.log("setupresult : " + JSON.stringify(setupresult));
                    reject(setupresult);
                  });
            }
        });
          }
    });
}).catch((err) => {
    console.log(err);
});

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
const express = require("express");
const path = require("path");
const app = express();
var http = require("http");
var bodyParser = require("body-parser");

/**** NOT USED
const basicAuth = require('express-basic-auth');
var service_userid = process.env.SERVICE_USER;
var service_password = process.env.SERVICE_PASSWORD;
var auth = '{"'+ service_userid +'":"'+service_password+'"}';
var authVar = JSON.parse(auth);
app.use(basicAuth({
  users: authVar,
  unauthorizedResponse: {"error": "unauthorized"},
  challenge: true,
  realm: 'Imb4T3st4pp'
}));
*****/

app.use(bodyParser.json({ type: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const distDir = path.join(__dirname, "./dist");
app.use(express.static(distDir));
app.use(express.static(path.join(__dirname, "./dist")));

var port = process.env.PORT || 3001;

http
  .createServer(app)
  .listen(port, () => console.log("Listening on port (" + port + ")"));

app.get("/", (req, res) => res.redirect("/bluecloudmirror-highscore-webapp"));
app.get("/bluecloudmirror-highscore-webapp", (req, res) => {
    res.sendFile(path.join(distDir, "index.html"))
  } 
);

app.get("/api/v1/test", function(req, res) {
  var result = { message: "Blue Cloud Mirror - High Score webapp is running" };
  res.json(result);
});

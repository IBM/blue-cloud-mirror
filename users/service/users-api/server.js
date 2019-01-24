var dateformat = require('dateformat');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json() );  
app.use(bodyParser.urlencoded({extended: true})); 
const basicAuth = require('express-basic-auth');


// URL to CouchDB
// K8s or Docker set environment variable, local reads config.json
//
if (process.env.COUCHDBURL) {
    var couchdb = require("nano")(process.env.COUCHDBURL); 
} else {
    var config = require('./config.json');
    var couchdb = require("nano")(config.couchdburl);
}

// Enable basic auth 
// Secure connection between APIC and SecGW
// Environment variable is set in users-api-deployment-minikube.yaml
if (process.env.BASICAUTH) {
    var aut = JSON.parse(process.env.BASICAUTH); 
} else {
    var aut = JSON.parse('{"admin": "Passw0rd!"}');
    console.log("Env var BASICAUTH not set!")
}
console.log(aut);
app.use(basicAuth({
    users: aut,
    unauthorizedResponse: {"error": "unauthorized"}
}));


// Check if db exists, if not create and insert view as designdoc
console.log('===>>  Trying to create database, will "fail" if it already exists');
couchdb.db.create("hidata", function(err, res) {
    if (err) {
        console.log('===>>  Could not create hidata, seems to exist: ' + err);
    } else {
        console.log('===>>  Table hidata created.'); 
        // Try to create view
        couchdb.use("hidata").insert(
            {"views": {"data_by_name": {"map": function (doc) {emit (doc._id, doc);}}}}, '_design/hidataview', function (error, response) {
                if (error) { 
                    console.log("===>>  Inserting view failed. " + error); 
                } else { 
                    console.log("===>>  View 'highdataview' inserted."); 
                } 
            }
        );  
    }
});

var hidata = couchdb.use("hidata");

// debug since db.create does not give a meaningful error message
// read hiscore db and print rows count to console.log
hidata.view("hidataview", "data_by_name", function (err, body, header) { 
    if (err) { 
        console.log('===>> Error: ' + err ); } 
    else { 
        if ( JSON.stringify(body.rows.length) > 0 ) {  //do we have a result?
            console.log("===>>  Success connecting to hiscore -- rows count: " + JSON.stringify(body.total_rows)); }  
        else {
            console.log("===>>  Success connecting to hiscore -- no rows, hiscore db is empty"); 
        }
    } 
});    

// Create/Insert a record
//
// POST JSON object
//
// {
//    "firstname": "Franziska",
//    "lastname": "Schneider",
//    "email": "fs@example.de",
//    "signedTerms": "true",
//    "registrationDate": "1234567890"
//  }
//
app.post('/registeruser', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var signedTerms = req.body.signedTerms;
    var registrationDate = req.body.registrationDate;
    var id = firstName + " " + lastName;    //This will be the _id in CouchDB
    var now = new Date();
    var timestmp = dateformat(now, "isoDateTime").toString();  //Maybe interesting to see when data was added
    var entry = {
            "_id": id,
            "lastName": lastName, 
            "firstName": firstName,
            "email": email,
            "signedTerms": signedTerms,
            "registrationDate": registrationDate,
            "time": timestmp
    };
    // Addt'l check added:
    // First test if a record by this name exists
    hidata.view("hidataview", "data_by_name", {key: id}, function (err, body, header) { 
        if (err) { 
             console.log("===>>  ERR: Read failed " + err); 
        } else {
            if ( JSON.stringify(body.rows.length) > 0 ) {  //do we have a result?
                res.writeHead(200, { "Content-Type": "application/json" }); 
                res.end('{"id": ' + JSON.stringify(body.rows[0].value._id) + '}'); 
                console.log('===>>  Read successful, record exists, no need to insert'); 
            } else {
                // Record does not exist, write it
                console.log('===>>  Record does not exist, write it'); 
                hidata.insert(entry, entry._id, function(err, body, header) { 
                    if(err) { 
                        res.writeHead(500, { "Content-Type": "application/json" }); 
                        res.end('{"error": "' + err + '"}'); 
                        console.log("===>>  ERR: Create failed " + err);
                    } else { 
                        res.writeHead(200, { "Content-Type": "application/json" }); 
                        res.end('{"id": ' + JSON.stringify(body.id) + '}');
                        console.log('===>>  Create successful: ' + entry._id); 
                    }
                });
            }
        } 
    });    



});

// Read a record
//
// GET w/ query
//
//  /read/?lastname='lastname'&firstname='firstname'
//
app.get('/read', function(req, res) {
    var firstname = req.query.firstname;
    var lastname = req.query.lastname;
    var name = firstname + " " + lastname;
    hidata.view("hidataview", "data_by_name", {key: name}, function (err, body, header) { 
        if (err) { 
            res.writeHead(500, { "Content-Type": "application/json" }); 
            res.end('{"error": "' + err +  '"}');
            console.log("===>>  ERR: Read failed " + err); 
        } else {
            if ( JSON.stringify(body.rows.length) > 0 ) {  //do we have a result?
                res.writeHead(200, { "Content-Type": "application/json" }); 
                res.end(JSON.stringify(body.rows[0].value)); 
                console.log('===>>  Read successful'); 
            } else {
                res.writeHead(200, { "Content-Type": "application/json" }); 
                res.end('{"error": "no result"}'); 
                console.log('===>>  Read successful but no results'); 
            }
        } 
    });    
});

// Delete a record
//
// GET w/ query
//
//  /delete/?lastname='lastname'&firstname='firstname'
//
app.get('/delete', function(req, res) {
    var firstname = req.query.firstname;
    var lastname = req.query.lastname;
    var name = firstname + " " + lastname;
    hidata.view("hidataview", "data_by_name", {key: name}, function (err, body, header) { 
        if (err) { 
            res.writeHead(500, { "Content-Type": "application/json" }); 
            res.end('{"error": "' + err +  '"}');
            console.log("===>>  ERR: Delete failed " + err); 
        } else {
            if ( JSON.stringify(body.rows.length) > 0 ) {  // We have a result
                id = body.rows[0].value._id;
                rev = body.rows[0].value._rev;
                hidata.destroy(id, rev, function(err, body, header) { 
                    if(err) { 
                        res.writeHead(500, { "Content-Type": "application/json" }); 
                        res.end('{"error": "' + err + '"}'); 
                        console.log("===>>  ERR: Delete failed " + err);
                    } else { 
                        res.writeHead(200, { "Content-Type": "application/json" }); 
                        res.end('{"deleted": ' + JSON.stringify(id) + '}');
                        console.log('===>>  delete successful: ' + id ); 
                    }
                });
             } else {
                res.writeHead(200, { "Content-Type": "application/json" }); 
                res.end('{"error": "no record found for deletion"}'); 
                console.log('===>>  delete: no record found'); 
            }
        } 
    });    
});



// List all records
app.get('/list', function(req, res) {
    hidata.view("hidataview", "data_by_name", function (err, body, header) { 
        if (err) { 
            res.writeHead(500, { "Content-Type": "application/json" }); 
            res.end('{"error": "' + err +  '"}'); 
            console.log("===>>  ERR: List failed " + err);
        } else { 
            if ( JSON.stringify(body.rows.length) > 0 ) {  //do we have a result?
                res.writeHead(200, { "Content-Type": "application/json" }); 
                res.end('{"result": {"total_rows": ' + JSON.stringify(body.total_rows) + ', "rows": ' + JSON.stringify(body.rows) + '}}'); 
                console.log('===>>  List successful'); 
            } else {
                res.writeHead(200, { "Content-Type": "application/json" }); 
                res.end('{"error": "no result"}'); 
                console.log('===>>  List successful but no results'); 
            }
        } 
    });    
});


// Say something meaningful when called without URI
app.get('/', function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" }); 
    res.end("IBM Developer Advocates, DACH: This is the Blue Cloud Mirror Users API"); 
});

// Start the server
app.listen(3000, function () {
    console.log('Blue Cloud Mirror - Users API listening on port 3000!')
   });
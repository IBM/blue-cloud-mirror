## Users API


### Connection to CouchDB

There are two ways to configure the URL to access CouchDB. 

Environment variable COUCHDBURL, either local:

`export COUCHDBURL='http://icpadmin:icpadmin@172.17.20.215:31608' `

or using "env" in K8s deployment yaml, see the files in the K8s directory.

Or, for a local installation, create a config.json file 
```
{
"couchdburl": "http://icpadmin:icpadmin@172.17.20.215:31608"
}
```
## API 

This is an example for the request header required by the Users API:
```
Content-Type:application/json
Accept:application/json
x-ibm-client-id:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
x-ibm-client-secret:YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
```
x-ibm-client-id and x-ibm-client-secret are set in API Connect.


### Insert / Register a User

URI: /registeruser 

Method: POST

Body:
```
{ "firstName": "Hans",
  "lastName": "Maier",
  "email": "user@test.de",
  "signedTerms": "true",
  "registrationDate": "1547050380" }
```
firstName, lastName and email are strings, 
signedTerms is boolean (false, true), 
registrationDate is Unix date (milliseconds since 1-1-1970)

response:
Http 200: success

response body:
`{ id: xxx }`

_id is string 'firstName + space + lastName'_

/registeruser will check if a record with 'Firstname Lastname' exists and then simply return the id.


### Read

URI: /read?lastname='lastname'&firstname='firstname'

Method: GET

Example: `http://localhost:3000/read?lastname=Müller&firstname=Hans`

```
{"result": {
    "_id":"Hans Müller",
    "_rev":"1-cbf5fe120d23cc77b0dce4a54519574e",
    "lastName":"Müller",
    "firstName":"Hans",
    "email":"user@test.de",
    "signedTerms":"true",
    "registrationDate":"1547050380",
    "time":"2019-01-09T15:21:56+0000"}}
```
If no result found: `{"error": "no result"}`


### Delete

URI: /delete/?lastname='lastname'&firstname='firstname'

Method: GET

Example: `http://localhost:3000/delete?firstname=Müller&lastname=Hans`

Result:
```
{"deleted": "Hans Müller"}
```
or
```
{"error": "no record found for deletion"}
```


### List

URI: /list

Method: GET

Result: List number of rows and content of all rows in database


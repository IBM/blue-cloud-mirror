var Cloudant = require('@cloudant/cloudant');
require('dotenv').load();

var username = process.env.CLOUDANT_USERNAME;
var password = process.env.CLOUDANT_PASSWORD;

let cloudant = new Cloudant({ account: username, password: password, plugins: 'promises' });

cloudant.db.create('blue-mirror').then(() => {
    let db = cloudant.use('blue-mirror');
}).catch((err) => {
    console.log(err);
});
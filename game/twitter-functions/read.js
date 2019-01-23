//------------------------------------------------------------------------------
// Copyright IBM Corp. 2019
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------

var Cloudant = require('@cloudant/cloudant');

function main(params) {

    return new Promise(function (resolve, reject) {
        try {
            let cloudant = new Cloudant({ account: params.config.cloudant_username, password: params.config.cloudant_password, plugins: 'promises' });
            let db = cloudant.db.use('blue-mirror');

            db.get('theoneandonlydoc', function (err, data) {
                if (err) {
                    console.log(err);
                    reject({ error: err })
                }
                else {
                    let contents = {
                        headers: { 'Content-Type': 'image/png' },
                        statusCode: 200,
                        body: data.image
                    };
                    resolve(contents);
                }
            });
        }
        catch (error) {
            reject({ error: error })
        }
    })
}
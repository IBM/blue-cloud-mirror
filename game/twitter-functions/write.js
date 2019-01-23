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

            var doc = {
                _id: 'theoneandonlydoc',
                image: params.image
            };

            db.list(function (err1, result1) {
                if (err1) {
                    console.log(err1);
                    reject({ error: err1 })
                }
                else {
                    if (result1.rows.length == 0) {
                        db.insert(doc, function (err2, result2) {
                            if (err2) {
                                console.log(err2);
                                reject({ error: err2 })
                            }
                            else {
                                resolve({ success: true });
                            }
                        });
                    }
                    else {
                        db.destroy(result1.rows[0].id, result1.rows[0].value.rev, function (err3, result3) {
                            if (err3) {
                                console.log(err3);
                                reject({ error: err3 })
                            }
                            else {
                                db.insert(doc, function (err4, result4) {
                                    if (err4) {
                                        console.log(err4);
                                        reject({ error: err4 })
                                    }
                                    else {
                                        resolve({ success: true });
                                    }
                                });
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            reject({ error: error })
        }
    })
}
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dboper = require('./operations'); //allows database operations on any mongo db

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

//sequential execution of db methods. inserts a doc, finds it then updates it, then deletes collection
    dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, //asynchronous
        "dishes", function (result) {
            console.log(result.ops);

            dboper.findDocuments(db, "dishes", function (docs) { //nested because asynchronous
                console.log(docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" },
                    "dishes", function (result) {
                        console.log(result.result);

                        dboper.findDocuments(db, "dishes", function (docs) {
                            console.log(docs)

                            db.dropCollection("dishes", function (result) {
                                console.log(result);

                                db.close();
                            });
                        });
                    });
            });
        });
});

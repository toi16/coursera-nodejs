//generic mongodb node module

var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback) {  //function is exported
      // Get the documents collection
  var coll = db.collection(collection);
      // Insert some documents
  coll.insert(document, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted " + result.result.n + " documents into the document collection "
                 + collection);
    callback(result); //return result of insert
  });
};

exports.findDocuments = function(db, collection, callback) {
  // Get the documents collection
  var coll = db.collection(collection);

  // Find some documents
  coll.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs); //return docs
  });
};

exports.removeDocument = function(db, document, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Delete the document
  coll.deleteOne(document, function(err, result) { //deletes first doc that matches document
    assert.equal(err, null);
    console.log("Removed the document " + document);
    callback(result); //return result of deletion
  });
};

exports.updateDocument = function(db, document, update, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Update document
  coll.updateOne(document //updates first doc that meets criteria
    , { $set: update }, null, function(err, result) {

    assert.equal(err, null);
    console.log("Updated the document with " + update);
    callback(result); //return result of update
  });
};

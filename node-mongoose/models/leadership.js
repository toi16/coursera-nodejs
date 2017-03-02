// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var leaderSchema = new Schema({
    name: { //field name
        type: String, //field type
        required: true, //is required yes
        unique: true //must be unique
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
  });

// the schema is useless so far
// we need to create a model using it
var Leaders = mongoose.model('Leader', leaderSchema);

// make this available to our Node applications
module.exports = Leaders;

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
//comment schema for sub-document
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1, //validate data =>1
        max: 5, //validate data <=5
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true //created at updated at
});

// create a schema
var dishSchema = new Schema({
    name: { //field name
        type: String, //field type
        required: true, //is required yes
        unique: true //must be unique
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments:[commentSchema] //sub document using commentSchema. comments points to array of sub docs
}, {
    timestamps: true //adds created at and updated at fields. auto updated
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;

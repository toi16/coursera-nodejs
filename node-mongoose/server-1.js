//mongoose builds on top of mongo node module to add strucure to documents using ODM schemas
//schema creates structure of document. defines filds nd types. can do validation.
//model uses schema to work with documents

var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);  //connect to db using mongoose'
var db = mongoose.connection; //define db variable
db.on('error', console.error.bind(console, 'connection error:')); //connection failure error logging
db.once('open', function () { //db.once only does this once
    // we're connected!
    console.log("Connected correctly to server");  //log successful connection

    // create a new user
    var newDish = Dishes({ //new object using dishes model
        name: 'Uthapizza',
        description: 'Test'
    });

    // save the user
    newDish.save(function (err) { //save dish object created above
        if (err) throw err;
        console.log('Dish created!');

        // get all the users
        Dishes.find({}, function (err, dishes) { //mongodb find method
            if (err) throw err;

            // object of all the users
            console.log(dishes);
                        db.collection('dishes').drop(function () { //delete dishes collection
                db.close(); //close db connection
            });
        });
    });
});

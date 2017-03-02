var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Leaders.create({
        name: 'Peter Pan',
        image: 'images/alberto.png',
        designation: 'Cheif',
        abbr: 'CEO',
        description: 'featuring'

    }, function (err, dish) {
        if (err) throw err;
        console.log('Leader created!');
        console.log(dish);

        db.collection('leaders').drop(function () {
            db.close();
        });
          // get all the dishes

    });
});

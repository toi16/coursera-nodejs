var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Promotions.create({
        name: 'Weekend Buffet',
        image: 'images/buffet.png',
        label: 'New',
        price: '19.99',
        description: 'featuring'

    }, function (err, dish) {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(dish);

        db.collection('promotions').drop(function () {
            db.close();
        });
          // get all the dishes

    });
});

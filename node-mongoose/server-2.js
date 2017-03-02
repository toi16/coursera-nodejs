var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { //only run this once
    // we're connected!
    console.log("Connected correctly to server");
    // create a new dish
    Dishes.create({ //creates a new dish automatically, db.once
        name: 'Uthapizza',
        description: 'Test'
    }, function (err, dish) { //callback function returns error or success
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id; //doc id of dish

        // get all the dishes
        setTimeout(function () { //wait 3 seconds before executing the following code
            Dishes.findByIdAndUpdate(id, { //find doc by ID method
                    $set: { //update doc with data below
                        description: 'Updated Test'
                    }
                }, {
                    new: true //returns updated dish after it has been updated
                })
                .exec(function (err, dish) { //returns updated dish by executing above code.
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    db.collection('dishes').drop(function () {
                        db.close();
                    });
                });
        }, 3000); // 3 seconds time delay for setTimeout function
    });
});

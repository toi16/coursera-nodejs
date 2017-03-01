// express router REST API
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express(); //assign instance of express to app variable
//express methods include app.all, app.get, app.post, app.put, app.delete. REST methods
// express app routes use the format app.all('/dishes', function(req,res,next){...});
// express app routes with params use the format app.get('/dishes/:dishId', function(req,res,next){res.end('Will send details:'+req.params.dishId)});
// the above use incoming requests in header
// incoming requests that have json in body are parsed using middleware bodyParser.

//express router creates a mini express app.

app.use(morgan('dev')); //initialise morgan

var dishRouter = express.Router(); //initialise an express router called dishRouter

dishRouter.use(bodyParser.json()); //express router uses bodyParser to process json data in the body of request

dishRouter.route('/')  //define an express route /
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
}) // no semicolon because is chained to route /

.get(function(req,res,next){
        res.end('Will send all the dishes to you!');
})

.post(function(req, res, next){
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting all dishes');
}); //semicolon as is end of chaining to route /

dishRouter.route('/:dishId') //define an express route /:dishId
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
}) // no semicolon because is chained to route /:dishId

.get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
}); //semicolon as is end of chaining to route /:dishId

app.use('/dishes',dishRouter); //if url has /dishes then use express dishRouter

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

var express = require('express'); //import express
var morgan = require('morgan'); //import morgan (prints log info to server side)

var hostname = 'localhost';
var port = 3000;

var app = express(); // app is using express framework

app.use(morgan('dev')); //morgan middleware executed before express. express app uses morgan middleware

// express app uses express middlewarw
app.use(express.static(__dirname + '/public'));  //__dirname is full path to directory. express middleware only uses GET.

app.listen(port, hostname, function(){ // start server using shorthand express app
  console.log(`Server running at http://${hostname}:${port}/`);
});

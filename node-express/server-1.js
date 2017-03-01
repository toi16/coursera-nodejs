var express = require('express'), //import express web framework
     http = require('http'); //import http module

var hostname = 'localhost'; //initialise hostname
var port = 3000; //initialis port

var app = express(); //initialise app variable with express

app.use(function (req, res, next) { // use method of express app
  console.log(req.headers);
    res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<html><body><h1>Hello World</h1></body></html>');

});

var server = http.createServer(app); //initialise server using express

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

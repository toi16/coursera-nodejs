var http = require('http'); //import http node module

var hostname = 'localhost'; //local variable for host name
var port = 3000; //local variable for port to use

var server = http.createServer(function(req, res){ //create a server with following config
  console.log(req.headers); //display request headers
  res.writeHead(200, { 'Content-Type': 'text/html' }); //write Ok 200 and content type to response header
  res.end('<html><body><h1>Hello World</h1></body></html>'); //response body sent back to client
}) //end of function

//start the server
server.listen(port, hostname, function(){
  console.log('Server running at http://${hostname}:${port}/'); //log server is running to console
});

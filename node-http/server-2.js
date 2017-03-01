var http = require('http'); //import http node module
var fs = require('fs'); // import fs node module to access filesystem
var path = require('path'); //import path node module to handle path types of different OS's

var hostname = 'localhost'; //local variable for host name
var port = 3000; //local variable for port to use

var server = http.createServer(function(req, res){ //create a server with following config
  console.log('Request for ' + req.url + ' by method ' + req.method); //display request url and method

  if (req.method == 'GET') { // if request is a GET then execute code below
    var fileUrl; //declare fileurl variable
     if (req.url == '/') fileUrl = '/index.html'; //set fileUrl to index page if request is for /
     else fileUrl = req.url; //if request is not for / then set fileUrl to the requested url

     var filePath = path.resolve('./public'+fileUrl); //set filePath variable to public folder + fileUrl, resolving correct path for OS type

     var fileExt = path.extname(filePath); //set fileExt to the extension of the filePath

     if (fileExt == '.html') {  // checks if file extension is .html
       fs.exists(filePath, function(exists) { // checks if the actual file exists and uses callback function
         if (!exists) { // if file does not exist
           res.writeHead(404, { 'Content-Type': 'text/html' }); //write header Not Found
           res.end('<h1>Error 404: ' + fileUrl + 'not found</h1>'); // display error 404
           return; //return response
         }

           res.writeHead(200, { 'Content-Type': 'text/html' }); //write header OK
           fs.createReadStream(filePath).pipe(res); // creates a read stream and pipes into response and returns

       });
     }
     else {
       res.writeHead(404, { 'Content-Type': 'text/html' }); //write header Not Found
       res.end('<html><body><h1>Error 404: ' + fileUrl +
                ' not a HTML file</h1></body></html>'); // display error 404 request was not for an html file
     }
  }
else {
  res.writeHead(404, { 'Content-Type': 'text/html' }); //write header Not Found
          res.end('<html><body><h1>Error 404: ' + req.method +
                  ' not supported</h1></body></html>'); // display error 404 request method was not GET
}

}) //end of function

//start the server
server.listen(port, hostname, function(){
  console.log('Server running at http://${hostname}:${port}/'); //log server is running to console
});

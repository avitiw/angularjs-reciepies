var http = require('http'),
 webServer = require('./lib/webserver');

var server = http.createServer();
 var port = process.env.PORT || 8124;
var webServer = new webServer(server);
server.listen(port);

console.log('Server running at http://127.0.0.1:'+ port);

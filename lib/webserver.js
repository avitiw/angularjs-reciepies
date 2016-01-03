
var fs = require('fs');
var path = require('path');
var mime = require('mime');

function WebServerCtor(server,opts){
	this.server = server;
	var self = this; 
	this.cache = {}; 
	this.settings = {
		'staticFolder':'public'	
		,'staticExtns':[
			"jpg","png","js","css","html","htm"
		]		
	};
	server.on('request', function (req, res) {
		self.handleRequest(req, res);
	});
}

var WebServer = module.exports = WebServerCtor;
/**
 * Handles an HTTP request.
 *
 * @api private
 */
WebServer.prototype.handleRequest = function(req,res){
	
	if(this.staticContent(req)){  
		var filePath = __dirname +'/../' + this.settings['staticFolder'] + req.url;	
		serveStatic(res,this.cache,filePath);		 
	}else if(req.url == '/'){
		var filePath = __dirname +'/../' + this.settings['staticFolder'] + '/index.html';	
		serveStatic(res,this.cache,filePath);
	}
	else{		
		send404(res);
	}	
};

WebServer.prototype.staticContent= function(req){	 
	var extensions = this.settings['staticExtns']; 
	for( i=0; i< extensions.length; i++){
		var extn = extensions[i]; 
		if(req.url.indexOf('.'+extn)!== -1){
			return true;
		}
	}
	return false;
};
function print(obj,msg){
	console.log('Printing '+ msg);
	for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      console.log(obj[i]);
    }
  }
}
function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}


function sendFile(response, filePath, fileContents) {
	response.writeHead(
		200,
		{"content-type": mime.lookup(path.basename(filePath))}
	);
	response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
	console.log(absPath);
	// if (cache[absPath]) {
	// 	sendFile(response, absPath, cache[absPath]);
	// } else { 
		fs.exists(absPath, function(exists) {
			if (exists) {
				fs.readFile(absPath, function(err, data) { 
					if (err) { 
						send404(response);
					} else {
						// cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			} else { 
				send404(response);
			}
		});
	// }
}
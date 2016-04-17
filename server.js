var http = require("http");
var url = require("url");

var port = 8888;

function start(route, handle) {

    function onRequest(request, response) {
        // this will be printed twice, since most browsers will try to load
        // http://localhost:{port}/favicon.ico
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        response.writeHead(200, {"Content-Type" : "text/plain"});
        var  responseBody = route(handle, pathname);
        response.write(responseBody);
        response.end();
    }

    http.createServer(onRequest).listen(port);

    console.log("Server has started on port " + port);
}

exports.start = start;

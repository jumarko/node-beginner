var http = require("http");
var url = require("url");

var port = 8888;

function start(route, handle) {

    function onRequest(request, response) {
        // this will be printed twice, since most browsers will try to load
        // http://localhost:{port}/favicon.ico

        var postData = "";

        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        // we expect received data to be encoded in UTF-8
        request.setEncoding("UTF-8");

        // generic listener for collecting all data sent by post
        // they are received in small chunks, thus we want to collect
        // them all before sending to request handler
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk + "'.");
        });

        // once all request data has been sent the "end" listener is called,
        // in which we can forward the data to request handler
        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
    }

    http.createServer(onRequest).listen(port);

    console.log("Server has started on port " + port);
}

exports.start = start;

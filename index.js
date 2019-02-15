/**
 * The primary file for (the assignment 1)
 * just simple functionality for assignment
 * simple RESET API not full.
 */

//  Importing modules
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

const config = require("./config");

// Creating HTTP server
const httpServer = http.createServer((req, res) => unifiedServer(req, res));

// Starting HTTP server
httpServer.listen(config.httpPort, () =>
  console.log(`Server is running on port ${config.httpPort}`)
);

// Routes Handlers
const handlers = {
  hello: {}
};

// Hello handler
handlers.hello.get = (data, func) =>
  func(200, { message: "Hello EveryOne", from: "Ahmed Sallam" });
handlers.hello.post = (data, func) =>
  func(200, { message: "Hello EveryOne", from: "Ahmed Sallam", data });

// Note found handler
handlers.notFound = (data, func) => func(404, { message: "page not found!" });
// Routes
const router = {
  hello: handlers.hello
};

// All the server logic
function unifiedServer(req, res) {
  // Get the Url Object
  const parsedUrl = url.parse(req.url, true);
  // Get the trimmed path
  const { pathname } = parsedUrl;
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, "");
  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Get the payload
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", data => {
    buffer += decoder.write(data);
  });
  req.on("end", () => {
    buffer += decoder.end();
    const handler =
      typeof router[trimmedPath] !== "undefined"
        ? handlers[trimmedPath][method]
        : handlers.notFound;

    handler(buffer, (statusCode, payloadString) => {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(JSON.stringify(payloadString));
    });
  });
}

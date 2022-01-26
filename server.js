"use strict";

const http = require("http");
const fs = require("fs");

const sendResponse = (filename, statusCode, response) => {
  fs.readFile(`./html/${filename}`, (error, data) => {
    if (error) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("Sorry something went wrong");
    } else {
      response.statusCode = statusCode;
      response.setHeader("Content-Type", "text/html");
      response.end(data);
    }
  });
};

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;

  if (method === "GET") {
    if (url === "/") {
      sendResponse("home.html", 200, response);
    } else if (url === "/about") {
      sendResponse("about.html", 200, response);
    } else {
      sendResponse("404.html", 404, response);
    }
  } else {
  }
});

const port = 3000;
const ip = "127.0.0.1";

server.listen(port, ip, () => {
  console.log("Server is running ffasdafgf");
});

const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

// get args and configure minimist alias and default argv values
// eslint-disable-next-line no-undef
const args = minimist(process.argv.slice(2), {
  alias: {
    port: ["PORT", "p"],
  },
  default: {
    port: 3000,
  },
});

// get the port number from args
const PORT = parseInt(args.port);

// variables to store html pages content
let homeContent = "";
let projectContent = "";
let registrationContent = "";

// using fs.readFile() method to read html files and store their content
fs.readFile("home.html", (err, content) => {
  if (err) throw err;
  else homeContent = content;
});

fs.readFile("project.html", (err, content) => {
  if (err) throw err;
  else projectContent = content;
});

fs.readFile("registration.html", (err, content) => {
  if (err) throw err;
  else registrationContent = content;
});

// creating an http server
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHead(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        break;
      case "/registration":
        response.write(registrationContent);
        break;
      default:
        response.write(homeContent);
        break;
    }
    response.end();
  })
  .listen(PORT, () => {
    console.log("server is running on port: " + PORT);
  });

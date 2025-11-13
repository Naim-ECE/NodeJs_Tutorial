const http = require("http");
const testingSyntax = require("./syntax");
const runtime = require("./runtime");
const logical = require("./logical");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  testingSyntax();
  runtime();
  logical();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

// for async calls -> for every line of async code it has to declared with a breakpoint else the debugger will just skip it synchronously

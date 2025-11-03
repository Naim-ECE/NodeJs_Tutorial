const { log } = require("console");
const http = require("http");

// const requestListener = (req, res) => {
//   console.log(req);
// };

// http.createServer(requestListener);

// or

// http.createServer((req, res) => {
//   console.log(req);
// });  // the server is created but what it should be listening to? to fulfill the request.

// server listener

const server = http.createServer((req, res) => {
  console.log(req);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

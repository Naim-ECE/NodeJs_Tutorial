const http = require("http");
const requestHandlerValue = require("./pages/links");

const server = http.createServer(requestHandlerValue);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`server started at http://localhost/${PORT}`);
});

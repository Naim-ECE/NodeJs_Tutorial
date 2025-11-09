const { log } = require("console");
const http = require("http");
const fs = require("fs");

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
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<head><title>Complete Coding</title></head>`);
    res.write(`<body><h1>This is my first node response code</h1>`);
    res.write(`<form action="/upload" method="POST" >`);
    res.write(`<input type="text" placeholder="Username" name="username" />`);
    res.write(`<br />`);
    res.write(`<label for="male" >Male</label>`);
    res.write(
      `<input type="radio" id="male" name="gender" value="male" /><br />`
    );
    res.write(`<label for="female" >Female</label>`);
    res.write(
      `<input type="radio" id="female" name="gender" value="female" /><br />`
    );
    res.write(`<input type="submit" value="submit" />`);
    res.write(`</form>`);
    res.write(`</body>`);
    res.write(`</html>`);
    return res.end(); // here 'return' just makes sure that response successfully reaches to the client & without returning the header, it can't be sent again after they're sent to the client -> means choosing another section like '/products' will sent them an error cuz one reponse is already sent to them
  } else if (req.url === "/products") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<head><title>Product Coding</title></head>`);
    res.write(`<body><h1>This is the Product Page</h1></body>`);
    res.write(`</html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/upload" && req.method === "POST") {
    //reading chunks
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString(); // gets the info but in restricted way. Like spaces are converting into '+' and so on.
      console.log(fullBody);

      const params = new URLSearchParams(fullBody); // removes the restriction
      //   const bodyObject = [];
      //   for (const [key, val] of params.entries()) {
      //     bodyObject[key] = val;
      //   }

      // alternative way of the above 'for' loop
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      fs.writeFileSync("user.txt", JSON.stringify(bodyObject));
    });

    res.statusCode = 302; // 302 -> means redirection
    res.setHeader("Location", "/");
    return res.end();
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<head><title>Random Coding</title></head>`);
    res.write(`<body><h1>This is a random page</h1></body>`);
    res.write(`</html>`);
    return res.end();
  }
});
// process.exit(); // ends the server execution

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

const { log } = require("console");
const fs = require("fs");

const requestHandler = (req, res) => {
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
    return res.end();
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

      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      // fs.writeFileSync("user.txt", JSON.stringify(bodyObject)); // This is a synchronous method. Means event loop will execute it by itself not by giving it to the workers. Writing files takes too long time so other request gets pending. That's why a asynchronous method needed to be used.

      fs.writeFile("user.txt", JSON.stringify(bodyObject), () => {
        console.log(`Data written successfully`);

        res.statusCode = 302; // 302 -> means redirection
        res.setHeader("Location", "/"); // it will reach to home when file written successfully (cuz it's inside res.on("end")
        return res.end();
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<head><title>Random Coding</title></head>`);
    res.write(`<body><h1>This is a random page</h1></body>`);
    res.write(`</html>`);
    return res.end();
  }
};
// process.exit(); // ends the server execution

module.exports = requestHandler;

// alternatives
// module.exports.handler = requestHandler;
// exports.handler = requestHandler;

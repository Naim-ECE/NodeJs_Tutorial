const calculateSum = require("./addition");

const requestHandlerValue = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<body>`);
    res.write(`<h1>Welcome to the calculator page</h1>`);
    res.write(`<h1><a href="/calculator" >Open up the calculator</a></h1>`);
    res.write(`</body>`);
    res.write(`</html>`);
    res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<body>`);
    res.write(`<h1>Welcome to the calculator page</h1>`);
    res.write(`<form action="/calculate-result" method="POST" >`);
    res.write(
      `<input type="text" placeholder="num1" name="num1" /><br /><br />`
    );
    res.write(
      `<input type="text" placeholder="num2" name="num2" /><br /><br />`
    );
    res.write(`<input type="submit" value="sum" />`);
    res.write(`</form>`);
    res.write(`</body>`);
    res.write(`</html>`);
    res.end();
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method === "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      const params = new URLSearchParams(fullBody);
      const bodyObject = Object.fromEntries(params);
      res.statusCode = 302;

      const result = calculateSum(bodyObject.num1, bodyObject.num2);
      res.setHeader("Content-Type", "text/html");
      res.write(
        `<html><body><h1>The sum of ${bodyObject.num1} & ${bodyObject.num2} is =  ${result}</h1></body></html>`
      );
      res.write(`<h2><a href="/calculator" >Back to calculator page</a></h2>`);
      res.end();
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<body>`);
    res.write(`<h1>404 Page Doesn't Exist</h1>`);
    res.write(`<h1><a href="/" >Go to Home</a></h1>`);
    res.write(`</body>`);
    res.write(`</html>`);
    res.end();
  }
};

module.exports = requestHandlerValue;

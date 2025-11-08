const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<body><h1>Welcome to main page</h1><br />`);
    res.write(`<h2>A. <a href="/home">Home</a></h2><br />`);
    res.write(`<h2>B. <a href="/men">Men</a></h2><br />`);
    res.write(`<h2>C. <a href="/women">Women</a></h2><br />`);
    res.write(`<h2>D. <a href="/kids">Kids</a></h2><br />`);
    res.write(`<h2>E. <a href="/carts">Cart</a></h2>`);
    res.write(`</body>`);
    res.write(`</html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/home") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<body><h1>Home Page</h1></body>`);
    res.write(`</html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/men") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<body><h1>Men Page</h1></body>`);
    res.write(`</html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/women") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<body><h1>Women Page</h1></body>`);
    res.write(`</html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/kids") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<body><h1>Kids Page</h1></body>`);
    res.write(`</html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/carts") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<body><h1>Your cart Page</h1></body>`);
    res.write(`</html>`);
    return res.end();
  }
});

const PORT = 2002;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost/${PORT}`);
});

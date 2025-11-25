// (npm install body-parser --save) -> this command saves the input info. But it's depricated now.

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  console.log(`It is the first middleware`, req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log(`It is the second middleware`, req.url, req.method);
  next();
});

app.get("/contact-us", (req, res, next) => {
  console.log(`It is the contact response`, req.url, req.method);
  res.send(`<html>
              <head><title>Contact-Page</title></head>
              <body><h1>User info</h1>
                <form action="/contact-us" method="POST" >
                <input type="text" placeholder="Username" name="username" />
                <br />
                <input type="text" placeholder="Email" name="useremail" />
                <br />
                <input type="submit" value="submit" />
                </form>
              </body>
            </html>`);
});

app.post("/contact-us", (req, res, next) => {
  console.log(`It is the first post response`, req.url, req.method, req.body);
  next();
});

app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
  console.log(`It is the second post response`, req.url, req.method, req.body);
  res.send(`<head>
              <title>Response</title>
            </head>
            <h2>Your response has been received</h2>
            <a href="./">
              <button>Back to Home</button>
            </a>`);
});

app.use("/", (req, res, next) => {
  console.log(`It is the first response`, req.url, req.method);
  next();
});

app.get("/", (req, res, next) => {
  console.log(`It is the second response`, req.url, req.method);
  res.send(`<head>
              <title>Practice of express</title>
            </head>
            <p>This is the response we're gettin'</p>
            <a href="./contact-us">
              <button>Contact Page</button>
            </a>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server runnung at http://localhost:${PORT}`);
});

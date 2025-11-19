const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log(`It is the first middleware`, req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log(`It is the second middleware`, req.url, req.method);
  next();
});

// app.use((req, res, next) => {
//   console.log(`It is the third middleware`, req.url, req.method);
//   res.send(`<p>This is the response we're gettin'</p>`);
//   next();
// });

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
  console.log(`It is the post response`, req.url, req.method);
  res.send(`<head><title>Response</title></head>
            <h2>Your response has been received</h2>
            <a href="./"><button>Back to Home</button></a>`);
});

app.use("/", (req, res, next) => {
  console.log(`It is the first response`, req.url, req.method);
  next();
});

app.get("/", (req, res, next) => {
  console.log(`It is the second response`, req.url, req.method);
  res.send(`<head><title>Practice of express</title></head>
            <p>This is the response we're gettin'</p>
            <a href="./contact-us"><button>Contact Page</button></a>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server runnung at http://localhost:${PORT}`);
});

// external module
const express = require("express");

// local module
const requestHandler = require("./user");

const app = express();

// adding middleware -> handles the fuctional work and pass it to the next one
app.get("/", (req, res, next) => {
  console.log(`Came in first middleware`, req.url, req.method);
  // res.send(`<p>This is the first response</p>`);
  next();
});

app.post("/upload", (req, res, next) => {
  res.send(`<p>This is the second response</p>`);
  console.log(`Came in second middleware`, req.url, req.method);
});

app.use("/", (req, res, next) => {
  console.log(`Came in another middleware`, req.url, req.method);
  res.send(`<p>This is the another response</p>`);
  next();
});

// !!!! for res.use -> wild card '/' matters and it executes. But for res.get and res.post -> '/...' full path needed to run it, no wild ccard wroks here

// app.use("/", (req, res, next) => {
//   console.log(`Came in first middleware`, req.url, req.method);
//   res.send(`<p>This is the first response</p>`);
// });  // cannot sent response again to the same path when they are already sent to the client
// calling res.send() implicitly calls res.end(). After next() no res.send() can be used.

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

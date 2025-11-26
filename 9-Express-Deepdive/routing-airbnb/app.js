// (npm install body-parser --save) -> this command saves the input info. But it's depricated now.

// core module
const path = require("path");

// external module
const express = require("express");

// local module
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");

const app = express();

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded()); // parses the body -> basically makes the object from the inputs in just a single line. No more chunks, no more url params... it's express yo!

app.use(userRouter);

app.use("/host", hostRouter); // concatanates /host/add-home

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./", "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

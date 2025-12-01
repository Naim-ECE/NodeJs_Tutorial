// npm install -D tailwindcss postcss autoprefixer -> initializes tailwind css

// core module
const path = require("path");

// external module
const express = require("express");

// local module
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");

const app = express();

app.use(express.static(path.join(rootDir, "src"))); // gives access the server to use the public folder and use the css. Server can't access local files but by adding them here will make 'em public & server will access the file.

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(userRouter);

app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "./", "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

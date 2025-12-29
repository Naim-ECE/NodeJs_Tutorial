// npm install -D tailwindcss postcss autoprefixer -> initializes tailwind css
// npm install --save ejs -> to generate dynamic ui logic in js within html, then this thing is gonna be necessary.

// core module
const path = require("path");

// external module
const express = require("express");

// local module
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter"); // it needs to be destructured for exports.hostRouter = hostRouter
const rootDir = require("./utils/pathUtil");

const app = express();

app.set("view engine", "ejs"); // It's the default engine extension & it doesn't any have default value.
app.set("views", "views"); // checks the folder path. In this case 'views' it is. And it has a default path 'views' already been set (means app.set("views") will work just fine). To add a different one the 2nd argument declares the path, so just putting it there would do the work.

app.use(express.static(path.join(rootDir, "src")));

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(userRouter);

app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).render("404", {pageTitle: 'Page Not Found'});
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

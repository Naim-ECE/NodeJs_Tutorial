// npm install -D tailwindcss postcss autoprefixer -> initializes tailwind css
// npm install --save ejs -> to generate dynamic ui logic in js within html, then this thing is gonna be necessary.
// npm install mongodb

// core module
const path = require("path");

// external module
const express = require("express");

// local module
const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter"); // it needs to be destructured for exports.hostRouter = hostRouter
const rootDir = require("./utils/pathUtil");
const { errorPage } = require("./controllers/errors");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");

const app = express();

app.set("view engine", "ejs"); // It's the default engine extension & it doesn't any have default value.
app.set("views", "views"); // checks the folder path. In this case 'views' it is. And it has a default path 'views' already been set (means app.set("views") will work just fine). To add a different one the 2nd argument declares the path, so just putting it there would do the work.

app.use(express.static(path.join(rootDir, "src")));

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(authRouter);

app.use(storeRouter);

app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});

app.use("/host", hostRouter);

app.use(errorPage);

const PORT = 3000;
const DB_PATH =
  "mongodb+srv://root:root@cluster0.2yvvkoz.mongodb.net/homedb?appName=Cluster0";

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log(`Connected to mongodb`);
    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error while connecting to mongodb`);
  });

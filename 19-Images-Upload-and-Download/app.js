// npm install -D tailwindcss postcss autoprefixer -> initializes tailwind css
// npm install --save ejs -> to generate dynamic ui logic in js within html, then this thing is gonna be necessary.
// npm install mongodb

// core module
const path = require("path");

// external module
const express = require("express");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const DB_PATH =
  "mongodb+srv://root:root@cluster0.2yvvkoz.mongodb.net/homedb?appName=Cluster0";
const { default: mongoose } = require("mongoose");
const multer = require("multer");

// local module
const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter"); // it needs to be destructured for exports.hostRouter = hostRouter
const rootDir = require("./utils/pathUtil");
const { errorPage } = require("./controllers/errors");
const authRouter = require("./routes/authRouter");

const app = express();

app.set("view engine", "ejs"); // It's the default engine extension & it doesn't any have default value.
app.set("views", "views"); // checks the folder path. In this case 'views' it is. And it has a default path 'views' already been set (means app.set("views") will work just fine). To add a different one the 2nd argument declares the path, so just putting it there would do the work.

const store = new MongoDbStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// const multerOptions = {
//   dest: "uploads/",
// }; // doesn't give us the control over the file name and the file type. It just stores the file in the specified destination folder with a random name and the original file extension. It doesn't check the file type or the file size. It just stores the file as it is. So we need to use the storage engine of multer to have more control over the file upload process.

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // this is the destination folder where the uploaded files will be stored. It is relative to the root directory of the project. So it will be created in the root directory if it doesn't exist.
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Gets the original file extension (e.g., ".jpg")
    cb(null, `${file.fieldname}-${Date.now()}${ext}`); // Creates a unique filename using field name + timestamp + original extension
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/jpeg") ||
    file.mimetype.startsWith("image/png") ||
    file.mimetype.startsWith("image/jpg")
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject the file
  }
};

const multerOptions = {
  storage: multerStorage,
  fileFilter: fileFilter,
};

app.use(express.urlencoded());
app.use(multer(multerOptions).single("photo")); // Multer middleware to upload a single file from the "photo" field. File info becomes available in req.file.

app.use(express.static(path.join(rootDir, "src")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/home/uploads", express.static(path.join(rootDir, "uploads")));

app.use(
  session({
    secret: "home-rent-secret-key",
    resave: false,
    saveUninitialized: true,
    store: store,
  }),
);

app.use(authRouter);

app.use(storeRouter);

app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});

app.use("/host", hostRouter);

app.use(errorPage);

const PORT = 3000;

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

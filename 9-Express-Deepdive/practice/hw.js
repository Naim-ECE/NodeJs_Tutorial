const express = require("express");
const contactRouter = require("./routes/contactRouter");
const userRouter = require("./routes/userRouter");
const path = require("path");
const rootDir = require("./utils/pathUtil");

const app = express();

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(userRouter);

app.use(contactRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server runnung at http://localhost:${PORT}`);
});

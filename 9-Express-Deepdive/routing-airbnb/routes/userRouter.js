const express = require("express");
const userRouter = express.Router();

// path -> to address the view(html) path
const path = require("path");

const rootDir = require("../utils/pathUtil");

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = userRouter;

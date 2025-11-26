const express = require("express");
const userRouter = express.Router();

// path -> to address the view(html) path
const path = require("path");

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "home.html"));
});

module.exports = userRouter;

const express = require("express");
const userRouter = express.Router();
const { registeredHome } = require("./hostRouter");

// path -> to address the view(html) path
const path = require("path");

const rootDir = require("../utils/pathUtil");

userRouter.get("/", (req, res, next) => {
  console.log(registeredHome);
  //res.sendFile(path.join(rootDir, "views", "home.html"));
  res.render("home", { registeredHome, pageTitle: "Home Rent Website" });
});

module.exports = userRouter;

const express = require("express");
const hostRouter = express.Router();

const path = require("path");

const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home" });
});

const registeredHome = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body, req.body.houseName);
  registeredHome.push({ houseName: req.body.houseName });
  res.render("homeAdded", { pageTitle: "Home Added Successfully" });
});

exports.hostRouter = hostRouter;
exports.registeredHome = registeredHome;

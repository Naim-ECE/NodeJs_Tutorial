// external module
const express = require("express");
const hostRouter = express.Router();
// local module
const {
  getAddHome,
  postAddHome,
  getHostHome,
} = require("../controllers/hostController");

hostRouter.get("/add-home", getAddHome);
hostRouter.post("/add-home", postAddHome);
hostRouter.get("/host-home-list", getHostHome);

exports.hostRouter = hostRouter;

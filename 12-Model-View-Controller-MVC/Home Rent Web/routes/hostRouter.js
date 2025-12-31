// external module
const express = require("express");
const hostRouter = express.Router();
// local module
const { getAddHome, postAddHome } = require("../controllers/homes");

hostRouter.get("/add-home", getAddHome);

hostRouter.post("/add-home", postAddHome);

exports.hostRouter = hostRouter;

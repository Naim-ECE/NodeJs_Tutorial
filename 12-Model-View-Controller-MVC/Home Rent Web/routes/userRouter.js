const express = require("express");
const userRouter = express.Router();
const { getHome } = require("../controllers/homes");

userRouter.get("/", getHome);

module.exports = userRouter;

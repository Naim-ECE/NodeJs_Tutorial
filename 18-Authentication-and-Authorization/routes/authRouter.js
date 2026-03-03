const express = require("express");
const authRouter = express.Router();
const {
  getLogin,
  postLogin,
  postLogOut,
} = require("../controllers/authController");

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.post("/logout", postLogOut);

module.exports = authRouter;

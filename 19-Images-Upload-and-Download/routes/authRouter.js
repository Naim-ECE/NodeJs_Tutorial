const express = require("express");
const authRouter = express.Router();
const {
  getLogin,
  postLogin,
  postLogOut,
  getSignUp,
  postSignUp,
} = require("../controllers/authController");

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.post("/logout", postLogOut);
authRouter.get("/signup", getSignUp);
authRouter.post("/signup", postSignUp);

module.exports = authRouter;

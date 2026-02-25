const express = require("express");
const authRouter = express.Router();
const { getLogin, postLogin } = require("../controllers/authController");

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);

module.exports = authRouter;

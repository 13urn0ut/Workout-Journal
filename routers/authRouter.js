const express = require("express");
const { createUser, loginUser } = require("../controllers/userController");
const { checkRegister, checkLogin } = require("../validators/checkBody");
const validate = require("../validators/validate");
const authRouter = express.Router();

authRouter.route("/register").post(checkRegister, validate, createUser);
authRouter.route("/login").post(checkLogin, validate, loginUser);

module.exports = authRouter;

const express = require("express");
const { createUser } = require("../controllers/userController");
const authRouter = express.Router();

authRouter.route("/register").post(createUser);
authRouter.route("/login").post();

module.exports = authRouter;

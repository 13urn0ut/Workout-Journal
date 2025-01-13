const express = require("express");
const authRouter = express.Router();

authRouter.route("/register").post();
authRouter.route("/login").post();

module.exports = authRouter;

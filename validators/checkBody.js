const { body } = require("express-validator");

exports.checkRegister = [
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters"),

  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),

  body("email").trim().notEmpty().isEmail().withMessage("Invalid email"),
];

exports.checkLogin = [
  body("username").trim().notEmpty().withMessage("Invalid username"),
  body("password").trim().notEmpty().withMessage("Invalid password"),
];

exports.checkWorkout = [
  body("name").trim().notEmpty().withMessage("Invalid name"),
];

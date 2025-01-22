const { body } = require("express-validator");
const { getUserByEmail, getUserByUsername } = require("../models/userModel");

exports.checkRegister = [
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters")
    .custom(async (username) => {
      const user = await getUserByUsername(username);

      if (user) throw new Error("Username already in use");

      return true;
    }),

  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters")
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword)
        throw new Error("Passwords do not match");
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email) => {
      const user = await getUserByEmail(email);

      if (user) throw new Error("Email already in use");

      return true;
    }),
];

exports.checkLogin = [
  body("username").trim().notEmpty().withMessage("Invalid username"),
  body("password").trim().notEmpty().withMessage("Invalid password"),
];

exports.checkWorkout = [
  body("name").trim().notEmpty().withMessage("Invalid name"),
];

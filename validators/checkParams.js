const { param } = require("express-validator");

exports.checkId = [
  param("id").isInt({ min: 1 }).withMessage("Id must be a positive integer"),
];

// const checkUsername = [
//   param("username")
//     .isLength({ min: 3 })
//     .withMessage("Username must be at least 3 characters"),
// ];

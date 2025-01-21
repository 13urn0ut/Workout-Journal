const express = require("express");
const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserWorkouts,
  addUserWorkout,
} = require("../controllers/userController");
const { checkId } = require("../validators/checkParams");
const { checkWorkout } = require("../validators/checkBody");
const validate = require("../validators/validate");
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);

userRouter.route(`/:id`).get(checkId, validate, getUserById);

userRouter.route(`/:username`).get(getUserByUsername);

userRouter
  .route(`/:id/workouts`)
  .all(checkId, validate)
  .get(getUserWorkouts)
  .post(checkWorkout, validate, addUserWorkout);

module.exports = userRouter;

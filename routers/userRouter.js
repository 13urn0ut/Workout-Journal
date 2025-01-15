const express = require("express");
const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserWorkouts,
  addUserWorkout,
} = require("../controllers/userController");
// const { addWorkout } = require("../controllers/workoutController");
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);

userRouter.route(`/:id`).get(getUserById);
userRouter.route(`/:username`).get(getUserByUsername);
userRouter.route(`/:id/workouts`).get(getUserWorkouts).post(addUserWorkout);

// userRouter.route(`/:id/workouts`).post(addWorkout);

module.exports = userRouter;

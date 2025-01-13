const express = require("express");
const {
  getAllUsers,
  createUser,
  // getUserById,
  // getUserByUsername,
} = require("../controllers/userController");
// const { addWorkout } = require("../controllers/workoutController");
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);

// userRouter.route(`/:id`).get(getUserById);
// userRouter.route(`/:username`).get(getUserByUsername);

// userRouter.route(`/:id/workouts`).post(addWorkout);

// module.exports = userRouter;

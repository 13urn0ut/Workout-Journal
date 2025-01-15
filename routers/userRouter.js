const express = require("express");
const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserWorkouts,
  addUserWorkout,
} = require("../controllers/userController");
const { checkId } = require("../middleware/checkId");
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);
userRouter.route(`/:id`).get(getUserById);
userRouter.route(`/:username`).get(getUserByUsername);
userRouter
  .route(`/:id/workouts`)
  .all(checkId)
  .get(getUserWorkouts)
  .post(addUserWorkout);

module.exports = userRouter;

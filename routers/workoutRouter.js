const express = require("express");
const {
  getAllWorkouts,
  getWorkoutById,
  editWorkout,
} = require("../controllers/workoutController");

const workoutRouter = express.Router();

workoutRouter.route("/").get(getAllWorkouts);

workoutRouter.route(`/:id`).get(getWorkoutById).put(editWorkout);

module.exports = workoutRouter;

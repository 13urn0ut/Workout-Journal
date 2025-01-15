const express = require("express");
const {
  getAllWorkouts,
  getWorkoutById,
  editWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const workoutRouter = express.Router();

workoutRouter.route("/").get(getAllWorkouts);

workoutRouter
  .route(`/:id`)
  .get(getWorkoutById)
  .put(editWorkout)
  .delete(deleteWorkout);

module.exports = workoutRouter;

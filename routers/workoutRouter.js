const express = require("express");
const {
  getAllWorkouts,
  getWorkoutById,
  editWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const { checkId } = require("../middleware/checkId");

const workoutRouter = express.Router();

workoutRouter.route("/").get(getAllWorkouts);

workoutRouter
  .route(`/:id`)
  .all(checkId)
  .get(getWorkoutById)
  .put(editWorkout)
  .delete(deleteWorkout);

module.exports = workoutRouter;

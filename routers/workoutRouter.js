const express = require("express");
const {
  getAllWorkouts,
  getWorkoutById,
  editWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const { checkId } = require("../validators/checkParams");
const { checkWorkout } = require("../validators/checkBody");
const validate = require("../validators/validate");

const workoutRouter = express.Router();

workoutRouter.route("/").get(getAllWorkouts);

workoutRouter
  .route(`/:id`)
  .all(checkId, validate)
  .get(getWorkoutById)
  .put(checkWorkout, validate, editWorkout)
  .delete(deleteWorkout);

module.exports = workoutRouter;

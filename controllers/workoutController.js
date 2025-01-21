const AppError = require("../helpers/appError");
const {
  getAllWorkouts,
  getWorkoutById,
  editWorkout,
  deleteWorkout,
} = require("../models/workoutModel");

exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await getAllWorkouts();

    if (!workouts || workouts.length < 1)
      throw new AppError("No workouts found", 404);

    res.status(200).json({
      status: "success",
      data: workouts,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getWorkoutById = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await getWorkoutById(id);

    if (!workout) throw new AppError("Workout not found", 404);

    res.status(200).json({
      status: "success",
      data: workout,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.editWorkout = async (req, res) => {
  const { id } = req.params;
  const workoutData = req.body;

  try {
    if (Object.keys(workoutData).length < 1)
      throw new AppError("Invalid workout data", 400);

    const workout = await editWorkout(id, workoutData);

    if (!workout) throw new AppError("Workout not found", 404);

    res.status(200).json({
      status: "success",
      data: workout,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorkout = await deleteWorkout(id);

    if (!deletedWorkout) throw new AppError("Workout not found", 404);

    res.status(204).json({
      status: "success",
      message: "The selected workout was removed",
      data: deletedWorkout,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

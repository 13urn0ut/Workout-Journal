const { getAllWorkouts, getWorkoutById } = require("../models/workoutModel");

exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await getAllWorkouts();

    if (!workouts || workouts.length < 1)
      return res.status(404).json({
        status: "fail",
        message: "No workouts found",
      });

    res.status(200).json({
      status: "success",
      data: workouts,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getWorkoutById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id))
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });

  try {
    const workout = await getWorkoutById(id);

    if (!workout)
      return res.status(404).json({
        status: "fail",
        message: "Workout not found",
      });

    res.status(200).json({
      status: "success",
      data: workout,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

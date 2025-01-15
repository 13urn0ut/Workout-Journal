const { getAllWorkouts } = require("../models/workoutModel");

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

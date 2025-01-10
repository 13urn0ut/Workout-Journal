const fs = require("fs");
const path = require("path");
const Workout = require("./../models/workoutModel");

const workoutsPath = path.join(__dirname, "../data/workouts.json");

const workouts = JSON.parse(fs.readFileSync(workoutsPath, "utf8"));

workouts.sort((a, b) => a.id - b.id);

exports.addWorkout = (req, res) => {
  const id = (workouts[workouts.length - 1]?.id || 0) + 1;
  const userId = req.params.id;
  const { name } = req.body;

  const workout = new Workout(id, name, null, userId);

  workouts.push(workout);

  fs.writeFile(workoutsPath, workouts, (err) => {
    if (err)
      return res.status(500).json({
        status: "fail",
        message: "failed to add new workout",
      });

    res.status(201).json({
      status: "success",
      workout,
    });
  });
};

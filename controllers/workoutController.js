const fs = require("fs");
const path = require("path");
const Workout = require("./../models/workoutModel");

const workoutsPath = path.join(__dirname, "../data/workouts.json");

const workouts = JSON.parse(fs.readFileSync(workoutsPath, "utf8"));

workouts.sort((a, b) => a.id - b.id);

exports.getAllWorkouts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: workouts.length,
    data: workouts,
  });
};

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
        message: "failed to write file",
      });

    res.status(201).json({
      status: "success",
      workout,
    });
  });
};

exports.getWorkoutById = (req, res) => {
  const id = +req.params.id;
  const workout = workouts.find((workout) => workout.id === id);

  if (!workout)
    return res.status(404).json({
      status: "fail",
      message: "Workout not found",
    });

  res.status(200).json({
    status: "success",
    data: {
      workout_id: workout.id,
      workout_name: workout.name,
    },
  });
};

exports.editWorkout = (req, res) => {
  const id = +req.params.id;
  const workout = workouts.find((workout) => workout.id === id);

  if (!workout)
    return res.status(404).json({
      status: "fail",
      message: "Workout not found",
    });

  workout.name = req.body.name;

  fs.writeFile(workoutsPath, JSON.stringify(workouts), (err) => {
    if (err)
      return res.status(500).json({
        status: "fail",
        message: "failed to write file",
      });

    res.status(201).json({
      status: "success",
      data: Object.keys(req.body).length,
    });
  });

  console.log(workouts);
};

exports.deleteWorkout = (req, res) => {
  const id = +req.params.id;
  const workout = workouts.find((workout) => workout.id === id);

  if (!workout)
    return res.status(404).json({
      status: "fail",
      message: "Workout not found",
    });

  fs.writeFile(
    workoutsPath,
    JSON.stringify(workouts.filter((workout) => workout.id !== id)),
    (err) => {
      if (err)
        return res.status(500).json({
          status: "fail",
          message: "failed to write file",
        });

      res.status(204).json({
        status: "success",
      });
    }
  );
};

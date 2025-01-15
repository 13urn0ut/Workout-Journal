const { sql } = require("./../dbConnection");

exports.getAllWorkouts = async () => {
  const workouts = await sql`
  SELECT workouts.*
  FROM workouts;
  `;

  return workouts;
};

exports.getWorkoutById = async (workoutId) => {
  const [workout] = await sql`
  SELECT workouts.*
  FROM workouts
  WHERE workouts.id = ${workoutId};
  `;

  return workout;
};

exports.editWorkout = async (workoutId, workout) => {
  const columns = Object.keys(workout);
  const [updatedWorkout] = await sql`
  UPDATE workouts
  SET ${sql(workout, columns)}
  WHERE workouts.id = ${workoutId}
  `;

  return updatedWorkout;
};

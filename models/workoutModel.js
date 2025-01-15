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

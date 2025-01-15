const { sql } = require("./../dbConnection");

exports.getAllWorkouts = async () => {
  const workouts = await sql`
  SELECT workouts.*
  FROM workouts;
  `;

  return workouts;
};

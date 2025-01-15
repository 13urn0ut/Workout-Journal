const { sql } = require("./../dbConnection");

exports.createUser = async (user) => {
  const columns = Object.keys(user);
  const [newUser] = await sql`
  INSERT INTO users ${sql(user, columns)}
  RETURNING users.*
  `;

  return newUser;
};

exports.loginUser = async (username) => {
  const [user] = await sql`
  SELECT users.*
  FROM users
  WHERe users.username = ${username};
  `;

  return user;
};

exports.getAllUsers = async () => {
  const users = await sql`
  SELECT users.*
  FROM users;
  `;

  return users;
};

exports.getUserById = async (id) => {
  const [user] = await sql`
  SELECT users.*
  FROM users
  WHERE users.id = ${id};
  `;

  user.workouts = await sql`
  SELECT workouts.id, workouts.workout_name
  FROM workouts
  JOIN users_workouts
  ON workouts.id = users_workouts.workout_id
  WHERE users_workouts.user_id = ${user.id}; 
  `;

  return user;
};

exports.getUserByUsername = async (username) => {
  const [user] = await sql`
  SELECT users.*
  FROM users
  WHERE users.username = ${username};
  `;

  user.workouts = await sql`
  SELECT workouts.id, workouts.workout_name
  FROM workouts
  JOIN users_workouts
  ON workouts.id = users_workouts.workout_id
  WHERE users_workouts.user_id = ${user.id}; 
  `;

  return user;
};

exports.getUserWorkouts = async (userId) => {
  const workouts = await sql`
  SELECT users_workouts.workout_id, workouts.workout_name, users_workouts.user_id, users.username
  FROM users
  JOIN users_workouts
  ON users.id = users_workouts.user_id
  JOIN workouts
  ON users_workouts.workout_id = workouts.id
  WHERE users.id = ${userId};
  `;

  return workouts;
};

exports.addUserWorkout = async (userId, workout) => {
  const [newWorkout, newUsersWorkout] = await sql.begin(async (sql) => {
    const [newWorkout] = await sql`
    INSERT INTO workouts(workout_name)
    VALUES (${workout.name})
    RETURNING workouts.*;
    `;

    const [newUsersWorkout] = await sql`
    INSERT INTO users_workouts
    VALUES (
      (SELECT users.id FROM users WHERE users.id = ${userId}),
      (SELECT workouts.id FROM workouts WHERE workouts.id = ${newWorkout.id}))
    RETURNING users_workouts.*;
    `;

    return [newWorkout, newUsersWorkout];
  });

  return { newWorkout, newUsersWorkout };
};

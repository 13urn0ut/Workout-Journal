const { sql } = require("./../dbConnection");

exports.createUser = async (user) => {
  await sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
  `;

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
  WHERE users.username = ${username};
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
  const user = await sql.begin(async (sql) => {
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
  });

  return user;
};

exports.getUserByUsername = async (username) => {
  const user = await sql.begin(async (sql) => {
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
  });

  return user;
};

exports.getUserWorkouts = async (userId) => {
  const workouts = await sql`
  SELECT workouts.*
  FROM workouts
  WHERE workouts.user_id = ${userId};
  `;

  return workouts;
};

exports.addUserWorkout = async (userId, workout) => {
  await sql`
    CREATE TABLE IF NOT EXISTS workouts (
    id SERIAL PRIMARY KEY,
    workout_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
    `;

  const [newWorkout] = await sql`
    INSERT INTO workouts (workout_name, user_id)
    VALUES (${workout.name}, ${userId})
    RETURNING workouts.*;
    `;

  return newWorkout;
};

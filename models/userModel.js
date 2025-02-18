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

  const [newUser] = await sql`
  INSERT INTO users ${sql(user, "username", "password", "email")}
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
  const [user] = await sql`
    SELECT users.*
    FROM users
    WHERE users.id = ${id};
    `;

  return user;
};

exports.getUserByUsername = async (username) => {
  const [user] = await sql`
  SELECT users.*
  FROM users
  WHERE users.username = ${username};
  `;

  return user;
};

exports.getUserByEmail = async (email) => {
  const [user] = await sql`
  SELECT users.*
  FROM users
  WHERE users.email = ${email};
  `;

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

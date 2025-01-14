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

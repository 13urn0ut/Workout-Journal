const { sql } = require("./../dbConnection");

exports.createUser = async (user) => {
  const columns = Object.keys(user);
  const [newUser] = await sql`
  INSERT INTO users ${sql(user, columns)}
  RETURNING users.*
  `;

  return newUser;
};

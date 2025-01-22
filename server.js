require("dotenv").config();
const server = require("./app");
const { sql, testConnection } = require("./dbConnection");

const port = process.env.PORT;

(async () => {
  try {
    // test db connection
    await testConnection();

    // start server
    server.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  } catch (err) {
    console.log(err.message);
    process.exit(1); // terminate the running application if the database connection fails, 1 means error
  }

  process.on(`SIGINT`, async () => {
    console.log(`Closing database connection...`);
    await sql.end(); // closes all db connections
    process.exit(0);
  });
})();

const dotenv = require("dotenv");
const server = require("./app");

dotenv.config();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

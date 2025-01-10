const fs = require("fs");
const path = require("path");
const User = require("./../models/userModel");

const usersPath = path.join(__dirname, "../data/users.json");

const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

users.sort((a, b) => +a.id - +b.id);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users.map((user) => {
      return { ...user, password: undefined };
    }),
  });
};

exports.createUser = (req, res) => {
  const { username, email, password } = req.body;
  const id = (+users[users.length - 1]?.id || 0) + 1;
  const user = new User(id, username, email, password);

  users.push(user);

  fs.writeFile(usersPath, JSON.stringify(users), (err) => {
    if (err)
      return res.status(500).json({
        status: "fail",
        message: "failed to create new user",
      });

    user.password = undefined;

    res.status(201).json({
      status: "success",
      user,
    });
  });
};

exports.getUserById = (req, res, next) => {
  const userId = +req.params.id;
  if (!userId) return next();

  const user = users.find((user) => user.id === userId);
  user.password = undefined;

  if (!user) {
    res.status(404).json({
      status: "fail",
      message: "User not found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    user,
  });
};

exports.getUserByUsername = (req, res, next) => {
  const userName = req.params.username;
  if (!userName) return next();

  const user = users.find((user) => user.username === userName);
  user.password = undefined;

  if (!user) {
    res.status(404).json({
      status: "fail",
      message: "User not found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    user,
  });
};

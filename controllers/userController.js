const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserWorkouts,
  addUserWorkout,
} = require("./../models/userModel");

const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendCookie = (res, userId) => {
  const token = signToken(userId);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = req.body;

    newUser.password = await argon2.hash(newUser.password);

    const user = await createUser({
      ...newUser,
      created_at: new Date(),
      updated_at: new Date(),
    });

    sendCookie(res, user.id);

    user.id = undefined;
    user.password = undefined;

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await loginUser(username);
    const isPwdOk = await argon2.verify(user?.password, password);

    if (!isPwdOk) throw new AppError("Wrong username or passsword", 403);

    user.password = undefined;
    user.id = undefined;

    res.status(200).json({
      staus: "success",
      message: "Success! You are logged in!",
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    if (users.length < 1) throw new AppError("No users found", 404);

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  if (!userId || isNaN(userId)) return next();

  try {
    const user = await getUserById(userId);

    if (!user) throw new AppError("User not found", 404);

    user.password = undefined;

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await getUserByUsername(username);

    if (!user) throw new AppError("User not found", 404);

    user.password = undefined;

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserWorkouts = async (req, res, next) => {
  const { id } = req.params;

  try {
    const workouts = await getUserWorkouts(id);

    if (!workouts || workouts.length < 1)
      throw new AppError("No workouts found", 404);

    res.status(200).json({
      status: "success",
      data: workouts,
    });
  } catch (err) {
    next(err);
  }
};

exports.addUserWorkout = async (req, res, next) => {
  const { id } = req.params;
  const workoutData = req.body;

  try {
    const workout = await addUserWorkout(id, workoutData);

    res.status(201).json({
      status: "success",
      data: workout.id,
    });
  } catch (err) {
    next(err);
  }
};

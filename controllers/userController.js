const AppError = require("../helpers/appError");
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserWorkouts,
  addUserWorkout,
} = require("./../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const user = await createUser({
      ...req.body,
      created_at: new Date(),
      updated_at: new Date(),
    });

    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) throw new AppError("Invalid data", 400);

    const user = await loginUser(username);
    const isPwdOk = user?.password === password;

    if (!user || !isPwdOk)
      throw new AppError("Wrong username or passsword", 403);

    user.password = undefined;

    res.status(200).json({
      staus: "success",
      message: "Success! You are logged in!",
      user,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (users.length < 1) throw new AppError("No users found", 404);

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
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
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUserByUsername = async (req, res) => {
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
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUserWorkouts = async (req, res) => {
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
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addUserWorkout = async (req, res) => {
  const { id } = req.params;
  const workoutData = req.body;

  try {
    if (!workoutData.name) throw new AppError("Invalid workout data", 400);

    const workout = await addUserWorkout(id, workoutData);

    res.status(201).json({
      status: "success",
      data: workout.id,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "fail",
      message: err.message,
    });
  }
};

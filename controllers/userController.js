const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
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
    const user = await loginUser(username);
    const isPwdOk = user?.password === password;

    if (!user || !isPwdOk)
      return res.status(403).json({
        status: "fail",
        message: "Wrong username or passsword",
      });

    user.password = undefined;

    res.status(200).json({
      staus: "success",
      message: "Success! You are logged in!",
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (users.length < 1)
      return res.status(404).json({
        status: "fail",
        message: "No users found",
      });

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
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

    if (!user)
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });

    user.password = undefined;

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// exports.getUserByUsername = (req, res, next) => {
//   const userName = req.params.username;
//   if (!userName) return next();

//   const user = users.find((user) => user.username === userName);

//   if (!user) {
//     res.status(404).json({
//       status: "fail",
//       message: "User not found",
//     });
//     return;
//   }

//   user.password = undefined;
//   user.workouts = workouts
//     .filter((workout) => workout.user_id === user.id)
//     .map((workout) => {
//       return { id: workout.id, workout_name: workout.name };
//     });

//   res.status(200).json({
//     status: "success",
//     user,
//   });
// };

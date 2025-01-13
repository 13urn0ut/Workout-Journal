const { createUser } = require("./../models/userModel");

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

// exports.getAllUsers = (req, res) => {
//   res.status(200).json({
//     status: "success",
//   });
// };

// exports.getUserById = (req, res, next) => {
//   const userId = +req.params.id;
//   if (!userId) return next();

//   const user = users.find((user) => user.id === userId);

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

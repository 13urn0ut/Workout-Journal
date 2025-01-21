const express = require("express");
const userRouter = require("./routers/userRouter");
const workoutRouter = require("./routers/workoutRouter");
const authRouter = require("./routers/authRouter");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/workouts", workoutRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;

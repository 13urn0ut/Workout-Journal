const express = require("express");
const userRouter = require("./routers/userRouter");
const workoutRouter = require("./routers/workoutRouter");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/workouts", workoutRouter);

module.exports = app;

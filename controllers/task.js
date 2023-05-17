import { Task } from "../models/task.js";
import ErrorHandler from "../middlewares/error.js"
export const newTask = async (req, res) => {
  const { title, description } = req.body;

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task has been created successfully",
  });
};

export const getMyTask = async (req, res) => {
  const userid = req.user._id; //This we will get from isAuthenticated Method

  const tasks = await Task.find({ user: userid });

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new ErrorHandler("Invalid Deletion",400));
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};

export const updateTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
 console.log(task)
  if (!task) return next(new ErrorHandler("Invalid Update",404));

  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
  });
};

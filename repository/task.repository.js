import Task from "../Models/Task.model.js";
import dayjs from "dayjs";

export const createTask = async (data) => {
  const completetionDate = new Date(data.date);
  const task = new Task({ ...data, date: completetionDate });
  const savedTask = await task.save();
  return savedTask;
};

export const getTasks = async (userId, type, day) => {
  try {
    var min, max;
    if (day === "today") {
      min = dayjs().format("YYYY-MM-DD");
      max = dayjs().format("YYYY-MM-DD");
    } else if (day === "seven") {
      min = dayjs().subtract(7, "day").format("YYYY-MM-DD");
      max = dayjs().format("YYYY-MM-DD");
    } else if (day === "thirty") {
      min = dayjs().subtract(30, "day").format("YYYY-MM-DD");
      max = dayjs().format("YYYY-MM-DD");
    }
    if (type === "default") {
      var tasks = await Task.find({
        userId,
        ...(day && { date: { $lte: new Date(max), $gte: new Date(min) } }),
      });
    }
    if (type && type !== "default") {
      var tasks = await Task.find({
        userId,
        type,
        ...(day && { date: { $lte: new Date(max), $gte: new Date(min) } }),
      });
    } else {
      var tasks = await Task.find({
        userId,
        ...(day && { date: { $lte: new Date(max), $gte: new Date(min) } }),
      });
    }
    return tasks;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId);
  return task;
};

export const updateTask = async (id, data) => {
  try {
    const task = await Task.findByIdAndUpdate({ _id: id }, data, { new: true });
    return task;
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (taskId) => {
  const deletedTask = await Task.findByIdAndDelete({ _id: taskId });
  return deletedTask;
};

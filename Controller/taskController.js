import Task from "../Models/Task.model.js";
import dayjs from "dayjs";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../repository/task.repository.js";

export const httpCreateTask = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const taskData = { ...req.body, userId };
    const savedTask = await createTask(taskData);
    return res.status(201).json({ task: savedTask });
  } catch (err) {
    next(err);
  }
};

export const httpUpdateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await updateTask(id, req.body);
    return res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
};

export const httpGetTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);
    if (!task) {
      throw new BadRequestError("Task is not found");
    }

    return res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
};

export const httpGetTasks = async (req, res, next) => {
  try {
    const type = req.query?.type;
    const day = req.query?.day;
    const { userId } = req.user;
    const tasks = await getTasks(userId, type, day);
    return res.status(201).json({ tasks });
  } catch (err) {
    next(err);
  }
};

export const httpDeleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await deleteTask(id);
    if (!task) {
      throw new BadRequestError("Task is not found");
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

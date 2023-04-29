import express from "express";

import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../Controller/taskController.js";
import auth from "../middleware/auth.js";
const taskRouter = express.Router();

taskRouter.post("/create", auth, createTask);
taskRouter.put("/:id", auth, updateTask);
taskRouter.get("/:id", auth, getTask);
taskRouter.get("/", auth, getTasks);
taskRouter.delete("/:id", auth, deleteTask);

export default taskRouter;

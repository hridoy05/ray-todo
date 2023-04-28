import express from "express";

import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../Controller/taskController.js";
import { verifyJwtToken } from "../middleware/verifyToken.js";
const taskRouter = express.Router();

taskRouter.post("/create", verifyJwtToken, createTask);
taskRouter.put("/:id", verifyJwtToken, updateTask);
taskRouter.get("/:id", verifyJwtToken, getTask);
taskRouter.get("/", verifyJwtToken, getTasks);
taskRouter.delete("/:id", verifyJwtToken, deleteTask);

export default taskRouter;

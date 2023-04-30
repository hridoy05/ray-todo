import express from "express";

import {
  httpGetTask,
  httpGetTasks,
  httpUpdateTask,
  httpDeleteTask,
  httpCreateTask,
} from "../Controller/taskController.js";
import auth from "../middleware/auth.js";
const taskRouter = express.Router();

taskRouter.post("/create", auth, httpCreateTask);
taskRouter.put("/:id", auth, httpUpdateTask);
taskRouter.get("/:id", auth, httpGetTask);
taskRouter.get("/", auth, httpGetTasks);
taskRouter.delete("/:id", auth, httpDeleteTask);

export default taskRouter;

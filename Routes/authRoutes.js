import express from "express";
import { HttpLogin, HttpRegister } from "../Controller/authController.js";
const authRouter = express.Router();

authRouter.post("/register", HttpRegister);
authRouter.post("/login", HttpLogin);

export default authRouter;

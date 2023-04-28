import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/authRoutes.js";
import taskRouter from "./Routes/TaskRoutes.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// import middleare
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;

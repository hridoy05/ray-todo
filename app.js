import express from "express";
import authRouter from "./Routes/authRoutes.js";
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
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;

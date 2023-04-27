import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

export default app;

import dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: path.join(__dirname, ".env.dev") });
} else {
  dotenv.config();
}

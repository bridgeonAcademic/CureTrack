import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { EventEmitter } from "events";
import { adminRoutes } from "../routes/adminRoutes";
import errorHandler from "../middlewares/baseMiddlewares/errors/errorHandler";  

dotenv.config();

const app = express();
EventEmitter.setMaxListeners(20);

app.use(
  cors({
    origin: ["http://localhost:5003"],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;

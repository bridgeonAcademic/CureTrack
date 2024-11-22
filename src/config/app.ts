import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { EventEmitter } from "events";
import adminRoutes from "../routes/adminRoutes";
import errorHandler from "../middlewares/baseMiddlewares/errors/errorHandler";
import doctorRoutes from "../routes/doctorRoutes";
import baseRoutes from "../routes/baseRoutes";
import vendorsRoutes from "../routes/vendorRoutes";
import userRoutes from "../routes/userRoutes";

dotenv.config();

const app = express();
EventEmitter.setMaxListeners(20);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use("/api/", baseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/vendor", vendorsRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;

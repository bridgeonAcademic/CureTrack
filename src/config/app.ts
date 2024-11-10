import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from 'morgan';
import { EventEmitter } from "events";
import { adminRoutes } from "../routes/adminRoutes";

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
app.use(morgan('dev'));

app.use("/admin/api", adminRoutes);



export default app;

import express, { Router } from "express";
import { saveDoctorProfile } from "../controllers/doctorControllers/profileController";
import trycatch from "../middlewares/baseMiddlewares/try-catch/try-catch";
import {
  getDoctorDashboardActivities,
  getDoctorDashboardAppointments,
  getDoctorDashboardStats,
} from "../controllers/doctorControllers/dashboardController";

const doctorRoutes: Router = express.Router();

doctorRoutes.post("/doctor-profile", trycatch(saveDoctorProfile));
doctorRoutes.get("/stats", getDoctorDashboardStats);
doctorRoutes.get("/recent-activities", getDoctorDashboardActivities);
doctorRoutes.get("/appointments", getDoctorDashboardAppointments);

export { doctorRoutes };

import express, { Router } from "express";
import { doctorSignup } from "../controllers/doctorControllers/authController";
import trycatch from "../middlewares/baseMiddlewares/try-catch/try-catch";
import { saveDoctorProfile } from "../controllers/doctorControllers/profileController";
import { createAppointment, updateAppointmentStatus, getUpcomingAppointments } from '../controllers/doctorControllers/appointmentController';
import {
  getDoctorDashboardActivities,
  getDoctorDashboardAppointments,
  getDoctorDashboardStats,
} from "../controllers/doctorControllers/dashboardController";


const doctorRoutes: Router = express.Router();

//auth
doctorRoutes.post("/signup",trycatch(doctorSignup))


doctorRoutes.post("/doctor-profile", trycatch(saveDoctorProfile));
doctorRoutes.get("/stats", getDoctorDashboardStats);
doctorRoutes.get("/recent-activities", getDoctorDashboardActivities);
doctorRoutes.get("/appointments", getDoctorDashboardAppointments);


// appointments routes
doctorRoutes.post('/appointments', createAppointment);
doctorRoutes.get('/appointments/upcoming', getUpcomingAppointments)
doctorRoutes.patch('/appointments/:id/status', updateAppointmentStatus);

export default doctorRoutes

import express from "express";
import { uploadFields } from "../middlewares/doctorMiddlewares/multerConfig";
import { saveDoctorProfile } from "../controllers/doctorControllers/profileController";
   
const doctorRoutes = express.Router();


doctorRoutes.post('/doctor/profile', uploadFields, saveDoctorProfile);



export {doctorRoutes}
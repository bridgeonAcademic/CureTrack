import express, { Router } from "express";
import {
  createMedicalHistory,
  getMedicalHistories,
  getMedicalHistoryById,
  updateMedicalHistory,
  deleteMedicalHistory,
} from "../controllers/baseControllers/medicalHistoryController";
import { signUp } from "../controllers/userControllers/signUpController";

const userRoutes:Router = express.Router();


userRoutes.post('/signup', signUp)

// medical history routes
userRoutes.post("/medicalHistory", createMedicalHistory); // Create
userRoutes.get("/medicalHistory", getMedicalHistories); // Read All
userRoutes.get("/medicalHistory/:id", getMedicalHistoryById); // Read by ID
userRoutes.put("/medicalHistory/:id", updateMedicalHistory); // Update
userRoutes.delete("/medicalHistory/:id", deleteMedicalHistory); // Delete

export default userRoutes


import express, { Router } from "express";
import { signUp } from "../controllers/vendorControllers/signupController";



const vendorsRoutes:Router = express.Router();


vendorsRoutes.post("/signup", signUp);

export { vendorsRoutes };


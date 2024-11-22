import express from "express";
import { doctorSignup } from "../controllers/doctorControllers/authController";
import trycatch from "../middlewares/baseMiddlewares/try-catch/try-catch";


const vendorRoutes =  express.Router()

//auth
vendorRoutes.get("/signup",trycatch(doctorSignup))



export default vendorRoutes
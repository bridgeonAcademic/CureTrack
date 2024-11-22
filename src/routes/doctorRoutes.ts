import express from "express";
import { doctorSignup } from "../controllers/doctorControllers/authController";
import trycatch from "../middlewares/baseMiddlewares/try-catch/try-catch";


const doctorRoutes =  express.Router()

//auth
doctorRoutes.post("/signup",trycatch(doctorSignup))



export default doctorRoutes
import express, { Router } from "express";
import { signUp } from "../controllers/adminControllers/signupController";
import { getAllVendors } from "../controllers/adminControllers/vendorController"
import { getDashboardCounts } from "../controllers/adminControllers/dashboardController";
import { getAllUsers, userBlockandUnblock } from "../controllers/adminControllers/usersController";
import trycatch from "../middlewares/baseMiddlewares/try-catch/try-catch";
import { doctorBlockandUnblock, getAllDoctors, getDoctorById, getUniqueSpecializations } from "../controllers/adminControllers/doctorController";

const adminRoutes:Router = express.Router();

//auth
adminRoutes.post("/signup", signUp);

//dashboard
adminRoutes.get('/dashboard-counts', trycatch(getDashboardCounts));

//vendors
adminRoutes.get('/vendors/:vendorName', getAllVendors);

//users
adminRoutes.get("/users",trycatch(getAllUsers))
adminRoutes.put("/users/:id",trycatch(userBlockandUnblock))

//doctors
adminRoutes.get("/doctors",trycatch(getAllDoctors))
adminRoutes.route("/doctors/:id").put(trycatch(doctorBlockandUnblock)).get(trycatch(getDoctorById));
adminRoutes.get("/doctors/specializations",trycatch(getUniqueSpecializations))


export default adminRoutes ;

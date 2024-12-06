import express, { Router } from "express";

import { signUp } from "../controllers/adminControllers/signupController";
import { getAllVendors } from "../controllers/adminControllers/vendorController"
import { getDashboardCounts } from "../controllers/adminControllers/dashboardController";
import { getAllUsers, userBlockandUnblock } from "../controllers/adminControllers/usersController";
import trycatch from "../middlewares/baseMiddlewares/try-catch/try-catch";
import { doctorBlockandUnblock, getAllDoctors, getDoctorById, getUniqueSpecializations } from "../controllers/adminControllers/doctorController";
import { createRequest, getAllRequests, updateRequestStatus } from "../controllers/adminControllers/approvalReqController";


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

// Request handlers for creating approving doctor 
adminRoutes.post('/requests', createRequest);
adminRoutes.get('/requests', getAllRequests);
adminRoutes.patch('/request', updateRequestStatus);

export default adminRoutes ;

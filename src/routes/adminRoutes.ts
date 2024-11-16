import express from "express";
import { signUp } from "../controllers/adminControllers/signupController";
import { verifySignUpOTP } from "../controllers/adminControllers/otpController";
import { login } from "../controllers/adminControllers/loginController";
import { getAllVendors } from "../controllers/adminControllers/getAllVendors";
import { getTotalDoctorsCount, getTotalUsersCount } from "../controllers/adminControllers/dashboardController";
import { getAllUsers, searchUsers, userBlockandUnblock } from "../controllers/adminControllers/usersController";
import trycatch from "../middlewares/baseMiddlewares/try-catch/try-catch";
import { getDoctorById } from "../controllers/adminControllers/doctorController";


const adminRoutes = express.Router();

adminRoutes.post("/signup", signUp);
adminRoutes.post("/verify-otp", verifySignUpOTP);

adminRoutes.post("/login", login);

//fetching vendors
adminRoutes.get('/vendors/:vendorName', getAllVendors);


//dashboard
adminRoutes.get('/total-users', getTotalUsersCount);
adminRoutes.get('/total-doctors', getTotalDoctorsCount);

//users
adminRoutes.get("/users",trycatch(getAllUsers))
adminRoutes.put("/users/:id",trycatch(userBlockandUnblock))
adminRoutes.get("/users/search",trycatch(searchUsers))

//doctors
adminRoutes.get("/doctors",trycatch(getAllUsers))
adminRoutes
  .route("/doctors/:id")
  .put(trycatch(userBlockandUnblock))
  .get(trycatch(getDoctorById));
adminRoutes.get("/doctors/search",trycatch(searchUsers))

export { adminRoutes };

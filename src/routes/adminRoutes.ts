import express from "express";
import { signUp } from "../controllers/adminControllers/signupController";
import { verifySignUpOTP } from "../controllers/adminControllers/otpController";
import { login } from "../controllers/adminControllers/loginController";
import { getAllVendors } from "../controllers/adminControllers/getAllVendors";

const adminRoutes = express.Router();

adminRoutes.post("/signup", signUp);
adminRoutes.post("/verify-otp", verifySignUpOTP);

adminRoutes.post("/login", login);

//fetching vendors
adminRoutes.get('/vendors/:vendorName', getAllVendors);

export { adminRoutes };

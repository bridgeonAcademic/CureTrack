import express from "express";
import { signUp } from "../controller/signupController";
import { verifySignUpOTP } from "../controller/otpController";
import { login } from "../controller/loginController";
import { getAllVendors } from "../controller/getAllVendors";

const adminRoutes = express.Router();

adminRoutes.post("/signup", signUp);
adminRoutes.post("/verify-otp", verifySignUpOTP);

adminRoutes.post("/login", login);

//fetching vendors
adminRoutes.get('/vendors/:vendorName', getAllVendors);

export { adminRoutes };

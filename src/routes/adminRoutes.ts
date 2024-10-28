import express, { Request, Response } from "express";
import { signUp } from "../registration/contoller/signupController";
import { login } from "../login/contoller/loginController";
import { verifySignUpOTP } from "../otp/contoller/otpController";
import { getAllVendors } from "../controller/getAllVendors";

const adminRoutes = express.Router();

adminRoutes.post("/signup", signUp);
adminRoutes.post("/verify-otp", verifySignUpOTP);

adminRoutes.post("/login", login);

//fetching vendors
adminRoutes.get('/vendors', getAllVendors);

export { adminRoutes };

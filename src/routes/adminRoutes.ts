import express, { Request, Response } from "express";
import { signUp } from "../registration/contoller/signupController";
import { login } from "../login/contoller/loginController";
import { verifySignUpOTP } from "../otp/contoller/otpController";

const adminRoutes = express.Router();

adminRoutes.post("/signup", signUp);
adminRoutes.post("/verify-otp", verifySignUpOTP);

adminRoutes.post("/login", login);

export { adminRoutes };

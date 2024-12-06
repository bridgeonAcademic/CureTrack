import express, { Router } from "express";
import { verifySignUpOTP } from "../controllers/baseControllers/otpController";
import { refreshAccessToken } from "../controllers/baseControllers/tokenController";
import { login } from "../controllers/baseControllers/loginController";


const baseRoutes:Router = express.Router();

baseRoutes.post("/verify-otp", verifySignUpOTP);
baseRoutes.post("/login", login);
baseRoutes.post("/refresh-token", refreshAccessToken);




export default baseRoutes

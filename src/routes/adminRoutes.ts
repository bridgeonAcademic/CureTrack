import express from "express";

import { signUp } from "../controllers/adminControllers/signupController";
import { verifySignUpOTP } from "../controllers/adminControllers/otpController";
import { login } from "../controllers/adminControllers/loginController";
import { createRequest, getAllRequests, updateRequestStatus } from "../controllers/adminControllers/ApprovalReqController";

const adminRoutes = express.Router();

adminRoutes.post("/signup", signUp);
adminRoutes.post("/verify-otp", verifySignUpOTP);
adminRoutes.post("/login", login);
adminRoutes.post('/requests', createRequest);
// Route to get all requests
adminRoutes.get('/requests', getAllRequests);
// Route to update request status
adminRoutes.patch('/request', updateRequestStatus);

export { adminRoutes };

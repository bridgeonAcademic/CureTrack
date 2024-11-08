import express from "express";
import { signUp } from "../controller/signupController";
import { verifySignUpOTP } from "../controller/otpController";
import { login } from "../controller/loginController";
import {
  createRequest,
  getAllRequests,
  updateRequestStatus
} from '../controller/ApprovalReqController';

const adminRoutes = express.Router();

adminRoutes.post("/signup", signUp);
adminRoutes.post("/verify-otp", verifySignUpOTP);
adminRoutes.post("/login", login);

// Route to create a new approval request
adminRoutes.post('/requests', createRequest);

// Route to get all requests
adminRoutes.get('/requests', getAllRequests);

// Route to update request status
adminRoutes.patch('/request', updateRequestStatus);

export { adminRoutes };

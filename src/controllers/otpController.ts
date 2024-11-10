import { Request, Response } from "express";
import AdminSchema from "../models/adminSchema";
import pendingAdmins from "../utils/pendingAdmin";
import { verifyOTP } from "../utils/otp";

export const verifySignUpOTP = async (req: Request, res: Response) => {
  try {
    const { Email, otp }: { Email: string; otp: string } = req.body;

    if (!Email || !otp) {
      res
        .status(400)
        .json({ success: false, message: "Email and OTP are required." });
      return;
    }

    const isValidOTP = verifyOTP(Email, otp);
    if (!isValidOTP) {
      res
        .status(403)
        .json({ success: false, message: "Invalid or expired OTP." });
      return;
    }

    const adminData = pendingAdmins[Email];
    if (!adminData) {
      res
        .status(404)
        .json({ success: false, message: "No pending admin found." });
      return;
    }

    const newAdmin = new AdminSchema({
      FirstName: adminData.FirstName ,
      LastName: adminData.LastName ,
      Email: adminData.Email,
      PhoneNumber: adminData.PhoneNumber,
      Password: adminData.Password,
      isVerified: true,
    });

    await newAdmin.save();
    delete pendingAdmins[Email];

    res.status(200).json({
      success: true,
      message: "OTP verified successfully. Admin registered.",
    });
    return;
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ success: false, message: `Server error: ${err.message}` });
    return;
  }
};

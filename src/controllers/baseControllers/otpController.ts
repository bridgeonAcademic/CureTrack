import { Request, Response } from "express";
import AdminSchema from "../../models/adminModels/adminSchema";
import { pendingAdmins, pendingVendors } from "../../utils/pendingAdmin";
import { verifyOTP } from "../../utils/otp";
import VendorsSchema from "../../models/vendorModels/vendorsSchema";

export const verifySignUpOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp }: { email: string; otp: string } = req.body;

    if (!email || !otp) {
      res
        .status(400)
        .json({ success: false, message: "Email and OTP are required." });
      return;
    }

    const isValidOTP = verifyOTP(email, otp);
    if (!isValidOTP) {
      res
        .status(403)
        .json({ success: false, message: "Invalid or expired OTP." });
      return;
    }

    const adminData = pendingAdmins[email];
    if (adminData) {
      const newAdmin = new AdminSchema({
        fullName: `${adminData.firstName} ${adminData.lastName}`,
        email: adminData.email,
        phoneNumber: adminData.phoneNumber,
        password: adminData.password,
        isVerified: true,
      });

      await newAdmin.save();
      delete pendingAdmins[email];

      res.status(200).json({
        success: true,
        message: `OTP verified successfully. Admin registered.`,
      });
      return;
    }

    const vendorData = pendingVendors[email];
    if (vendorData) {
      const newVendor = new VendorsSchema({
        name: vendorData.name,
        license: vendorData.license,
        vendorRole: vendorData.vendorRole,
        phoneNumber: vendorData.phoneNumber,
        email: vendorData.email,
        password: vendorData.password,
      });

      await newVendor.save();
      delete pendingVendors[email];
      res.status(200).json({
        success: true,
        message: `OTP verified successfully. ${vendorData.vendorRole} registered.`,
      });
      return;
    }
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ success: false, message: `Server error: ${err.message}` });
    return;
  }
};

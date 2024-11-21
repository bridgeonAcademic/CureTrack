import { Request, Response } from "express";
import AdminSchema from "../../models/adminModels/adminSchema";
import { generateTokens } from "../../utils/jwt";
import { comparePassword } from "../../utils/bcrypt";
import VendorsSchema from "../../models/vendorModels/vendorsSchema";
import DoctorsSchema from "../../models/doctorModels/doctorSchema";
import { loginBody } from "../../interfaces/baseInterfaces";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: loginBody = req.body;

    if (!email || !password) {
      res.status(401).json({
        success: false,
        message: "Email or PhoneNumber and password are required",
      });
      return;
    }

    const admin = await AdminSchema.findOne({ email });
    // const user = await userSchema.findOne({ email });
    const vendor = await VendorsSchema.findOne({ email });
    const doctor = await DoctorsSchema.findOne({ email });

    if (!admin && !vendor && !doctor) {
      res.status(402).json({
        success: false,
        message: "No account found. Please create an account",
      });
      return;
    }

    let user: any;
    let userType: string = "";
    let storedPassword: string = "";

    if (admin) {
      user = admin;
      userType = "admin";
      storedPassword = admin.password;
    } else if (vendor) {
      user = vendor;
      userType = "vendor";
      storedPassword = vendor.password;
    } else if (doctor) {
      user = doctor;
      userType = "doctor";
      storedPassword = doctor.password as string;
    }

    const validatedAdmin = await comparePassword(password, storedPassword);

    if (!validatedAdmin) {
      res.status(403).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    if (userType === "admin" && admin) {
      (admin as any).refreshToken = refreshToken;
      await admin.save();
    } else if (userType === "vendor" && vendor) {
      (vendor as any).refreshToken = refreshToken;
      await vendor.save();
    } else if (userType === "doctor" && doctor) {
      (doctor as any).refreshToken = refreshToken;
      await doctor.save();
    }

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: `${
        userType.charAt(0).toUpperCase() + userType.slice(1)
      } login successfully`,
      data: user,
      role: userType,
    });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ success: false, message: `Bad request ${err.message}` });
    return;
  }
};

export { login };

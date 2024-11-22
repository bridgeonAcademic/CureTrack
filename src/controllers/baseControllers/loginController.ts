import { Request, Response } from "express";
import AdminSchema from "../../models/adminModels/adminSchema";
import { generateTokens } from "../../utils/jwt";
import { comparePassword } from "../../utils/bcrypt";
import VendorsSchema from "../../models/vendorModels/vendorsSchema";
import DoctorsSchema from "../../models/doctorModels/doctorSchema";
import userSchema from "../../models/userModels/userSchema";
import { loginBody } from "../../interfaces/baseInterfaces";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role }: loginBody = req.body;

    if (!email || !password || !role) {
      res.status(401).json({
        success: false,
        message: "Email, password, and role are required",
      });
      return;
    }

    const admin = await AdminSchema.findOne({ email });
    const user = await userSchema.findOne({ email });
    const vendor = await VendorsSchema.findOne({ email });
    const doctor = await DoctorsSchema.findOne({ email });

    if (!admin && !vendor && !doctor && !user) {
      res.status(402).json({
        success: false,
        message: "No account found. Please create an account",
      });
      return;
    }

    let client: any;
    let storedPassword: string = "";

    if (role === "admin") {
      client = await AdminSchema.findOne({ email });
      storedPassword = client?.password || "";
    } else if (role === "vendor") {
      client = await VendorsSchema.findOne({ email });
      storedPassword = client?.password || "";
    } else if (role === "doctor") {
      client = await DoctorsSchema.findOne({ email });
      storedPassword = client?.password || "";
    } else if (role === "user") {
      client = await userSchema.findOne({ email });
      storedPassword = client?.password || "";
    }

    if (!client) {
      res.status(402).json({
        success: false,
        message:
          "No account found with the given role. Please create an account",
      });
      return;
    }

    const isPasswordValid = await comparePassword(password, storedPassword);

    if (!isPasswordValid) {
      res.status(403).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(client._id);

    if (role === "admin") {
      client.refreshToken = refreshToken;
      await client.save();
    } else if (role === "vendor") {
      client.refreshToken = refreshToken;
      await client.save();
    } else if (role === "doctor") {
      client.refreshToken = refreshToken;
      await client.save();
    } else if (role === "user") {
      client.refreshToken = refreshToken;
      await client.save();
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
      message: `${role} login successfully`,
      data: client,
      role: role,
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

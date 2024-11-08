import { Request, Response } from "express";
import AdminSchema from "../model/adminSchema";
import { generateToken } from "../utils/jwt";
import { comparePassword } from "../utils/bcrypt";

const login = async (req: Request, res: Response) => {
  interface loginBody {
    Email: string;
    Password: string;
  }

  try {
    const { Email, Password }: loginBody = req.body;

    if (!Email || !Password) {
      res.status(401).json({
        success: false,
        message: "Email or PhoneNumber and Password are required",
      });
      return;
    }

    const admin = await AdminSchema.findOne({ Email });

    if (!admin) {
      res.status(402).json({
        success: false,
        message: "No admin found. Please create an account",
      });
      return;
    }

    const validatedAdmin = await comparePassword(Password, admin?.Password);

    if (!validatedAdmin) {
      res.status(403).json({
        success: false,
        message: "Invalid Password",
      });
      return;
    }

    const token = generateToken(admin.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Admin login successfully ",
      data: admin,
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

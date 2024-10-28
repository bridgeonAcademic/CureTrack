import AdminSchema from "../../model/adminSchema";
import { Request, Response } from "express";
import { comparePassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";

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

    res.status(200).json({
      success: true,
      message: "Admin login successfully ",
      data: admin,
      token,
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

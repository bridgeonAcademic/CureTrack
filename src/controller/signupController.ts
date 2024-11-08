import AdminSchema from "../model/adminSchema";
import { adminSignUpValidation } from "../middleware/joi-validation/adminSignUpValidation";
import { Request, Response } from "express";
import { hashedPassword } from "../utils/bcrypt";
import pendingAdmins from "../utils/pendingAdmin";
import { generateOTP, storeOTP } from "../utils/otp";
import { sendOTPEmail } from "../utils/email";

const signUp = async (req: Request, res: Response) => {
  interface SignUpBody {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Email: string;
    Password: string;
  }

  try {
    const { FirstName, LastName, PhoneNumber, Email, Password }: SignUpBody =
      req.body;

    const validatedAdmin = await adminSignUpValidation.validateAsync({
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Password,
    });

    const existingAdmin = await AdminSchema.findOne({ Email });
    if (existingAdmin) {
      res
        .status(409)
        .json({ success: false, message: "Email already exists!" });
      return;
    }

    const hashedPass = await hashedPassword(validatedAdmin.Password);

    pendingAdmins[Email] = {
      FirstName: validatedAdmin.FirstName,
      LastName: validatedAdmin.LastName,
      PhoneNumber: validatedAdmin.PhoneNumber,
      Email: validatedAdmin.Email,
      Password: hashedPass,
    };

    const otp = generateOTP();
    storeOTP(Email, otp);
    await sendOTPEmail(Email, otp);

    res.status(200).json({
      success: true,
      message: "Please verify your email with the OTP sent.",
    });
    return;
  } catch (error) {
    const err = error as Error;
    if ("isJoi" in err && err.isJoi === true) {
      res.status(400).json({
        success: false,
        message: `Validation error: ${err.message}`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Server error: ${err.message}`,
      });
    }
  }
};

export { signUp };

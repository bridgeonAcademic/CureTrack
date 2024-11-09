import AdminSchema from "../../models/adminModels/adminSchema";
import { adminSignUpValidation } from "../../middlewares/baseMiddlewares/joi-validation/adminSignUpValidation";
import { Request, Response } from "express";
 import pendingAdmins from "../../utils/pendingAdmin";
import { generateOTP, storeOTP } from "../../utils/otp";
import { hashedPassword } from "../../utils/bcrypt";
import { sendOTPEmail } from "../../utils/email";
 
const signUp = async (req: Request, res: Response) => {
  interface SignUpBody {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }

  try {
    const { firstName, lastName, phoneNumber, email, password }: SignUpBody =
      req.body;

    const validatedAdmin = await adminSignUpValidation.validateAsync({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    const existingAdmin = await AdminSchema.findOne({ email });
    if (existingAdmin) {
      res
        .status(409)
        .json({ success: false, message: "email already exists!" });
      return;
    }

    const hashedPass = await hashedPassword(validatedAdmin.password);

    pendingAdmins[email] = {
      firstName: validatedAdmin.firstName,
      lastName: validatedAdmin.lastName,
      phoneNumber: validatedAdmin.phoneNumber,
      email: validatedAdmin.email,
      password: hashedPass,
    };

    const otp = generateOTP();
    storeOTP(email, otp);
    await sendOTPEmail(email, otp);

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

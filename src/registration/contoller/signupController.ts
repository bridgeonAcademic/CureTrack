import AdminSchema from "../../model/adminSchema";
import { Request, Response } from "express";
import { adminSignUpValidation } from "../../middleware/joi-validation/adminSignUpValidation";
import { hashedPassword } from "../../utils/bcrypt";
import { generateOTP, storeOTP } from "../../utils/otp";
import { sendOTPEmail } from "../../utils/email";
import pendingAdmins from "../../utils/pendingAdmin";

const signUp = async (req: Request, res: Response) => {
  interface SignUpBody {
    FullName: string;
    PhoneNumber: string;
    Email: string;
    Password: string;
  }

  try {
    const { FullName, PhoneNumber, Email, Password }: SignUpBody = req.body;

    if (!FullName || !PhoneNumber || !Email || !Password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const existingAdmin = await AdminSchema.findOne({ Email });
    if (existingAdmin) {
      res
        .status(409)
        .json({ success: false, message: "Email already exists!" });
      return;
    }

    const validatedAdmin = await adminSignUpValidation.validateAsync({
      FullName,
      Email,
      PhoneNumber,
      Password,
    });
    const hashedPass = await hashedPassword(validatedAdmin.Password);

    pendingAdmins[Email] = {
      FullName: validatedAdmin.FullName,
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
    res
      .status(500)
      .json({ success: false, message: `Bad request: ${err.message}` });
    return;
  }
};

export { signUp };

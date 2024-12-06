import Users from "../../models/userModels/userSchema";
import { Request, Response } from "express";
import {pendingUsers } from "../../utils/pendings";
import { generateOTP, storeOTP } from "../../utils/otp";
import { hashedPassword } from "../../utils/bcrypt";
import { sendOTPEmail } from "../../utils/email";
import { userSignUpValidation } from "../../middlewares/joi-validation/userValidation";

const signUp = async (req: Request, res: Response) => {
  interface SignUpBody {
  fullName: string;
  email: string;
  password: string;
  aadhaar: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  }
  try {
    console.log("okay from user signUp");
    const { fullName, email,password, aadhaar,phoneNumber, gender, dob}: SignUpBody =
      req.body;

    const validatedUser = await userSignUpValidation.validateAsync({
      fullName,
      email,
      phoneNumber,
      password,
      aadhaar,
      gender,
      dob
    });

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      res
        .status(409)
        .json({ success: false, message: "email already exists!" });
      return;
    }

    const hashedPass = await hashedPassword(validatedUser.password);

    pendingUsers[email] = {
      fullName: validatedUser.fullName,
      email: validatedUser.email,
      aadhaar: validatedUser.aadhaar,
      phoneNumber: validatedUser.phoneNumber,
      gender: validatedUser.gender,
      dob: validatedUser.dob,
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
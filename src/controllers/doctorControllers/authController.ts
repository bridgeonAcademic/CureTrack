import { Request, Response, NextFunction } from "express";
import Doctors from "../../models/doctorModels/doctorSchema";
import { doctorSignUpValidation } from "../../middlewares/joi-validation/doctoSignupValidation";
import CustomError from "../../middlewares/baseMiddlewares/errors/CustomError";
import { hashedPassword } from "../../utils/bcrypt";
import { pendingDoctors } from "../../utils/pendingAdmin";
import { generateOTP, storeOTP } from "../../utils/otp";
import { sendOTPEmail } from "../../utils/email";
import sendResponse from "../../utils/handlResponse";

export const doctorSignup = async (req: Request, res: Response) => {
  interface SignUpBody {
    fullName: string;
    IMAId: string;
    specialization: string;
    email: string;
    phoneNumber: string;
    password: string;
  }

  const {
    fullName,
    IMAId,
    specialization,
    email,
    phoneNumber,
    password,
  }: SignUpBody = req.body;

  const validatedDoctor = await doctorSignUpValidation.validateAsync({
    fullName,
    IMAId,
    specialization,
    email,
    phoneNumber,
    password,
  });

  const existingDoctor = await Doctors.findOne({ email });

  if (!existingDoctor) {
    throw new CustomError(409, "Doctor already exist");
  }

  const hashPassword = await hashedPassword(validatedDoctor.password);

  pendingDoctors[email] = {
    fullName: validatedDoctor.fullName,
    IMAId: validatedDoctor.IMAId,
    specialization: validatedDoctor.specialization,
    email: validatedDoctor.email,
    phoneNumber: validatedDoctor.phoneNumber,
    password: hashPassword,
  };

  const otp = generateOTP();
  storeOTP(email, otp);
  await sendOTPEmail(email, otp);

  sendResponse(res, 200, true, "Please verify your email with the OTP sent.");
};

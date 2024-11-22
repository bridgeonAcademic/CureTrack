import { Request, Response } from "express";
import { pendingVendors } from "../../utils/pendings";
import { generateOTP, storeOTP } from "../../utils/otp";
import { hashedPassword } from "../../utils/bcrypt";
import { sendOTPEmail } from "../../utils/email";
import { SignUpBody } from "../../interfaces/vendorInterfaces";
import { vendorSignUpValidation } from "../../middlewares/joi-validation/vendorSignUpValidation";
import VendorsSchema from "../../models/vendorModels/vendorsSchema";

const signUp = async (req: Request, res: Response) => {
  try {
    const { license, vendorRole, name, phoneNumber, email, password }: SignUpBody =
      req.body;

    const validatedVendor = await vendorSignUpValidation.validateAsync({
      name,
      license,
      vendorRole,
      email,
      phoneNumber,
      password,
    });

    const existingVendor = await VendorsSchema.findOne({ license });
    if (existingVendor) {
      res
        .status(409)
        .json({ success: false, message: "Vendor already exists!" });
      return;
    }

    const hashedPass = await hashedPassword(validatedVendor.password);

    pendingVendors[email] = {
      name: validatedVendor.name,
      license: validatedVendor.license,
      vendorRole: validatedVendor.vendorRole,
      phoneNumber: validatedVendor.phoneNumber,
      email: validatedVendor.email,
      password: hashedPass,
    };

    const otp = generateOTP();
    storeOTP(email, otp);
    await sendOTPEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "Please verify your Email with the OTP Sent.",
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

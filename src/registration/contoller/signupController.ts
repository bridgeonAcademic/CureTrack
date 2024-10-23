import AdminSchema from "../../model/adminSchema";
import { Request, Response } from "express";
import { adminSignUpValidation } from "../../middleware/joi-validation/adminSignUpValidation";
import { hashedPassword } from "../../utils/bcrypt";

const signUp = async (req: Request, res: Response) => {
  interface signUpBody {
    FullName: string;
    PhoneNumber: string;
    Email: string;
    Password: string;
  }

  try {
    const { FullName, PhoneNumber, Email, Password }: signUpBody = req.body;

    if (!FullName || !PhoneNumber || !Email || !Password) {
      res
        .status(401)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const existingAdmin = await AdminSchema.findOne({ Email });

    if (existingAdmin) {
      res
        .status(402)
        .json({ success: false, message: "Email already exists!.." });
      return;
    }

    const validatedAdmin = await adminSignUpValidation.validateAsync({
      FullName,
      Email,
      PhoneNumber,
      Password,
    });

    const hashedPass = await hashedPassword(validatedAdmin.Password);

    const newAdmin = new AdminSchema({
      FullName: validatedAdmin.FullName,
      Email: validatedAdmin.Email,
      PhoneNumber: validatedAdmin.PhoneNumber,
      Password: hashedPass,
    });

    await newAdmin.save();

    res.status(200).json({
      success: true,
      message: "Admin registered Successfully",
      admin: newAdmin,
    });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ success: false, message: `Bad request ${err.message}` });
    return;
  }
};


export { signUp };

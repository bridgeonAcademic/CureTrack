import { Request, Response } from "express";
import Doctors from "../../models/doctorModels/doctorSchema";
import CustomError from "../../middlewares/baseMiddlewares/errors/CustomError";
import sendResponse from "../../utils/handlResponse";

export const getAllDoctors = async (req: Request, res: Response): Promise<void> => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 10;
  const specialization: string | undefined = req.query.specialization as string;
  const isActive: boolean | undefined = req.query.isActive === "true" ? true : req.query.isActive === "false" ? false : undefined;
  const search: string | undefined = req.query.search as string;

  const skip = (page - 1) * limit;

  const query: any = {};
  if (specialization) query.specialization = specialization;
  if (typeof isActive === "boolean") query.isActive = isActive;

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } }, 
      { email: { $regex: search, $options: "i" } }  
    ];
  }

  const doctors = await Doctors.find(query).skip(skip).limit(limit);
  const totalDoctors = await Doctors.countDocuments(query);

  if (!doctors || doctors.length === 0) {
    throw new CustomError(404, "No doctors found");
  }

  const totalPages = Math.ceil(totalDoctors / limit);

  sendResponse(res, 200, true, "Doctors fetched successfully", doctors, {
    currentPage: page,
    totalPages,
    totalDoctors,
    limit,
  });
};

export const doctorBlockandUnblock = async (req: Request, res: Response) => {
  const doctorId: string = req.params.id;

  const doctor = await Doctors.findById(doctorId);
  if (!doctor) {
    throw new CustomError(404, "Doctor not found");
  }

  const newStatus = !doctor.isActive;
  await Doctors.findByIdAndUpdate(
    doctorId,
    { is_blocked: newStatus },
    { new: true }
  );

  const message = newStatus
    ? "Doctor unblocked successfully"
    : "Doctor blocked successfully";

  sendResponse(res, 200, true, message);
};

export const getDoctorById = async (req: Request, res: Response) => {
  const doctorId = req.params.id;

  const doctor = await Doctors.findById(doctorId);
  if (!doctor) {
    throw new CustomError(404, "Doctor not found");
  }

  sendResponse(res, 200, true, "Doctor fetched successfully", doctor);
};

export const getUniqueSpecializations = async (req: Request, res: Response): Promise<void> => {
    const specializations = await Doctors.distinct("specialization");

    const normalizedSpecializations: string[] = specializations.map(String);

    if (!normalizedSpecializations || normalizedSpecializations.length === 0) {
      throw new CustomError(404, "No specializations found");
    }

    sendResponse(res, 200, true, "Specializations fetched successfully", normalizedSpecializations);
};





import { Request, Response } from "express";
import Doctors from "../../models/doctorModels/doctorSchema";
import CustomError from "../../middlewares/baseMiddlewares/errors/CustomError";
import sendResponse from "../../utils/handlResponse";

export const getAllDoctors = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const doctors = await Doctors.find().skip(skip).limit(limit);
  const totalDoctors = await Doctors.countDocuments();

  if (!doctors || doctors.length === 0) {
    throw new CustomError(404, "Doctor not found");
  }

  const totalPages = Math.ceil(totalDoctors / limit);

  sendResponse(res, 200, true, "Doctors fetched successfully", doctors, {
    currentPage: page,
    totalPages,
    totalUsers: totalDoctors,
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

export const searchDoctors = async (req: Request, res: Response) => {
  const searchQuery: string = req.query.searchQuery as string;

  if (!searchQuery) {
    throw new CustomError(400, "Search query cannot be empty");
  }

  const results = await Doctors.find({
    $or: [
      { fullName: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ],
  });

  if (results.length === 0) {
    throw new CustomError(404, "No users found matching the search criteria");
  }

  sendResponse(res, 200, true, "Search Success", results);
};

export const getDoctorById = async (req: Request, res: Response) => {
  const doctorId = req.params.id;

  const doctor = await Doctors.findById(doctorId);
  if (!doctor) {
    throw new CustomError(404, "Doctor not found");
  }

  sendResponse(res, 200, true, "Doctor fetched successfully", doctor);
};

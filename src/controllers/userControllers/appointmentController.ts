import { NextFunction, Request, Response } from "express";
import CustomError from "../../middlewares/baseMiddlewares/errors/CustomError";
import appointmentModel from "../../models/baseModels/appointmentModel";

export const getAllAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { doctorId } = req.query;
    if (!doctorId) {
      res.status(404).json({ success: false, message: "doctor id not found" });
      return;
    }
    const appointments = await appointmentModel.find({ doctorId });
    res
      .status(200)
      .json({
        Success: true,
        messaeg: "Fetched all Appointments",
        data: appointments,
      });
  } catch (error) {
    next(new CustomError(500, "Failed to fetch dashboard stats", error));
  }
};

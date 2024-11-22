import { Request, Response, NextFunction } from "express";
 import appointmentModel from "../../models/baseModels/appointmentModel";
import CustomError from "../../middlewares/baseMiddlewares/errors/CustomError";

 export const getDoctorDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalCompleted = await appointmentModel.countDocuments({ type: "completed" });
    const totalScheduled = await appointmentModel.countDocuments({ type: "scheduled" });
    const totalCancelled = await appointmentModel.countDocuments({ type: "cancelled" });

    res.status(200).json({
      success: true,
      message: "Doctor dashboard stats fetched successfully.",
      data: {
        totalCompletedConsultations: totalCompleted,
        totalScheduledConsultations: totalScheduled,
        totalCancelledConsultations: totalCancelled,
      },
    });
  } catch (error) {
    next(new CustomError(500, "Failed to fetch dashboard stats", error));
  }
};

 export const getDoctorDashboardActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await appointmentModel.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("message type updatedAt");

    res.status(200).json({
      success: true,
      message: "Recent activities fetched successfully.",
      activities,
    });
  } catch (error) {
    next(new CustomError(500, "Failed to fetch recent activities", error));
  }
};

 export const getDoctorDashboardAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointments = await appointmentModel.find()
      .sort({ scheduledTime: -1 })
      .limit(10)
      .select("patientName type scheduledTime");

    res.status(200).json({
      success: true,
      message: "Recent appointmentModels fetched successfully.",
      appointments,
    });
  } catch (error) {
    next(new CustomError(500, "Failed to fetch recent appointments", error));
  }
};

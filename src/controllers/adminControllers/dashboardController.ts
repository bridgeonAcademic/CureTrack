import { Request, Response, NextFunction } from "express";
import Users from "../../models/userModels/userSchema";
import Doctors from "../../models/doctorModels/doctorSchema";
import CustomError from "../../middlewares/baseMiddlewares/errors/CustomError";

export const getTotalUsersCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalUsersResult = await Users.aggregate([
      { $match: {  is_blocked: false } },
      { $count: "totalUsers" }
    ]);

    const totalUsersCount = totalUsersResult.length > 0 ? totalUsersResult[0].totalUsers : 0;

    res.status(200).json({success: true,message: "Total Users count calculated successfully.",totalUsersCount});
  } catch (error) {
    next(new CustomError(500, "Error calculating total Users count", error));
  }
};



export const getTotalDoctorsCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalUsersResult = await Doctors.aggregate([{ $count: "totalDoctors" }]);

    const totalUsersCount = totalUsersResult.length > 0 ? totalUsersResult[0].totalUsers : 0;

    res.status(200).json({success: true,message: "Total Doctors count calculated successfully.",totalUsersCount});
  } catch (error) {
    next(new CustomError(500, "Error calculating total Doctors count", error));
  }
};

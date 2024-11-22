import { Request, Response } from "express";
import Users from "../../models/userModels/userSchema";
import Doctors from "../../models/doctorModels/doctorSchema";
import Vendors from "../../models/vendorModels/vendorsSchema";
import sendResponse from "../../utils/handlResponse";

export const getDashboardCounts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const [totalUsersResult, totalDoctorsResult, totalVendorsResult] =
    await Promise.all([
      Users.aggregate([
        { $match: { isActive: true } },
        { $count: "totalUsers" },
      ]),
      Doctors.aggregate([
        { $match: { isActive: true } },
        { $count: "totalDoctors" },
      ]),
      Vendors.aggregate([
        { $match: { isActive: true } },
        { $count: "totalVendors" },
      ]),
    ]);

  const totalUsersCount =
    totalUsersResult.length > 0 ? totalUsersResult[0].totalUsers : 0;
  const totalDoctorsCount =
    totalDoctorsResult.length > 0 ? totalDoctorsResult[0].totalDoctors : 0;
  const totalVendorsCount =
    totalVendorsResult.length > 0 ? totalVendorsResult[0].totalVendors : 0;

  sendResponse(res, 200, true, "Dashboard counts fetched successfully.", {
    totalUsers: totalUsersCount,
    totalDoctors: totalDoctorsCount,
    totalVendors: totalVendorsCount,
  });
};

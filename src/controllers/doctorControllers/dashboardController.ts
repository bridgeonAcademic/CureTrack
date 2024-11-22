import { Request, Response } from "express";
import Users from "../../models/userModels/userSchema";
import Doctors from "../../models/doctorModels/doctorSchema";
import Vendors from "../../models/vendorModels/vendorsSchema";
import sendResponse from "../../utils/handlResponse";

export const getHospitalDashboardCounts = async (
  req: Request,
  res: Response
): Promise<void> => {};

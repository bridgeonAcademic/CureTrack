import { Request, Response } from "express";
import Users from "../../models/userModels/userSchema";
import CustomError from "../../middlewares/baseMiddlewares/errors/CustomError";
import sendResponse from "../../utils/handlResponse";



export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 10;
  const isActive: boolean | undefined =
    req.query.isActive === "true"
      ? true
      : req.query.isActive === "false"
      ? false
      : undefined;
  const search: string | undefined = req.query.search as string;
  const startDate: string | undefined = req.query.startDate as string;
  const endDate: string | undefined = req.query.endDate as string;

  const skip = (page - 1) * limit;

  const pipeline: any[] = [];

  const match: any = {};
  if (typeof isActive === "boolean") match.isActive = isActive;

  if (search) {
    match.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (startDate || endDate) {
    match.createdAt = {};
    if (startDate) match.createdAt.$gte = new Date(startDate);
    if (endDate) match.createdAt.$lte = new Date(endDate);
  }

  if (Object.keys(match).length > 0) {
    pipeline.push({ $match: match });
  }

  pipeline.push(
    { $skip: skip },
    { $limit: limit },
    {
      $project: {
        fullName: 1,
        email: 1,
        isActive: 1,
        createdAt: 1,
      },
    }
  );

  const countPipeline = [{ $match: match }, { $count: "totalUsers" }];

  const [users, countResult] = await Promise.all([
    Users.aggregate(pipeline),
    Users.aggregate(countPipeline),
  ]);

  const totalUsers = countResult[0]?.totalUsers || 0;

  if (!users || users.length === 0) {
    throw new CustomError(404, "Users not found");
  }

  const totalPages = Math.ceil(totalUsers / limit);

  sendResponse(res, 200, true, "Users fetched successfully", users, {
    currentPage: page,
    totalPages,
    totalUsers,
    limit,
  });
};

export const userBlockandUnblock = async (req: Request, res: Response) => {
  const userId: string = req.params.id;

  const user = await Users.findById(userId);

  if (!user) {
    throw new CustomError(404, "User not found");
  }

  const newStatus = !user.isActive;
  await Users.findByIdAndUpdate(
    userId,
    { is_blocked: newStatus },
    { new: true }
  );

  const message = newStatus
    ? "User blocked successfully"
    : "User unblocked successfully";

  sendResponse(res, 200, true, message);
};

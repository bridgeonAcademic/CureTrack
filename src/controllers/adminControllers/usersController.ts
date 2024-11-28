import { Request, Response, NextFunction } from "express";
import Users from "../../models/userModels/userSchema";
import CustomError from "../../middlewares/baseMiddlewares/errors/CustomError";

export const getAllUsers = async (req: Request,res: Response) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 10;

  const skip = (page - 1) * limit;

  const users = await Users.find().skip(skip).limit(limit);
  const totalUsers = await Users.countDocuments();

  if (!users || users.length === 0) {
    throw new CustomError(404, "Users not found");
  }

  const totalPages = Math.ceil(totalUsers / limit);

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalUsers,
      limit: limit,
    },
  });
};

export const userBlockandUnblock = async (req: Request, res: Response) => {
    const userId: string = req.params.id;

    const user = await Users.findById(userId);

    if (!user) {
      throw new CustomError(404, "User not found");
    }

    const newStatus = !user.is_blocked;
    await Users.findByIdAndUpdate(userId, { is_blocked: newStatus }, { new: true });

    const message = newStatus ? "User blocked successfully" : "User unblocked successfully";

    return res.status(200).json({ success: true, message });
 
};


export const searchUsers = async (req: Request, res: Response) => {

    const searchQuery: string = req.query.searchQuery as string;

    if (!searchQuery) {
      throw new CustomError(400, "Search query cannot be empty");
    }

    const results = await Users.find({
      $or: [
        { fullName: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    });

    if (results.length === 0) {
      throw new CustomError(404, "No Doctors found matching the search criteria");
    }

    res.status(200).json({success: true,message: "Search Success",data: results,
    });
  }

import { Request, Response } from "express";
import { refreshToken } from "../../utils/jwt";

const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
        res.status(401).json({ success: false, message: "No refresh token provided" });
        return
    }

     const newAccessToken = refreshToken(refresh_token);

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, 
    });

    res.status(200).json({ success: true, message: "Access token refreshed" });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
  }
};

export { refreshAccessToken };

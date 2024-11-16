import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomError";

const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = (err as CustomError).statusCode || 500;
  const message = (err as CustomError).message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    error: err instanceof Error ? err.message : "Unknown Error",
  });
};

export default errorHandler;

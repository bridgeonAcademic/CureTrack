import { Response } from "express";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  pagination?: any;
}

const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any,
  pagination?: any
) => {
  const response: ApiResponse = {
    success,
    message,
    ...(data && { data }),
    ...(pagination && { pagination }),
  };

  res.status(statusCode).json(response);
};

export default sendResponse;

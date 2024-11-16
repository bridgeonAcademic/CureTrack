import { Request, Response, NextFunction, RequestHandler } from "express";

type params = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

const trycatch = (controller: params): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.log("Error", error);

      return next(error);
    }
  };
};

export default trycatch;

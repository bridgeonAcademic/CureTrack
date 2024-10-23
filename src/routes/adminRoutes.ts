import express, { Request, Response } from "express";
import { signUp } from "../registration/contoller/signupController";
import { login } from "../login/contoller/loginController";

const adminRoutes = express.Router();

adminRoutes.get("/", (req: Request, res: Response) => {
  res.send("Hello World!..");
});
adminRoutes.post("/signup", signUp);
adminRoutes.post("/login", login);

export { adminRoutes };

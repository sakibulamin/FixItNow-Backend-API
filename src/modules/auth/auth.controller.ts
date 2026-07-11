import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});


const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getMe(req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile Retrieved Successfully",
    data: result,
  });
});

export const AuthController = {
  register,
  login,
  getMe
};

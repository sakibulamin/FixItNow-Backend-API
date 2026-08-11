import { NextFunction, Request, Response } from "express";
import httpStatus  from "http-status";
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
  const payload=req.body;
  const {accessToken,refreshToken,user} = await AuthService.loginUser(payload);

  res.cookie("accessToken",accessToken,{
    httpOnly:true,
    secure:false,
    sameSite:"none",
    maxAge:1000*60*60*24

  });

  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:false,
    sameSite:"none",
    maxAge:1000*60*60*24*7
  })

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: {accessToken,refreshToken,user},
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


const refreshTokenController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new Error("Refresh token not provided");
  }

  const { accessToken } = await AuthService.refreshToken(refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false, // production এ true করো
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Token Refreshed Successfully",
    data: { accessToken }
  });
});


export const AuthController = {
  register,
  login,
  getMe,
  refreshTokenController
};

import httpStatus from "http-status";
import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { PaymentService } from "./payment.service";



const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPayments();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PaymentService.getSinglePayment(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
});


const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await PaymentService.initPayment(bookingId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initialized successfully",
    data: result,
  });
});


export const PaymentController = {
  getAllPayments,
  getSinglePayment,
  initPayment,
  
};
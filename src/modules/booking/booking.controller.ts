import httpStatus from "http-status";
import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { BookingService } from "./booking.service";

const createBooking = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookingService.createBooking(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  }
);

const getAllBookings = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookingService.getAllBookings();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  }
);

const getSingleBooking = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BookingService.getSingleBooking(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking retrieved successfully",
      data: result,
    });
  }
);

const updateBooking = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BookingService.updateBooking(
      id as string,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  }
);

const deleteBooking = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await BookingService.deleteBooking(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking deleted successfully",
      data: null,
    });
  }
);

export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
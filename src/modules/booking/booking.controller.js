import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
const createBooking = catchAsync(async (req, res) => {
    const result = await BookingService.createBooking(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Booking created successfully",
        data: result,
    });
});
const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingService.getAllBookings();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result,
    });
});
const getSingleBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookingService.getSingleBooking(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking retrieved successfully",
        data: result,
    });
});
const updateBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookingService.updateBooking(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking updated successfully",
        data: result,
    });
});
const deleteBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    await BookingService.deleteBooking(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking deleted successfully",
        data: null,
    });
});
export const BookingController = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking,
};

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";
const getDashboardStats = catchAsync(async (req, res) => {
    const result = await AdminService.getDashboardStats();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Dashboard statistics retrieved successfully",
        data: result,
    });
});
const getAllUsers = catchAsync(async (req, res) => {
    const result = await AdminService.getAllUsers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});
const changeUserStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AdminService.changeUserStatus(id, req.body.status);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User status updated successfully",
        data: result,
    });
});
const getAllBookings = catchAsync(async (req, res) => {
    const result = await AdminService.getAllBookings();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result,
    });
});
export const AdminController = {
    getDashboardStats,
    getAllUsers,
    changeUserStatus,
    getAllBookings,
};

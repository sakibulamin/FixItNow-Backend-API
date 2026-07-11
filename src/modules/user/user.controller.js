import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserService.getAllUsers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});
const getSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserService.getSingleUser(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
});
const updateUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserService.updateUser(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: result,
    });
});
const changeUserStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await UserService.changeUserStatus(id, status);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User status updated successfully",
        data: result,
    });
});
const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    await UserService.deleteUser(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User deleted successfully",
        data: null,
    });
});
export const UserController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    changeUserStatus,
    deleteUser,
};

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceService } from "./service.service";
const createService = catchAsync(async (req, res) => {
    const result = await ServiceService.createService(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Service created successfully",
        data: result,
    });
});
const getAllServices = catchAsync(async (req, res) => {
    const result = await ServiceService.getAllServices();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Services retrieved successfully",
        data: result,
    });
});
const getSingleService = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ServiceService.getSingleService(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result,
    });
});
const updateService = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ServiceService.updateService(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service updated successfully",
        data: result,
    });
});
const deleteService = catchAsync(async (req, res) => {
    const { id } = req.params;
    await ServiceService.deleteService(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service deleted successfully",
        data: null,
    });
});
export const ServiceController = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};

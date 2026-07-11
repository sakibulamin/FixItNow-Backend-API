import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TechnicianService } from "./tecnician.service";
const createTechnicianProfile = catchAsync(async (req, res) => {
    const result = await TechnicianService.createTechnicianProfile(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Technician profile created successfully",
        data: result,
    });
});
const updateAvailability = catchAsync(async (req, res) => {
    const result = await TechnicianService.updateAvailability(req.user.id, req.body.availability);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Availability updated successfully",
        data: result,
    });
});
const getAllTechnicians = catchAsync(async (req, res) => {
    const result = await TechnicianService.getAllTechnicians();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Technicians retrieved successfully",
        data: result,
    });
});
const getSingleTechnician = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TechnicianService.getSingleTechnician(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Technician retrieved successfully",
        data: result,
    });
});
const updateTechnician = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TechnicianService.updateTechnician(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Technician updated successfully",
        data: result,
    });
});
const deleteTechnician = catchAsync(async (req, res) => {
    const { id } = req.params;
    await TechnicianService.deleteTechnician(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Technician deleted successfully",
        data: null,
    });
});
export const TechnicianController = {
    createTechnicianProfile,
    updateAvailability,
    getAllTechnicians,
    getSingleTechnician,
    updateTechnician,
    deleteTechnician,
};

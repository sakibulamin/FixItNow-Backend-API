import httpStatus from "http-status";
import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TechnicianService } from "./tecnician.service";



const createTechnicianProfile = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TechnicianService.createTechnicianProfile(
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Technician profile created successfully",
      data: result,
    });
  }
);

const updateAvailability = catchAsync(async (req, res) => {
  const result = await TechnicianService.updateAvailability(
    req.user.id,
    req.body.availability
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Availability updated successfully",
    data: result,
  });
});

const getAllTechnicians = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TechnicianService.getAllTechnicians();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Technicians retrieved successfully",
      data: result,
    });
  }
);

const getSingleTechnician = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await TechnicianService.getSingleTechnician(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Technician retrieved successfully",
      data: result,
    });
  }
);

const updateTechnician = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await TechnicianService.updateTechnician(
      id as string,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Technician updated successfully",
      data: result,
    });
  }
);

const deleteTechnician = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await TechnicianService.deleteTechnician(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Technician deleted successfully",
      data: null,
    });
  }
);

export const TechnicianController = {
  createTechnicianProfile,
  updateAvailability,
  getAllTechnicians,
  getSingleTechnician,
  updateTechnician,
  deleteTechnician,
};
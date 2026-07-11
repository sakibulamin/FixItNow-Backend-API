import httpStatus from "http-status";
import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.createReview(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Review created successfully",
        data: result,
    });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.getAllReviews();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reviews retrieved successfully",
        data: result,
    });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ReviewService.getSingleReview(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review retrieved successfully",
        data: result,
    });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ReviewService.updateReview(
        id as string,
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review updated successfully",
        data: result,
    });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ReviewService.deleteReview(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review deleted successfully",
        data: null,
    });
});

export const ReviewController = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
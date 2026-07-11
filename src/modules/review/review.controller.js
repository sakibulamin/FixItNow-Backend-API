import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewService } from "./review.service";
const createReview = catchAsync(async (req, res) => {
    const result = await ReviewService.createReview(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Review created successfully",
        data: result,
    });
});
const getAllReviews = catchAsync(async (req, res) => {
    const result = await ReviewService.getAllReviews();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reviews retrieved successfully",
        data: result,
    });
});
const getSingleReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ReviewService.getSingleReview(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review retrieved successfully",
        data: result,
    });
});
const updateReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ReviewService.updateReview(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review updated successfully",
        data: result,
    });
});
const deleteReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    await ReviewService.deleteReview(id);
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

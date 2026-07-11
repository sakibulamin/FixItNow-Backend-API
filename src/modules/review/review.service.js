import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/apperror";
const createReview = async (payload) => {
    const result = await prisma.review.create({
        data: payload,
    });
    return result;
};
const getAllReviews = async () => {
    return prisma.review.findMany({
        include: {
            customer: true,
            technician: {
                include: {
                    user: {
                        omit: {
                            password: true
                        }
                    }
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getSingleReview = async (id) => {
    const result = await prisma.review.findUnique({
        where: {
            id,
        },
        include: {
            customer: true,
            technician: {
                include: {
                    user: {
                        omit: {
                            password: true
                        }
                    }
                },
            },
        },
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Review not found");
    }
    return result;
};
const updateReview = async (id, payload) => {
    const review = await prisma.review.findUnique({
        where: {
            id,
        },
    });
    if (!review) {
        throw new AppError(httpStatus.NOT_FOUND, "Review not found");
    }
    return prisma.review.update({
        where: {
            id,
        },
        data: payload,
    });
};
const deleteReview = async (id) => {
    const review = await prisma.review.findUnique({
        where: {
            id,
        },
    });
    if (!review) {
        throw new AppError(httpStatus.NOT_FOUND, "Review not found");
    }
    await prisma.review.delete({
        where: {
            id,
        },
    });
    return null;
};
export const ReviewService = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};

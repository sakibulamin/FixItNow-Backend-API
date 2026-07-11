import httpStatus from "http-status";

import { IReview, IReviewUpdate, } from "./review.interface";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/apperror";

const createReview = async (payload: IReview) => {
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

const getSingleReview = async (id: string) => {
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
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Review not found"
        );
    }

    return result;
};

const updateReview = async (id: string, payload: IReviewUpdate) => {
    const review = await prisma.review.findUnique({
        where: {
            id,
        },
    });

    if (!review) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Review not found"
        );
    }

    return prisma.review.update({
        where: {
            id,
        },
        data: payload,
    });
};

const deleteReview = async (id: string) => {
    const review = await prisma.review.findUnique({
        where: {
            id,
        },
    });

    if (!review) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Review not found"
        );
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
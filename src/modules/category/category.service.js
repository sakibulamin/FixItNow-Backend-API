import httpStatus from "http-status";
import AppError from "../../errors/apperror";
import { prisma } from "../../lib/prisma";
const createCategory = async (payload) => {
    const isExist = await prisma.category.findUnique({
        where: {
            name: payload.name,
        },
    });
    if (isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Category already exists");
    }
    const result = await prisma.category.create({
        data: payload,
    });
    return result;
};
const getAllCategories = async () => {
    const result = await prisma.category.findMany({
        include: {
            services: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
const getSingleCategory = async (id) => {
    const result = await prisma.category.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            services: true,
        },
    });
    return result;
};
const updateCategory = async (id, payload) => {
    const isExist = await prisma.category.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = await prisma.category.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};
const deleteCategory = async (id) => {
    const isExist = await prisma.category.findUniqueOrThrow({
        where: {
            id,
        },
    });
    await prisma.category.delete({
        where: {
            id,
        },
    });
    return null;
};
export const CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};

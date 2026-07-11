import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/apperror";
const getAllUsers = async () => {
    const result = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            role: true,
            status: true,
            createdAt: true,
        },
    });
    return result;
};
const getSingleUser = async (id) => {
    const result = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            role: true,
            status: true,
            createdAt: true,
        },
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    return result;
};
const updateUser = async (id, payload) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const result = await prisma.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};
const changeUserStatus = async (id, status) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const result = await prisma.user.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });
    return result;
};
const deleteUser = async (id) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    await prisma.user.delete({
        where: {
            id,
        },
    });
    return null;
};
export const UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    changeUserStatus,
    deleteUser,
};

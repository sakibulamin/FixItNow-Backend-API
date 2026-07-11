import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/apperror";
const createService = async (payload) => {
    const result = await prisma.service.create({
        data: payload,
    });
    return result;
};
const getAllServices = async () => {
    const result = await prisma.service.findMany({
        include: {
            category: true,
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
    return result;
};
const getSingleService = async (id) => {
    const result = await prisma.service.findUnique({
        where: { id },
        include: {
            category: true,
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
        throw new AppError(httpStatus.NOT_FOUND, "Service not found");
    }
    return result;
};
const updateService = async (id, payload) => {
    const isExist = await prisma.service.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Service not found");
    }
    return prisma.service.update({
        where: { id },
        data: payload,
    });
};
const deleteService = async (id) => {
    const isExist = await prisma.service.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Service not found");
    }
    await prisma.service.delete({
        where: { id },
    });
    return null;
};
export const ServiceService = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};

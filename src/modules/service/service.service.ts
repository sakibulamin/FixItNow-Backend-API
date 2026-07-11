import httpStatus from "http-status";

import { IService, IServiceUpdate } from "./service.interface";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/apperror";

const createService = async (payload: IService) => {
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
          user:{
            omit:{
              password:true
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

const getSingleService = async (id: string) => {
  const result = await prisma.service.findUnique({
    where: { id },
    include: {
      category: true,
      technician: {
        include: {
          user: {
              omit:{
              password:true
            }
          }
        },
      },
    },
  });

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Service not found"
    );
  }

  return result;
};

const updateService = async (
  id: string,
  payload: IServiceUpdate
) => {
  const isExist = await prisma.service.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Service not found"
    );
  }

  return prisma.service.update({
    where: { id },
    data: payload,
  });
};

const deleteService = async (id: string) => {
  const isExist = await prisma.service.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Service not found"
    );
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
import httpStatus from "http-status";
import { IAvailability, ITechnicianProfile, ITechnicianUpdate } from "./technician.intreface";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/apperror";



const createTechnicianProfile = async (
  payload: ITechnicianProfile
) => {
  const isExist = await prisma.technicianProfile.findUnique({
    where: {
      userId: payload.userId,

    },
  });


  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Technician profile already exists"
    );
  }

  const result = await prisma.technicianProfile.create({
    data: payload,
  });

  return result;
};

const updateAvailability = async (technicianId: string, availability: IAvailability) => {
  return prisma.technicianProfile.update({
    where: {
      userId: technicianId,
    },
    data: {
      availability,
    },
  });
};

const getAllTechnicians = async () => {
  const result = await prisma.technicianProfile.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      services: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSingleTechnician = async (id: string) => {
  const result = await prisma.technicianProfile.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      services: true,
      bookings: true,
    },
  });

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Technician not found"
    );
  }

  return result;
};

const updateTechnician = async (
  id: string,
  payload: ITechnicianUpdate
) => {
  const isExist = await prisma.technicianProfile.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Technician not found"
    );
  }

  const result = await prisma.technicianProfile.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteTechnician = async (id: string) => {
  const isExist = await prisma.technicianProfile.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Technician not found"
    );
  }

  await prisma.technicianProfile.delete({
    where: {
      id,
    },
  });

  return null;
};

export const TechnicianService = {
  createTechnicianProfile,
  updateAvailability,
  getAllTechnicians,
  getSingleTechnician,
  updateTechnician,
  deleteTechnician,
};
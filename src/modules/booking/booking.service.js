import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/apperror";
const createBooking = async (payload) => {
    const result = await prisma.$transaction(async (tx) => {
        const booking = await tx.booking.create({
            data: {
                customerId: payload.customerId,
                technicianId: payload.technicianId,
                serviceId: payload.serviceId,
                bookingDate: payload.bookingDate,
                address: payload.address,
            }
        });
        await tx.payment.create({
            data: {
                bookingId: booking.id,
                amount: payload.amount,
                provider: "SSLCOMMERZ",
                status: "PENDING"
            }
        });
        return booking;
    });
    return result;
};
const getAllBookings = async () => {
    const result = await prisma.booking.findMany({
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
            service: true,
            payment: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
const getSingleBooking = async (id) => {
    const result = await prisma.booking.findUnique({
        where: { id },
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
            service: true,
            payment: true,
        },
    });
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }
    return result;
};
const updateBooking = async (id, payload) => {
    const booking = await prisma.booking.findUnique({
        where: { id },
    });
    if (!booking) {
        throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }
    return prisma.booking.update({
        where: { id },
        data: payload,
    });
};
const deleteBooking = async (id) => {
    const booking = await prisma.booking.findUnique({
        where: { id },
    });
    if (!booking) {
        throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }
    await prisma.booking.delete({
        where: { id },
    });
    return null;
};
export const BookingService = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking,
};

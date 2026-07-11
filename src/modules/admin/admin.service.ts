import { prisma } from "../../lib/prisma";


const getDashboardStats = async () => {
    const totalUsers = await prisma.user.count();

    const totalCustomers = await prisma.user.count({
        where: {
            role: "CUSTOMER",
        },
    });

    const totalTechnicians = await prisma.user.count({
        where: {
            role: "TECHNICIAN",
        },
    });

    const totalBookings = await prisma.booking.count();

    const totalPayments = await prisma.payment.count({
        where: {
            status: "COMPLETED",
        },
    });

    const revenue = await prisma.payment.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            status: "COMPLETED",
        },
    });

    return {
        totalUsers,
        totalCustomers,
        totalTechnicians,
        totalBookings,
        totalPayments,
        totalRevenue: revenue._sum.amount || 0,
    };
};

const getAllUsers = async () => {
    return prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

const changeUserStatus = async (
    id: string,
    status: "ACTIVE" | "BLOCKED"
) => {
    return prisma.user.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });
};

const getAllBookings = async () => {
    return prisma.booking.findMany({
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
};

export const AdminService = {
    getDashboardStats,
    getAllUsers,
    changeUserStatus,
    getAllBookings,
};
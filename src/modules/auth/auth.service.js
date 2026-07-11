import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
const registerUser = async (payload) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (isUserExist) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const result = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role,
        },
        omit: {
            password: true
        }
    });
    return result;
};
const loginUser = async (payload) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Password doesn't match!");
    }
    const accessToken = jwtUtils.createToken({
        id: user.id,
        email: user.email,
        role: user.role,
    }, config.jwt_access_secret, config.jwt_access_expires_in);
    return {
        accessToken,
    };
};
const getMe = async (user) => {
    const result = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        omit: {
            password: true
        }
    });
    return result;
};
export const AuthService = {
    registerUser,
    loginUser,
    getMe
};

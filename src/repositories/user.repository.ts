import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { prisma } from "../prisma/client";
import { ConflictError, InternalServerError } from "../utils/errors/app.error";
import bcrypt from 'bcrypt';
import { serverConfig } from "../config";

const userPublicFields = {
    id: true,
    email: true,
    name: true,
    createdAt: true,
    updatedAt: true,
};

export const createUser = async (userData: Prisma.UserUncheckedCreateInput) => {
    try {
        userData.password = await bcrypt.hash(userData.password, serverConfig.SALT_ROUNDS);

        const { password, ...restAttributes } = await prisma.user.create({
            data: userData
        });

        return restAttributes;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new ConflictError(`There is a unique constraint violation, a new user cannot be created with this email`);
            }
        }
        if (error instanceof PrismaClientValidationError) {
            if (error.message.includes("Argument `email` is missing.")) {
                throw new ConflictError(`Email field is missing`);
            };
            if (error.message.includes("Argument `password` is missing.")) {
                throw new ConflictError(`Password field is missing`);
            };
        }
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = prisma.user.findUnique({
            where: {
                email
            }
        });
        return user;
    } catch (error) {
        throw new InternalServerError("Something went wrong in getUserByEmail");
    }
}

export const getAllUsers = async () => {
    try {
        const users = prisma.user.findMany({
            select: userPublicFields
        });
        return users;
    } catch (error) {
        throw new InternalServerError("Something went wrong in getAllUsers");
    }
}